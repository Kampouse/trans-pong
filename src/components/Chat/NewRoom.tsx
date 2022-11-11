import { Button, ButtonGroup, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { ChatRoom } from "components/types";
import React, { useEffect, useState } from "react";

export interface NewRoomProps {
	open: boolean;
	onClose: (value: null | ChatRoom) => void;
}


function NewRoom({ open, onClose }: NewRoomProps) {
	const [ isNew, setIsNew ] = useState(true);
	const [ roomCode, setRoomCode ] = useState('');
	const [ status, setStatus ] = useState('public');
	const [ password, setPassword ] = useState('');
	const [ repeatPassword, setRepeatPassword ] = useState('');
	const [ passwordMatch, setPasswordMatch ] = useState(true);
	const [ init, setInit ] = useState(true);
	
	const handleClose = (val: null | ChatRoom) => {
		setIsNew(true);
		setRoomCode('');
		setStatus('public');
		setPassword('');
		setRepeatPassword('');
		setPasswordMatch(true);
		setInit(true);
		onClose(val);
	}

	useEffect(() => {
		if (!init)
			setPasswordMatch((password === '' || repeatPassword === '' || password !== repeatPassword) ? false : true);
		setInit(false);
	}, [password, repeatPassword])
	
	return (
		<Dialog onClose={() => handleClose(null)} open={open}>
			<DialogTitle className="bg-sky-200 text-blue-700">New Room</DialogTitle>
			<DialogContent className="bg-sky-200">
				<form className="mx-auto">
					<div className="pb-4">
						<ButtonGroup>
							<Button onClick={() => {setIsNew(true); setPasswordMatch(true); setStatus('public')}} sx={[isNew && { '&:hover': {backgroundColor: '#1d4ed8'}, backgroundColor: '#1d4ed8', color: 'white' }]}>Create Room</Button>
							<Button onClick={() => {setIsNew(false); setRoomCode('');}} sx={[!isNew && { '&:hover': {backgroundColor: '#1d4ed8'}, backgroundColor: '#1d4ed8', color: 'white' }]}>Join Room</Button>
						</ButtonGroup>
					</div>

					{isNew ? (
						<div>
							<ButtonGroup>
								<Button onClick={() => {setStatus('public'); setPasswordMatch(true);}} sx={[status === "public" && { '&:hover': {backgroundColor: '#1d4ed8'}, backgroundColor: '#1d4ed8', color: 'white' }]}>Public</Button>
								<Button onClick={() => {setStatus('private'); setPasswordMatch(true);}} sx={[status === "private" && { '&:hover': {backgroundColor: '#1d4ed8'}, backgroundColor: '#1d4ed8', color: 'white' }]}>Private</Button>
								<Button onClick={() => {setStatus('protected'); setPasswordMatch(false);}} sx={[status === "protected" && { '&:hover': {backgroundColor: '#1d4ed8'}, backgroundColor: '#1d4ed8', color: 'white' }]}>Protected</Button>
							</ButtonGroup>
							<div className="pt-4 m-auto w-fit">
								<input onChange={(e) => {setPassword(e.target.value)}} disabled={status !== 'protected'} type="password" placeholder="Enter Password" />
							</div>
							<div className="py-4 m-auto w-fit">
								<input onChange={(e) => {setRepeatPassword(e.target.value)}} disabled={status !== 'protected'} type="password" placeholder="Repeat Password" />
							</div>
							{ (password !== '' && !passwordMatch) && <div className="m-auto w-fit"><p className="text-red-600">Passwords doesn't match</p></div> }
						</div>
					) : (
						<div className="pb-4 m-auto w-fit">
							<input value={roomCode} onChange={(e) => setRoomCode(e.target.value)} type="text" placeholder="Room Code" />
						</div>
					)}

					<div className="m-auto w-fit">
						<Button disabled={!passwordMatch} sx={[{ '&:hover': {backgroundColor: '#1d4ed8'}, backgroundColor: '#1d4ed8', color: 'white' }]}>
							Proceed
						</Button>
					</div>

				</form>
			</DialogContent>
		</Dialog>
	);
}

export default NewRoom;