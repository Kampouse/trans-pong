//  A user object expected in the request ?
export type User =
{
    id: string;
    username: string;
    displayName: string;
    email: string;
    accessToken: string;
    refreshToken: string;
};

//  Session user to identify a client ?
export type SessionUser = { [key: string]: any };
  
  //  This is a request type expected from the front end
export type RequestWithUser = Request & { user: User; response: any } &
{
    session: { passport: { user: User } };
};

export class ApiResponse
{
  constructor(
      public id: number,
      public login42: string,
      public email: string,
      public accessToken: string,
      public refreshToken: string
  ){}
}

export class AuthResponseDto {
    constructor(
        public accessToken: string,  
        public refreshToken: string,  
        public bearerToken: string,){}  
}

export class UserDto {
    constructor(
        public login42: string,  
        public username: string,  
        public userStatus: string, 
        public imagePath: string,){}
}
