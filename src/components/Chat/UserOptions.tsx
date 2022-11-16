import { Person } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle, Avatar } from "@mui/material";
import { blue } from '@mui/material/colors';
import { User } from "components/types";
import React from "react";

export interface UserOptionsProps {
	open: boolean;
	currentUser: User | null;
	onClose: (action: boolean) => void;
}

export function UserOptions({ open, currentUser, onClose }: UserOptionsProps) {
	const handleClose = (action: boolean) => {
		onClose(action);
	}

	return (
		<Dialog onClose={() => handleClose(false)} open={open}>
			<DialogTitle className="bg-sky-200 text-blue-700">
				<React.Fragment>
					<Avatar sx={{ backgroundColor: blue[700] }}><Person /></Avatar>
					<div className="align-center my-auto pl-2">
						{ currentUser && <p className="font-bold">{currentUser!.username}</p>}
					</div>
				</React.Fragment>
			
			</DialogTitle>
		</Dialog>
	)
}