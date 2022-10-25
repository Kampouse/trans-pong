import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-42";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {
    constructor() {
    super({
            clientID: process.env.FORTYTWO_CLIENT_ID,
            clientSecret: process.env.FORTYTWO_CLIENT_SECRET,
            callbackURL: process.env.FORTYTWO_CALLBACK_URL,
            passReqToCallback: true,
        });
    }

    async validate(request: any, accessToken: string, refreshToken: string, profile: any, done: any) {
        const { id, username, displayName, emails } = profile;
        const user = {
            id,
            username,
            displayName,
            email: emails[0].value,
            accessToken,
            refreshToken,
        };
        done(null, user);
    }
}
@Injectable()
export class Google extends PassportStrategy(Strategy, 'google') {
    constructor() {
    super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            passReqToCallback: true,
        });
    }

    async validate(request: any, accessToken: string, refreshToken: string, profile: any, done: any) {
        const { id, username, displayName, emails } = profile;
        const user = {
            id,
            username,
            displayName,
            email: emails[0].value,
            accessToken,
            refreshToken,
        };
        done(null, user);
    }
}