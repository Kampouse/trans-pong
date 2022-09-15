export default function Profile() {
  // canvas should be  replace by the actual game and the chat should be replaced by the actual chat
  return (
    <div className=" mt-12  flex    h-screen min-h-screen     flex-col  lg:ml-4 lg:h-5/6 lg:flex-row    ">
      <div className="  mt-8  flex h-5/6    w-5/6 rounded-lg bg-white/50 ring-1  ring-slate-300  backdrop-blur-sm  md:ml-4   lg:m-10 lg:ml-2  lg:mr-8 lg:h-5/6  lg:w-1/3 lg:p-4 ">
        <div className="flex flex-col  align-middle ">
          <img
            className="h-32 w-32 rounded-full lg:ml-20"
            src=" https://pic.onlinewebfonts.com/svg/img_51277.png"
            alt="Avatar"
          />
          <h1 className=" ml-20 text-center text-2xl font-bold">Username</h1>
          <div className="ml-5  mb-4  h-10  lg:ml-4">
            <h1 className="mt-3 text-sm font-bold text-slate-800">Rank: </h1>
            <h1 className="mt-3 text-sm font-bold text-slate-800">Wins: </h1>
            <h1 className="mt-3 text-sm font-bold text-slate-800">Losses: </h1>
            <h1 className="mt-3 text-sm font-bold text-slate-800">
              Win Rate:{" "}
            </h1>
            <h1 className="mt-3 text-sm font-bold text-slate-800">
              Total Games:{" "}
            </h1>
            <h1 className="mt-3 text-sm font-bold text-slate-800">
              Total Time Played:{" "}
            </h1>
            <h1 className="mt-3 text-sm font-bold text-slate-800">
              Total Time AFK:{" "}
            </h1>
          </div>
        </div>
      </div>
      <div className="   mt-8 ml-10 mb-10 flex h-5/6  w-5/6 justify-center    rounded-lg bg-white/50 ring-1 ring-slate-300  backdrop-blur-sm  md:ml-4 md:mr-0  lg:m-10  lg:ml-0 lg:mr-16  lg:h-5/6 lg:w-screen  lg:p-4 "></div>
    </div>
  );
}
