import { AvatarDto } from "./avatar.dto";
export enum UserStatus {
    Online = 0,
    Offline = 1,
    InGame = 2,
}

export interface UserDto {
    id: number;
    name: string;
    status: UserStatus;
    wins: number;
    loses: number;
    friends?: UserDto[];
    blocked?: UserDto[];
    currentAvatar?: AvatarDto;
    avatars?: AvatarDto[];
    twoFactAuth: boolean;
}