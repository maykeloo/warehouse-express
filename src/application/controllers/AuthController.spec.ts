import request from 'supertest';
import { decryptPassword } from '@/shared/utils/password';
import jwt from 'jsonwebtoken';
import { mockReset } from 'jest-mock-extended';
import prisma from '~/prisma.mock';
import { UserRole } from '@/domain/user/entities/User';
import app from '~/server';
import { USER_ERROR_MESSAGES } from '@/domain/user/messages';

jest.mock('@/shared/utils/password');
jest.mock('jsonwebtoken');

describe('AuthController Integration', () => {
    beforeEach(() => {
        mockReset(prisma);
    });

    describe('POST /api/user/login', () => {
        it('should fail when login fails due to invalid password', async () => {
            const loginPayload = {
                email: 'test@example.com',
                password: 'wrong-password',
            };

            (decryptPassword as jest.Mock).mockResolvedValue(false);
            prisma.user.findUnique.mockResolvedValue({
                id: '1',
                email: 'test@example.com',
                password: 'hashed_password',
                role: UserRole.CLIENT,
                name: 'John',
            });

            const response = await request(app).post('/api/user/login').send(loginPayload);

            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                error: {
                    errors: [
                        {
                            field: 'password',
                            message: USER_ERROR_MESSAGES.INVALID_PASSWORD,
                        },
                    ],
                    messages: [],
                },
            });
        });

        it('should fail when login when email not found', async () => {
            const loginPayload = {
                email: 'test@not-found.com',
                password: 'wrong-password',
            };

            prisma.user.findUnique.mockResolvedValue(null);

            const response = await request(app).post('/api/user/login').send(loginPayload);

            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                error: {
                    errors: [
                        {
                            field: 'email',
                            message: USER_ERROR_MESSAGES.EMAIL_NOT_FOUND,
                        },
                    ],
                    messages: [],
                },
            });
        });

        it('should login a user with valid credentials', async () => {
            const payload = {
                accessToken: 'token',
                refreshToken: 'refresh-token',
            };

            const loginPayload = {
                email: 'test@example.com',
                password: 'password123',
            };

            prisma.user.findUnique.mockResolvedValue({
                id: '1',
                email: 'test@example.com',
                password: 'hashed_password',
                role: UserRole.CLIENT,
                name: 'John',
            });

            (decryptPassword as jest.Mock).mockResolvedValue(true);
            (jwt.sign as jest.Mock).mockReturnValueOnce('token').mockReturnValueOnce('refresh-token');

            const response = await request(app).post('/api/user/login').send(loginPayload);

            expect(response.status).toBe(201);
            expect(response.body).toEqual(payload);
        });
    });
});