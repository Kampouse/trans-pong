import { Redirect, Body } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClient } from '@prisma/client';
import * as session from 'express-session';
// import { env } from 'process';
// import { cors } from 'cors';
import * as cookieParser from 'cookie-parser';
import * as io from 'socket.io'

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

var updateStatusInterval = setInterval(async () => {
  const users = await prisma.user.findMany({ where: { userStatus: "online" } })
  //finish this shit later, socket is done
  for (let user of users) {
    var date = Date.now();
    var userDate = new Date(user.updatedAt);

    var timeDistance = Math.floor((date - userDate.getTime()) / 1000);
    if (timeDistance > 5) {
      console.log(`user ${user.username} is inactive. He as been set to offline.`)
      await prisma.user.update({
        where: { userID: user.userID }, data: {
          userStatus: "offline"
        }
      })
    }
  }
}, 120000)

export const prisma = global.prisma || new PrismaClient({ log: ['info'] });
async function bootstrap() {
  startPrisma();
  const app = await NestFactory.create(AppModule);
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
