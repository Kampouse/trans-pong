import { Controller, Get,Req,UseGuards, Redirect, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import { FortyTwoAuthGuard } from './utils/Guards';
import { RequestWithUser, SessionUser } from "src/dtos/auth.dtos";

@Controller('auth')
export class AuthController
{
  constructor(private readonly authService: AuthService) {}
  
  @Get('who')
  async whoAmI(@Req() request: RequestWithUser, @Res() res)
  {
    const sessionStore = request['sessionStore'];
    const type: SessionUser = sessionStore['sessions'];
    const groups = { ...type };
    const first = Object.values(groups)[0];

    //  Look if the 42api was used
    if (first != undefined)
    {
        const parsed = JSON.parse(first);
        const passport = parsed['passport'];
        const token = await this.authService.createToken(passport['user']);
        if (token != false)
        {
            res.cookie('token', token, { httpOnly: true, sameSite: 'None', secure: true }).send();
        }
        else
        {
            res.status(401).send({ message: 'Unauthorized', status: '401' });
        }
    }
    else
    {
        res.status(401).send({ message: 'Unauthorized', status: '401' });
    }
  }

  @UseGuards(FortyTwoAuthGuard)
  @Get('42login')
  @Redirect()
  async handleLogin42(@Req() request: RequestWithUser, @Res() res)
  {
    // Create the user with the 42api response
    if (request)
    {
      let isOldUser = await this.authService.doesUserExist(request);

      if (!isOldUser)
      {
        const user = await this.authService.createUser(request);
      }
    }
    return {statCode: 302, url: "http://localhost:5173/Login" }
  }
}
