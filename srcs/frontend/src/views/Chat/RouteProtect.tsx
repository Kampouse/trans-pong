import { Typography } from "@mui/material";
import React from "react";
import { PrivateProfileDto } from "utils/user.dto"; 
import { UserContext } from "Router/Router";

interface RouteProtectProps {
    children: JSX.Element
}

const RouteProtect = ({ children }: RouteProtectProps) => {

    const user: PrivateProfileDto | null = React.useContext(UserContext);

    if (!user) {
        return  (             
        <Typography variant="h3" display="flex" sx={{ ml:5, mt:5 }}>
            You need to be logged in to access this page
        </Typography>
        )
    }
    return <>{children}</>;
};

export default RouteProtect;