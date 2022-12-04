import { AuthGuard, PassportSerializer } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';

type SessionUser = { [key: string]: any };
@Injectable()
export class FortyTwoAuthGuard extends AuthGuard('42') {
  async canActivate(context: ExecutionContext) {
    const activate = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    request.session.passport = request.session.passport || {};
    request.session.passport.user = request.session.passport.user || {};
    await super.getAuthenticateOptions(context);
    await super.logIn(request);
    return activate;
  }
}
//make an auth guard  from the jwt token 

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    try {
      const decoded = jwt.verify(token, 'secret');
      return true;
    } catch (err) {
      return false;
    }
  }
}

export class LoginGuard {
  async canActivate(context: ExecutionContext) {
    // 
    const request = context.switchToHttp().getRequest();
     //check the cookie 
    const cookie = request.cookies;
    const sessionStore = request['sessionStore'];
    const type: SessionUser = sessionStore['sessions'];
    const groups = { ...type };
    const first = Object.values(groups)[0];
    if (first !== undefined) {
      return true;
    }
    return false;
  }
}
@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  async canActivate(context: ExecutionContext) {
    const activate = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return activate;
  }
}
@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done: Function): any {
    done(null, user);
  }
  deserializeUser(payload: any, done: Function): any {
    done(null, payload);
  }
}

