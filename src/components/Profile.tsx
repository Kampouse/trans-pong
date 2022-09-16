export default function Profile() {
  // canvas should be  replace by the actual game and the chat should be replaced by the actual chat
  return (
    <div className=" mt-12  flex    h-screen min-h-screen     flex-col  lg:ml-4 lg:h-screen lg:flex-row    ">
      <div className="  mt-8   ml-10  h-5/6    w-5/6 rounded-lg bg-white/50 ring-1  ring-slate-300  backdrop-blur-sm  md:ml-4   lg:m-10 lg:ml-2  lg:mr-8 lg:h-5/6  lg:w-1/3 lg:p-4 ">
        <div className="grid-rows-1">
          <img
            className="mx-auto mt-12 mb-5  h-40 w-40"
            src=" https://pic.onlinewebfonts.com/svg/img_51277.png"
            alt="Avatar"
          />
          <h1 className="text-center text-2xl font-bold">Username</h1>
          <h1 className="  text-center ">Rating</h1>
          <h1 className="  text-center ">Rating == wrong</h1>
          <h1 className="text-center ">Rating == bad </h1>
        </div>
      </div>

      <div className="   mt-8 ml-10 mb-10 flex h-5/6  w-5/6 justify-center    rounded-lg bg-white/50 ring-1 ring-slate-300  backdrop-blur-sm  md:ml-4 md:mr-0  lg:m-10  lg:ml-0 lg:mr-16  lg:h-5/6 lg:w-screen  lg:p-4 "></div>
    </div>
  );
}
