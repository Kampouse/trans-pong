import { Dialog } from "@mui/material";
import { ChatRoom } from "components/types";

export interface NewRoomProps {
	open: boolean;
	onClose: (value: null | ChatRoom) => void;
}

function NewRoom({ open, onClose }: NewRoomProps) {
	const handleClose = (val: null | ChatRoom) => {
		onClose(val);
	}
	
	return (
		<Dialog onClose={() => handleClose(null)} open={open}>

		</Dialog>
	);
}

export default NewRoom;