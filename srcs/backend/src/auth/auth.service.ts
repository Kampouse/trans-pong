import { Injectable, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RequestWithUser, passportType, SessionUser } from 'src/dtos/auth.dtos';
import { prisma } from 'src/main';
import { Socket, Server } from 'socket.io';
import { parse } from 'cookie';
import { UserDto } from 'src/dtos/user.dtos';
import { ProfileService } from 'src/profile/profile.service';

type validateUser = {
  response: { url: string; statCode: number };
  user_validity: { token: boolean; user: string | null };
};

type tokenDatas = { username: string; iat: number; exp: number };

@Injectable()
export class AuthService {
  private userSessions: Map<string, Socket[]>;
  constructor(
    private jwtService: JwtService, //private usersService: ProfileService,
  ) {}

  public async validate_token(token: string): Promise<string | null> {
    if (!token) {
      return null;
    }
    try {
      const secret = process.env.JWT_KEY;
      const decoded = this.jwtService.verify(token, { secret }) as tokenDatas;
      if (decoded && decoded.username) {
        const output = await this.doesUserExist(decoded.username);
        if (output) {
          return output as string;
        }
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  public process_poller = async (
    req: RequestWithUser,
    redirect_content: validateUser,
  ): Promise<string | null | Error> => {
    let user = redirect_content?.user_validity?.user;
    try {
      if (!redirect_content.user_validity.user) {
        user = await this.createUser(req);
      }
      return await this.createToken(user);
    } catch {
      return new Error('User creation failed or token creation faile');
    }
  };
  public async redirect_poller(
    headers,
    req: RequestWithUser,
  ): Promise<validateUser> {
    const is_valid = await this.validate_token(headers.cookie?.split('=')[1]);
    const user_data = await this.doesUserExist(req.user.username);

    return {
      response: {
        statCode: 302,
        url: 'http://localhost:5173/',
      },
      user_validity: {
        token: is_valid !== null ? true : false,
        user: user_data,
      },
    };
  }
  async createToken(validate: string): Promise<string | null> {
    const user = await prisma.user.findUnique({ where: { login42: validate } });
    const secret = process.env.JWT_KEY; // private key for jwt should be in env
    const expiresIn = '1d';
    const token = this.jwtService.sign(
      { username: validate },
      { secret, expiresIn },
    );
    const output = await prisma.user.update({
      where: {
        login42: user.login42,
      },
      data: {
        jwtToken: token,
      },
    });
    return token;
  }

  async createUser(apiResponse: RequestWithUser): Promise<string | null> {
    const output = await prisma.user.create({
      data: {
        login42: apiResponse.user.username,
        username: apiResponse.user.username,
        accessToken42: apiResponse.user.accessToken,
        refreshToken42: apiResponse.user.refreshToken,
        userFriends: null,
      },
    });
    return output?.login42;
  }

  async doesUserExist(username: string): Promise<string> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          login42: username,
        },
      });
      if (user) {
        const login42 = user.login42;
        return login42;
      }
    } catch (error) {
      return null;
    }
    return null;
  }

  public async authentificateSession(data: any): Promise<string> {
    const request: Request = data;
    const cookie_string = request.headers['cookie']?.split('=')[1];
    if (cookie_string) {
      const is_valid = await this.validate_token(cookie_string);
      if (is_valid) {
        return is_valid as string;
      }
    } else {
      return null;
    }
  }

  public async getUserFromSocket(socket: Socket): Promise<UserDto | null> {
    const cookies = socket.handshake.headers.cookie;

    if (!cookies) {
      return null;
    }

    const token = parse(cookies)['jwt'];
    if (!token) {
      return null;
    }

    try {
      const sub = this.jwtService.verify(token);
      if (!sub) {
        return null;
      }

      // const userDto: UserDto | null = await this.usersService.findOneById(
      // sub.sub,
      // );

      //return userDto;
    } catch {
      return null;
    }
  }

  getSocketsFromUser(userId: string): Socket[] {
    return this.userSessions.get(userId);
  }
}
