  export class CreateAuthDto {
  username: string;
  login42: string;
  userStatus: string;
  imagePath: string;
  constructor(partial: Partial<CreateAuthDto>) {
    Object.assign(this, partial);
  }
}
