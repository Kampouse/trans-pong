import { Close } from "@mui/icons-material";
import { IconButton, Snackbar } from "@mui/material";

export interface SnackbarProps {
	message: string;
	open: boolean;
	onClose: () => void;
}

// Place in App.tsx later
export function AchievementSnackbar() {

}

export function GeneralSnackbar({ message, open, onClose }: SnackbarProps) {
	return (
		<div>
			<Snackbar 
				anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
				open={open}
				autoHideDuration={5000}
				onClose={onClose}
				message={message}
				action={
					<IconButton size="small" onClick={onClose}>
						<Close fontSize="small" />
					</IconButton>
				}
			/>
		</div>
	);
}