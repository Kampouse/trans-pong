export class CreateUserDto {

    email: string;
    username: string;
    constructor(partial: Partial<CreateUserDto>) {
        Object.assign(this, partial);
    }




}
