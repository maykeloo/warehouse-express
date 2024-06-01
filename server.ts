import 'module-alias/register';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv'

dotenv.config();

export const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:8080',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    }),
);

import router from '@/shared/router';
app.use('/api', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
