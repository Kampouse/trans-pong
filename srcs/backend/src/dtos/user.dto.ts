export class UserDto
{
    id: number;
    name: String;
    friends: UserDto[];
    blocked: UserDto[];
    
}