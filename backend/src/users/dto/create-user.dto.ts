export class CreateUserDto {
    email: string;
    username: string ;
    displayName: string;
    constructor(partial: Partial<CreateUserDto>) {
        Object.assign(this, partial);
    }
}
