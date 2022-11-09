import { Send } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import { grey } from "@mui/material/colors";
import Sidebar from "./SidebarDetails";

export function TextBox(prop: { Text?: string }): JSX.Element {
  return (
    <div className="mt-2 flex w-full max-w-xs space-x-3">
      <div className="flex flex-col justify-center">
        <div className="h-10 w-10 shrink-0 rounded-full bg-gray-300"></div>
        <div className="text-sm text-gray-800">name</div>
      </div>
      <div className="p-2 ">
        <div className="flex flex-wrap break-all rounded-r-lg rounded-bl-lg bg-gray-300 p-3 ">
          <p className="text-sm">{prop.Text || "there no text provided"}</p>
        </div>
      </div>
    </div>
  );
}

export default function Rooms(): JSX.Element {
  return (
    // add border to the chat box
    <div className="flex w-[60%] flex-col justify-center overflow-hidden">
      <div className="flex grow flex-col border border-slate-300">
        <div className="flex h-96 grow flex-col overflow-auto p-8">
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hellosihnointashoitshnaeineiashneoiasneoashneioasnishtanieshtaeioashnitenashieotnioeashntieosanhieotnashieotnioeashntieoashnieotnashieotnioeashniths"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox></TextBox>
        </div>
        <div className="w-full flex border-t-[1px] border-slate-300 bg-white">
          <input
            type="text"
            className="w-full border border-gray-300 rounded-xl bg-white my-1 ml-1.5 px-4 py-2 text-base focus:outline-none"
            placeholder="Type something..."
          />
					<div className="m-auto">
						<IconButton className="-rotate-45">
							<Send sx={{ color: grey[700] }}/>
						</IconButton>
					</div>
        </div>
      </div>
    </div>
  );
}
