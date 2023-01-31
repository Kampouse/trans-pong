// import { response } from 'express';
// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy as strat } from 'passport-google-oauth20';
// import {} from '@nestjs/passport';
// import { Strategy } from 'passport-42';
// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class FortyTwoStrategy extends PassportStrategy(Strategy) {
//   constructor() {
//     super({
//       authorizationURL: 'https://api.intra.42.fr/oauth/authorize',
//       tokenURL: 'https://api.intra.42.fr/oauth/token',
//       clientID: process.env.CLIENT_ID,
//       clientSecret: process.env.CLIENT_SECRET,
//       redirect_uri: 'http://localhost:3000/auth/42login',
//       callbackURL: 'http://localhost:3000/auth/42login',
//       passReqToCallback: true,
//       scope: ['public'],
//     });
//   }

//   async validate(
//     request: any,
//     accessToken: string,
//     refreshToken: string,
//     profile: any,
//     done: any,
//   ) {
//     const { id, username, displayName, emails } = profile;
//     const user = {
//       id,
//       username,
//       displayName,
//       email: emails[0].value,
//       accessToken,
//       refreshToken,
//     };
//     done(null, user);
//   }
// }
import { Strategy } from 'passport-42';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { VerifiedCallback } from 'passport-jwt';

//  auth42 strategy
@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy) {

  
  // The super function calls the 42 strategy constructor with our envir variables.
  // It will asks for user permissions before calling validate().
  
  constructor() {
    super({
      authorizationURL: 'https://api.intra.42.fr/oauth/authorize',
      tokenURL: 'https://api.intra.42.fr/oauth/token',
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/42login',
    });
  }

  // The validate function is a verify function called by the PassportStrategy.
  // It receives the necessary informations and a function redirecting to the callbackURL.

  // We won't need the tokens since we need the profile only once. 
  // It is used to access the user informations of 42 API after the first access. 
  // (And I don't know if 42 API uses them).

  async validate(
    accessToken: string, 
    refreshToken: string, 
    profile: any,
    done: VerifiedCallback
    ): Promise<any> {

    const user = {
      id: profile.id,
      name: profile.username,
      photoUrl: profile.photos[0].value,
    }

    done(null, user);
  }
}