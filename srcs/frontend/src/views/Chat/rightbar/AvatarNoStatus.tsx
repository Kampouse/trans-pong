import { Avatar, Tooltip} from "@mui/material";
import defaultAvatar from '../../../default_avatar/profile_image.jpeg';
import { FriendDto, PrivateProfileDto } from "utils/user.dto";

export const AvatarNoStatus = ({user}: {user: PrivateProfileDto}) => {

    return (
    <Tooltip title={user.username}>
        <Avatar 
            src={user?.imagePath? `${user.imagePath}`: defaultAvatar}
            alt='avatar'
            sx={{ width: 56, height: 56 }}                 
        />
    </Tooltip>
    )
}

export const AvatarNoStatusFriend = ({user}: {user: FriendDto}) => {

    return (
    <Tooltip title={user.friendUser}>
        <Avatar 
            src={user?.friendPhoto? `${user.friendPhoto}`: defaultAvatar}
            alt='avatar'
            sx={{ width: 56, height: 56 }}                 
        />
    </Tooltip>
    )
}