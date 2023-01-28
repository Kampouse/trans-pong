import { Avatar, Tooltip} from "@mui/material";
import defaultAvatar from '../../../../public/defaultPhoto.png';
import { User, userStatus } from '@prisma/client';

export const AvatarNoStatus = ({user}: {user: User}) => {

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