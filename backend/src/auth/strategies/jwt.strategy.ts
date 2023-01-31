import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants/constants';
import { PrivateProfileDto } from 'src/dtos/profile.dtos';
import { ProfileService } from 'src/profile/profile.service';
import { Request } from 'express';

// The jwt strategy checks if the token extracted from the request is a valid token.
// It checks if the given token has been verified by the 2fa (if activated).
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: ProfileService) {
    super({
      jwtFromRequest: getCookie,
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any): Promise<PrivateProfileDto | boolean> {
    const user: PrivateProfileDto = await this.userService.findOneById(payload.id);
    if (!user) {
      return false;
    }
    if (!user.authenticator) {
      return user;
    }
    if (payload.authentificated) {
      return user;
    }
  }
}

var getCookie = function(req: Request) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  return token;
}