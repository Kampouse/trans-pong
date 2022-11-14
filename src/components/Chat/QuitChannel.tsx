import { Dialog, DialogContent, DialogTitle, DialogActions, DialogContentText, Button } from "@mui/material";

export interface QuitChannelProps {
	open: boolean;
	onClose: (action: boolean) => void;
}

export function QuitChannel({ open, onClose }: QuitChannelProps) {
	const handleClose = (action: boolean) => {
		onClose(action);
	}

	return (
		<Dialog onClose={() => handleClose(false)} open={open}>
			<DialogTitle className="bg-sky-200 text-blue-700">Quit Channel</DialogTitle>
			<DialogContent className="bg-sky-200">
				<DialogContentText>
					Are you sure you want to leave this channel?
				</DialogContentText>
			</DialogContent>
			<DialogActions className="bg-sky-200">
				<Button onClick={() => handleClose(true)} sx={{ fontWeight: 'bold' }}>Agree</Button>
				<Button onClick={() => handleClose(false)} sx={{ fontWeight: 'bold' }}>Disagree</Button>
			</DialogActions>
		</Dialog>
	)
}