import { AuthGuard ,PassportSerializer } from "@nestjs/passport";
import { ExecutionContext, Injectable } from "@nestjs/common";

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
 // create  redirect class with 42  api strategy
export class FortyTwoRedirect extends AuthGuard('42') {
  // check if the user is authenticated
  async canActivate(context: ExecutionContext) {
    const activate = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    request.session.passport = request.session.passport || {};
    request.session.passport.user = request.session.passport.user || {};
    await super.logIn(request);
  // if the user is authenticated redirect to the frontend

    return activate;

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
    console.log("hello:",user);
    done(null, user);
  }

  deserializeUser(payload: any, done: Function): any {
     console.log("hello:",payload);
    done(null, payload);
  }
}

 