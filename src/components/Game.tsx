import Chat from "./Chat";
import ReactiveCanvas from "./ReactiveCanvas";
import { createRef, DetailedHTMLProps, HTMLAttributes } from "react";

export default function Game() {
  return (
	  <ReactiveCanvas />
  );
}

function Next() {
  return (
    <div className="-rotate-180 ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="root"
        version="1.1"
        color="rgb(100,116,137"
        viewBox="0 0 13 16"
        transform="rotate(180,0,0)"
        height={100}
      >
        <path fill="none" stroke="currentColor" d="M 2 4 L 6 8 L 2 12" />
        <path fill="none" stroke="currentColor" d="M 7 4 L 11 8 L 7 12" />
      </svg>
    </div>
  );
}

function Prev() {
  return (
    <div className="-rotate-180 ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="root"
        color="rgb(100,116,137)"
        version="1.1"
        viewBox="0 0 13 16"
        height={100}
      >
        <path fill="none" stroke="currentColor" d="M 2 4 L 6 8 L 2 12" />
        <path fill="none" stroke="currentColor" d="M 7 4 L 11 8 L 7 12" />
      </svg>
    </div>
  );
}

export function GameWatch() {
  return (
    <div className=" mt-12 flex h-screen min-h-screen flex-col   justify-center  md:flex-col lg:ml-4 lg:h-screen lg:flex-row ">
      <div className=" m-4 mt-8 flex  h-5/6 flex-col justify-center rounded-lg bg-white/30 ring-1 ring-slate-300  backdrop-blur-sm  md:ml-4 lg:m-8  lg:mr-2 lg:w-screen ">
        <button className="absolute rounded-lg ">
          {" "}
          <Prev />{" "}
        </button>
        <button className="absolute right-2 rounded-lg ">
          {" "}
          <Next />{" "}
        </button>

        <canvas />
      </div>
      <Chat></Chat>
    </div>
  );
}
