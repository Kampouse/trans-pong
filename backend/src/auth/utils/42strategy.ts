import { response } from 'express';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as strat } from 'passport-google-oauth20';
import {} from '@nestjs/passport';
import { Strategy } from 'passport-42';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      authorizationURL: 'https://api.intra.42.fr/oauth/authorize',
      tokenURL: 'https://api.intra.42.fr/oauth/token',
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.CALLBACK_URL,
      callbackURL: 'http://localhost:3000/auth/42login',
      passReqToCallback: true,
      scope: ['public'],
    });
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ) {
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