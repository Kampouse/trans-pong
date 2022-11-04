import { request } from 'http';
import { Controller, Get, Post, Body, Patch, Param, Delete,Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll( @Req() request : Request ) {
     const  session = { ... request['sessionStore'].sessions }
      console.log(session);
      // if the object is not empty
      if(Object.keys(session).length !== 0){
        const sessionData = JSON.parse(session[Object.keys(session)[0]]);
        const { passport } = sessionData;
        if(passport){
          const { user } = passport;
          if(user){
             console.log(user);
             //fetch 42 user data
              //get user image  from 42 api
              //get user email from 42 api
              
              fetch ("https://api.intra.42.fr/v2/users/" + user.id, {
                method: 'GET',
                headers: {
                  'Authorization': 'Bearer ' + user.accessToken,
                  'Content-Type': 'application/json'
                }
              }).then (response => response.json())
              .then (data => {
                console.log(data['image_url']);
              }) 
            }

            return user;
            }         
        
      }
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.usersService.findOne(+id);
    }
    // find if a user exists by email or username
  @Get('exists/:email/:username')
  exists(@Param('email') email: string, @Param('username') username: string) {
      // return only true or false if the user exists 
     let output = this.usersService.exists(email, username);
      return output;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
