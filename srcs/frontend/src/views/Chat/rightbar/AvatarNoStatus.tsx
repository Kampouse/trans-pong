import { Avatar, Tooltip} from "@mui/material";
import defaultAvatar from '../../../../public/defaultPhoto.png';
import { FriendDto, PrivateProfileDto } from "utils/user.dto";

export const AvatarNoStatus = ({user}: {user: FriendDto}) => {

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