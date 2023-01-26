import { Avatar, Tooltip} from "@mui/material";
import defaultAvatar from '../../../../public/defaultPhoto.png';
import { UserDto } from "utils/user.dto";

export const AvatarNoStatus = ({user}: {user: UserDto}) => {

    return (
    <Tooltip title={user.username}>
        <Avatar
            src={user?.imagePath? `data:image/jpeg;base64,${user.imagePath}`: defaultAvatar}
            alt='avatar'
            sx={{ width: 56, height: 56 }}                 
        />
    </Tooltip>
    )
}