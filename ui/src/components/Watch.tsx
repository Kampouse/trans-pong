import Chat from "./Chat";
export default function Watch() {
  // canvas should be  replace by the actual game and the chat should be replaced by the actual chat
  return (
    <div className=" mt-12 flex h-screen min-h-screen flex-col   justify-center  md:flex-col lg:ml-4 lg:h-screen lg:flex-row ">
      <div className=" m-4 mt-8 flex  h-5/6 flex-col justify-center rounded-lg bg-white/30 ring-1 ring-slate-300  backdrop-blur-sm  md:ml-4 lg:m-8  lg:mr-2 lg:w-screen ">
        <canvas />
      </div>
      <Chat></Chat>
    </div>
  );
}
