import { Redirect, Body } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {PrismaClient } from '@prisma/client';
import * as cookieParser from 'cookie-parser';
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
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    
    },
  }));

  app.use(cookieParser());
  // check the payload of the request and see if the user is logged in
  // if the user is logged in, attach the user to the request object



  app.use((req, res, next) => {
    if (req.session?.passport?.user) {
      req.user = req.session.passport.user;
    }
    next();
  });
   
  // check the  payload of the request and see if the user is logged in 
  await app.listen(3000);
}
bootstrap();
