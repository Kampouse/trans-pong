import "../../main.css";
function FriendList() {
  return (
    <div className="flex  h-[75%] flex-col">
      <div className="  container-snap h-screen overflow-y-scroll rounded-lg bg-transparent p-8 shadow-sm dark:border-gray-300">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-slate-600">
            Friend list
          </h3>
        </div>
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-500 dark:divide-slate-300"
          >
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="shrink-0">
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                    alt="Neil image"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <button className="truncate text-sm font-medium text-gray-900 hover:underline dark:text-slate-600">
                    Neil Sims
                  </button>
                  <p className="truncate text-sm text-gray-500 dark:text-slate-500">
                    email@windster.com
                  </p>
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="shrink-0">
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                    alt="Neil image"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-slate-600">
                    Neil Sims
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-slate-500">
                    email@windster.com
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function Profile() {
  // canvas should be  replace by the actual game and the chat should be replaced by the actual chat
  return (
    <div className=" mt-16  flex    h-screen min-h-screen     flex-col   lg:h-screen lg:flex-row    ">
      <div className="  mx-12    mt-8  h-5/6    rounded-lg bg-white/50 p-1 ring-1  ring-slate-300  backdrop-blur-sm  md:ml-4   lg:m-10 lg:mx-8  lg:h-5/6 lg:w-1/3">
        <div className="grid-rows-1">
          <img
            className="mx-auto mt-12 mb-5  h-40 w-40"
            src=" https://pic.onlinewebfonts.com/svg/img_51277.png"
            alt="Avatar"
          />
          <h1 className="text-center text-2xl font-bold">Username</h1>
          <h1 className="  text-center ">Rating</h1>
          <h1 className="  text-center ">is online </h1>
          <h1 className="  text-center ">Rating == wrong</h1>
          <h1 className="text-center ">Rating == bad </h1>
        </div>
        <FriendList />
      </div>

      <div className="   mx-12    mt-8  h-full    rounded-lg bg-white/50 ring-1 ring-slate-300  backdrop-blur-sm  md:ml-4  lg:m-10   lg:ml-2 lg:mr-8  lg:h-5/6 lg:w-5/6  lg:p-4 "></div>
    </div>
  );
}
