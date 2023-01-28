import { Avatar, Tooltip} from "@mui/material";
import defaultAvatar from '../../../default_avatar/profile_image.jpeg';
import { UserDto } from "api/dto/user.dto";

export const AvatarNoStatus = ({user}: {user: UserDto}) => {

    return (
    <Tooltip title={user.name}>
        <Avatar
            src={user?.currentAvatar? `data:image/jpeg;base64,${user.currentAvatar.data}`: defaultAvatar}
            alt='avatar'
            sx={{ width: 56, height: 56 }}                 
        />
    </Tooltip>
    )
}