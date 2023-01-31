import { Controller, Get, Req, UseGuards, Delete, HttpCode, Redirect, Res, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { FortyTwoAuthGuard } from './guards/42-auth.guard'; 
// import { Request, SessionUser } from "src/dtos/auth.dtos";
import { tokenDatas } from './auth.service';
import { PrivateProfileDto } from 'src/dtos/profile.dtos';
import {Request, Response} from 'express';
import { RequestWithUser } from 'src/dtos/auth.dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // This function is used to login thanks to the guard.
  @UseGuards(FortyTwoAuthGuard)
  @Get('login')
  async login() {}
  
    @Get('who')
  @UseGuards(JwtAuthGuard)
  async whoAmI(@Req() request: RequestWithUser, @Res() res) {
    const output = await this.authService.validate_token(request.headers['cookie'].split("=")[1])
    const data: tokenDatas = await this.authService.validate_token_raw(request.headers['cookie'].split("=")[1]) as tokenDatas

    const should2fa = await this.authService.should2fa(output)

    if (output && !should2fa.should2fa) {
      res.status(200).send();
    }
    if (output && data.fa2 && should2fa.should2fa) {
      res.status(200).send();
    }
    if (output && should2fa.should2fa) {
      res.status(401).send();
      return { error: "User needs to activate 2fa" };
    }
    res.status(401).send();
    return { error: "No user found" };

  }
  // @UseGuards(FortyTwoAuthGuard)
  // @Get('42login')
  // async handleLogin42(@Req() request: RequestWithUser, @Res({passthrough: true}) res: Response, @Headers() headers) {
  //  //  Find user or signup if does not exist
  //  const output =  await this.authService.validate_token(request.headers['cookie'].split("=")[1])
  //  let userDto: PrivateProfileDto = await this.authService.fetchUser(output);

  //  //  If the user is not registered in our database, we create one.
  //  if (!userDto) {
  //    userDto = await this.authService.createUserSignup(request);
  //  }

  //  //  Create and store jwt token to enable connection
  //  const accessToken = await this.authService.generateToken({ 
  //   id: userDto.id, 
  //   Authenticated: false,
  //   username: userDto.username,
  //   login42: userDto.username,
  //  });

  //  res.cookie('jwt', accessToken, { httpOnly: true, sameSite: 'strict' });
 
  //  //  Redirect to the frontend
  //  res.redirect('http://localhost:5173/');
  // }
  @UseGuards(FortyTwoAuthGuard)
  @Get('42login')
  @Redirect()
  async handleLogin42(@Req() request: RequestWithUser, @Res() res, @Headers() headers) {
    let redirect_content = await this.authService.redirect_poller(headers, request)
    if (redirect_content.user_validity.user && redirect_content.user_validity.token) {
      return redirect_content.response
    }
    const token = await this.authService.process_poller(request, redirect_content)
    if (token instanceof Error) {
      const ErrorLogin = {
        statCode: 302,
        url: "http://localhost:5173/ErrorLogin"
      }
      console.log("Error occured during authentifcation", token)
      return ErrorLogin
    }
    const tfa = await this.authService.should2fa(request.user.username)
    const path = tfa.should2fa ? "http://localhost:5173/2fa" : "http://localhost:5173/Profile"
    const NewResponse = {
      statCode: 302,
      url: path
    }


  //  res.cookie('jwt', accessToken, { httpOnly: true, sameSite: 'strict' });
 
    res.cookie('token', token, { httpOnly: true, sameSite: 'None', secure: true })
    redirect_content.response = NewResponse
    return redirect_content.response
  }

  @Get('42logout')
  async logout(@Req() request: RequestWithUser, @Res() res) {
    res.cookie('token', "", { httpOnly: true, sameSite: 'None', secure: true }).status(200).send();
    return { message: "User logged out" }
  }

  @UseGuards(FortyTwoAuthGuard)
  @Get('isLogged')
  async isLoggedIn() {
    return { loggedIn: true };
  }
}
