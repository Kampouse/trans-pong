import { Controller, Get,Req,UseGuards, Redirect, Res, Headers} from '@nestjs/common';
import { AuthService } from './auth.service';
import { FortyTwoAuthGuard } from './utils/Guards';
import { RequestWithUser, SessionUser } from "src/dtos/auth.dtos";

@Controller('auth')
export class AuthController
{
  constructor(private readonly authService: AuthService) {}
  



@Get('ping')
async ping(@Req() request: RequestWithUser, @Res() res,)
{
  return { 200 : "ok"}
}

  @Get('who')
  async whoAmI(@Req() request: RequestWithUser, @Res() res , @Headers() headers) 
  {

    if(headers.cookie)
       {
            let token = headers.cookie.split("=")[1]
            console.log(token)
            let isTokenValid = await this.authService.validate_token(token)
            console.log(isTokenValid)
            if (isTokenValid)
            {
               res.status(200);
              return res.send({ message: 'Authorized', status: '200'});
            }
            else 
            {
              res.status(401).send({ message: 'Unauthorized', status: '401' });
            }
       }
       

        res.status(401).send({ message: 'Unauthorized', status: '401' });
    
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
 let     token = await this.authService.createToken(request.user);
  console.log("token: -> " + token)
     res.cookie('token', token, { httpOnly: true, sameSite: 'None', secure: true })
    return {statCode: 302, url: "http://localhost:5173/" }
  }
}
