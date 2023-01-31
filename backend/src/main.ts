/* eslint-disable no-var */
import { Redirect, Body } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session';
// import { env } from 'process';
import * as cookieParser from 'cookie-parser';
import * as io from 'socket.io';

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
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');

  app.use(cookieParser());
  app.enableCors({
    //origin: 'http://localhost:5173',
    origin: function (origin, callback) {
      callback(null, true)
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Methods',
      'Access-Control-Allow-Credentials',
      'Origin, X-Requested-With, Content-Type, Accept'
    ],
    // origin: true,
    credentials: true
  });

  await app.listen(port, () => {
    console.log('[WEB]', config.get<string>('BASE_URL'));
  });
}
bootstrap();
