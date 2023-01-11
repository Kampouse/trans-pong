import { UserStatus } from "api/dto/user.dto";
import React from "react";
import { StyledBadge } from "./StyledBadge";


export const UserStatusBadge = ({status, children}: {status: UserStatus, children: any}) => {

    const statusStyle = (status: UserStatus) => {
        switch (status) {
            case UserStatus.Online:
            return "green";
            case UserStatus.InGame:
            return "blue";
            case UserStatus.Offline:
            return "red";
            default:
            return "white";
        }
    };

    return (
        <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            variant="dot"
            sx={{ '& .MuiBadge-badge': {
                backgroundColor: statusStyle(status),
                color: statusStyle(status)
            }}}
        >
        {children}

        </StyledBadge>
    );
}