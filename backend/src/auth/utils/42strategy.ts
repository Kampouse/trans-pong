import { response } from 'express';
import { PassportStrategy } from "@nestjs/passport";
import { Strategy as strat } from "passport-google-oauth20";
import {   } from "@nestjs/passport" ;
import { Strategy } from "passport-42";
import { Injectable } from "@nestjs/common";
import { done } from "passport";

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {
    constructor() {
    super({
            authorizationURL: 'https://api.intra.42.fr/oauth/authorize',
            tokenURL: 'https://api.intra.42.fr/oauth/token',
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            redirect_uri: process.env.CALLBACK_URL,
            callbackURL: 'http://localhost:3000/auth/42login',
            passReqToCallback: true,
            scope : ['public'],
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
export class Google extends PassportStrategy(strat, 'google') {
    constructor() {
    super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,

            scope: ['profile', 'email'],
        });
    }
    // check out access token and refresh token
    // check if user exists in db
    // if user exists, return user
    // if user does not exist, create user and return userkkj
   async validate(request: any, accessToken: string, refreshToken: string, profile: any, done: any) {
        console.log('profile', profile);
        const { id, username, displayName, _json } = profile;
        const user = {
            id,
            username,
            displayName,
            accessToken,
            refreshToken,
            json: _json,
        };
        console.log('user', user);

            // if user exists, return user else create user and return user

            
    }
   
     

}