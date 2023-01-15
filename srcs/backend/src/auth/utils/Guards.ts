import { AuthService } from 'src/auth/auth.service';
import { AuthGuard, PassportSerializer } from '@nestjs/passport';
import { ExecutionContext, Injectable,Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { doesNotMatch } from 'assert';

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
 Service = new AuthService(new JwtService)
  async canActivate(context: ExecutionContext): Promise<boolean> {

    
    const request = context.switchToHttp().getRequest();
    const token = request.headers.cookie?.split("=")[1]
    try {

      console.log(token)
      let status =  await this.Service.validate_token(token)
      return status;
    } catch (err) {
      return false;
    }
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

