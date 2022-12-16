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