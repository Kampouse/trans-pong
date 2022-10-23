import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
  
@Injectable()
export class AppService {
  // retun a json object
      // get  all users from the database  

  getHello(): object {
    return {message: 'Hello World!'};
  }
}
