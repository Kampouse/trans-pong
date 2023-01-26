import { Controller, Get, Req, UseGuards, Redirect, Res, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FortyTwoAuthGuard, JwtGuard } from './utils/Guards';
import { RequestWithUser, SessionUser } from "src/dtos/auth.dtos";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get('who')
  @UseGuards(JwtGuard)
  async whoAmI(@Req() request: RequestWithUser, @Res() res) {
    const output = await this.authService.validate_token(request.headers['cookie'].split("=")[1])
    const should2fa = await this.authService.should2fa(output)
    // console.log("should2fa", should2fa) and is activated

    if (output) {
      res.status(200).send();
    }
    res.status(401).send();
    return { error: "No user found" };

  }
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
    const path = await this.authService.should2fa(request.user.username) ? "http://localhost:5173/2fa" : "http://localhost:5173/Profile"
    const NewResponse = {
      statCode: 302,
      url: path
    }
    res.cookie('token', token, { httpOnly: true, sameSite: 'None', secure: true })
    redirect_content.response = NewResponse
    return redirect_content.response
  }
  @Get('42logout')
  async logout(@Req() request: RequestWithUser, @Res() res) {
    res.cookie('token', "", { httpOnly: true, sameSite: 'None', secure: true }).status(200).send();
    return { message: "User logged out" }
  }

  // @UseGuards(FortyTwoAuthGuard)
  // @Get('isLogged')
  // async isLoggedIn() {
  //   return { loggedIn: true };
  // }
}