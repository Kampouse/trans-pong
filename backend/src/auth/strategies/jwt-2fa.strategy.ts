import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants/constants';
import { ProfileService } from 'src/profile/profile.service'; 
import { PrivateProfileDto } from 'src/dtos/profile.dtos';
import { Request } from 'express';

// The jwt2fa strategy checks if the token extracted from the request is a valid token
// It is different from the other jwtStrategy because it enables us to access the 2fa verification.
@Injectable()
export class JwtTwoFactAuthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly userService: ProfileService) {
    super({
      jwtFromRequest: getCookie,
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any): Promise<PrivateProfileDto> {
    const user: PrivateProfileDto = await this.userService.findOneById(payload.sub);
    
    return user;
  }
}

var getCookie = function(req: Request) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  return token;
}