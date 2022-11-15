import { Person, Send } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import { grey } from "@mui/material/colors";
import { ChatRoom, Messages, User } from "components/types";
import { useState } from "react";
import { getUserDetails } from "./Chat";

export function TextBox({ currentMsg }: { currentMsg: Messages }): JSX.Element {
  return (
    <div className="mt-2 flex w-full">
      <div className="flex flex-col justify-center w-[75px]">
        <div className="w-[40px] mx-auto"><Avatar sx={{ weight: 40, height: 40 }}><Person /></Avatar></div>
        <div><p className="w-[75px] text-center text-sm text-gray-800">{ currentMsg.user.username }</p></div>
      </div>
      <div className="p-2">
        <div className="flex flex-wrap break-all rounded-r-lg rounded-bl-lg bg-gray-300 p-3 w-full">
          <p className="text-sm">{ currentMsg.message }</p>
        </div>
      </div>
    </div>
  );
}

const ListMessage = ({ roomDetails, userDetails }: { roomDetails: ChatRoom, userDetails: User }) => {
	return (
		<>
			{ roomDetails.messages.map((currentMsg: Messages) => {
					return (
						(userDetails.blockedUsers.find((user) => user.username === currentMsg.user.username) === undefined)
						&&
						( <TextBox currentMsg={currentMsg} /> )
					)
				})
			}
		</>
	);
}

export default function Rooms({ roomDetails }: { roomDetails: ChatRoom }): JSX.Element {
	const  userDetails: User = getUserDetails();
	const [ msg, setMsg ] = useState('');

	const sendMessage = (event) => {
		event.preventDefault();
		if (msg !== '') {
			roomDetails.messages.push({message: msg, user: userDetails});
			setMsg('');
		}
	}

  return (
    // add border to the chat box
    <div className="flex w-[60%] flex-col justify-center overflow-hidden border border-slate-300">
      <div className="flex grow flex-col backdrop-blur-sm transition ease-in">
        <div className="flex grow flex-col overflow-auto p-8">
					<ListMessage roomDetails={roomDetails} userDetails={userDetails} />
        </div>
				<div className="min-h-[51px]">
					<form onSubmit={sendMessage} >
		        <div className="w-full flex border-t-[1px] border-slate-300 bg-white">
		          <input
		            type="text"
		            className="w-full border border-gray-300 rounded-xl bg-white my-1 ml-1.5 px-4 py-2 text-base focus:outline-none"
		            placeholder="Type something..."
								onChange={(e) => {setMsg(e.target.value)}}
								value={msg}
		          />
							<div className="m-auto">
								<IconButton className="-rotate-45" onClick={sendMessage}>
									<Send sx={{ color: grey[700] }}/>
								</IconButton>
							</div>
						</div>
					</form>
				</div>
      </div>
    </div>
  );
}
