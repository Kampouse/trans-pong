export class CreateAuthDto {


 email: string;
    username: string ;
    displayName: string;
    constructor(partial: Partial<CreateAuthDto>) {
        Object.assign(this, partial);
    }





}
