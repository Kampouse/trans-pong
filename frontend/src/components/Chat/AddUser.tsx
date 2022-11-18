import { Dialog, DialogContent, DialogTitle, DialogActions, DialogContentText, Button } from "@mui/material";
import { useState } from "react";

export interface AddUserProps {
	open: boolean;
	onClose: (user: string | null) => void;
}

export function AddUser({ open, onClose }: AddUserProps) {
	const [username, setUsername] = useState('');

	const handleClose = (user: string | null) => {
		onClose(user);
	}

	return (
		<Dialog onClose={() => handleClose(null)} open={open}>
			<DialogTitle className="bg-sky-200 text-blue-700">Invite User</DialogTitle>
			<DialogContent className="bg-sky-200">
				<form className="mx-auto">
					<div>
						<p className="text-center">Enter the username<br/>of the player you<br/>want to invite :</p>
					</div>
					<div className="py-4 m-auto w-fit">
						<input onChange={(e) => {setUsername(e.target.value)}} placeholder="Username" />
					</div>
					<div className="mx-auto w-fit">
						<Button sx={[{ '&:hover': {backgroundColor: '#1d4ed8'}, backgroundColor: '#1d4ed8', color: 'white' }]} onClick={() => handleClose(username)}>
							Invite
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	)
}