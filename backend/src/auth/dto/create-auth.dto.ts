export class CreateAuthDto {
  username: string;
  displayName: string;
  constructor(partial: Partial<CreateAuthDto>) {
    Object.assign(this, partial);
  }
}
