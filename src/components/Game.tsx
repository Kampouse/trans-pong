import Chat from "./Chat";

export default function Game() {
  return (
    <div className=" flex h-screen min-h-screen flex-col    justify-center md:flex-col lg:h-screen  lg:flex-row ">
      <div className=" m-4 mt-8 flex  h-5/6 flex-col justify-center ring-1  ring-slate-600 lg:m-8 lg:mr-2 lg:w-screen ">
        <canvas />
      </div>
      <Chat></Chat>
    </div>
  );
}
