import { Exclude, Expose, Transform } from 'class-transformer';

export class User{
  email: string;
  username: string;
  @Exclude()
  password: string;

  @Expose()
  get  userData(): string {
    return `${this.username} ${this.email}`;
  }
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}