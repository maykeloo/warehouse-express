import { PrismaClient } from '@prisma/client';
import { mockDeep } from 'jest-mock-extended';

const prisma = mockDeep<PrismaClient>();

jest.mock('@prisma/client', () => ({
    PrismaClient: jest.fn(() => prisma),
}));

export default prisma;