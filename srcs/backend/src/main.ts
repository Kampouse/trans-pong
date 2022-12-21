import { Redirect, Body } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClient } from '@prisma/client';
import * as session from 'express-session';
// import { env } from 'process';
// import { cors } from 'cors';
import * as cookieParser from 'cookie-parser';

declare global {
  var prisma: PrismaClient | undefined;
}
const startPrisma = async () => {
  try {
    await prisma.$connect();
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma?.$disconnect();
  }
};

export const prisma = global.prisma || new PrismaClient({ log: ['info'] });
async function bootstrap() {
  startPrisma();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Methods',
      'Access-Control-Allow-Credentials',
    ],
    credentials: true
  });
  app.use(
    cookieParser("trans"),
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
