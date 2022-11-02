import { AuthGuard ,PassportSerializer } from "@nestjs/passport";
import { ExecutionContext, Injectable } from "@nestjs/common";

type  SessionUser = { [key: string]: any };
@Injectable()
// create athGuard class with 42  api strategy
export class FortyTwoAuthGuard extends AuthGuard('42') {
    async canActivate(context: ExecutionContext) {
        const activate = (await super.canActivate(context)) as boolean;
        const request = context.switchToHttp().getRequest();
        request.session.passport = request.session.passport || {};
        request.session.passport.user = request.session.passport.user || {};
        await super.getAuthenticateOptions( context);
            await super.logIn(request);
        return activate;
        }
}
export class LoginGuard {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    let sessionStore = request['sessionStore'];
    let type: SessionUser =  sessionStore['sessions'];
    const groups = {...type} 
    const first = Object.values(groups)[0];
      console.log(first , "request.user");
       if(first !== undefined){
          return true ;
       }
    return false;

  }
}
@Injectable()
export class  GoogleAuthGuard extends AuthGuard('google') {
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
     console.log("hello:",payload);
    done(null, payload);
  }
}

 