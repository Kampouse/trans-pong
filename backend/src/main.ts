import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {PrismaClient } from '@prisma/client';
import * as  session from 'express-session';
import { env } from 'process';
 
declare global {
  var prisma: PrismaClient | undefined;
}
 const startPrisma = async () => {
  try {
      await prisma.$connect();
  }
  catch (e) {
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
    origin: 'http://localhost:5173'
   });

  app.use(session({
    secret: process.env.CLIENT_ID,
    resave: false,
    saveUninitialized: false,
    
  }));
  await app.listen(3000);
}
bootstrap();
