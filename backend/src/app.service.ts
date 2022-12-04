import { prisma } from './main';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AppService {
  // retun a json object
  // get  all users from the database

  getHello(): object {
    //prisma create a user
    const data = {
      username: 'test',
    };
    return { message: 'Hello World!' };
  }
}
