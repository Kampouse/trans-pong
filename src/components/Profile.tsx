function MatchResult() {


return(


<div className="container mx-auto px-4 sm:px-8">
    <div className="py-8">
        <div>
            <h2 className="text-2xl font-semibold leading-tight">Matches Schedule</h2>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Home
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Res.
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Res.
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Away
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 w-10 h-10 hidden sm:table-cell">
                                        <img className="w-full h-full rounded-full"
                                            src="https://images.unsplash.com/photo-1601046668428-94ea13437736?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2167&q=80"
                                            alt="" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            Team 1
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap text-center">0</p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap text-center">
                                    3
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
                                <div className="flex items-center float-right">
                                    <div className="mr-3">
                                        <p className="text-gray-900 whitespace-no-wrap text-right">
                                            Team 2
                                        </p>
                                    </div>
                                    <div className="flex-shrink-0 w-10 h-10 hidden sm:table-cell">
                                        <img className="w-full h-full rounded-full"
                                            src="https://images.unsplash.com/photo-1601046668428-94ea13437736?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2167&q=80"
                                            alt="" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 w-10 h-10 hidden sm:table-cell">
                                        <img className="w-full h-full rounded-full"
                                            src="https://images.unsplash.com/photo-1601046668428-94ea13437736?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2167&q=80"
                                            alt="" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            Team 3
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap text-center">0</p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap text-center">
                                    3
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
                                <div className="flex items-center float-right">
                                    <div className="mr-3">
                                        <p className="text-gray-900 whitespace-no-wrap text-right">
                                            Team 4
                                        </p>
                                    </div>
                                    <div className="flex-shrink-0 w-10 h-10 hidden sm:table-cell">
                                        <img className="w-full h-full rounded-full"
                                            src="https://images.unsplash.com/photo-1601046668428-94ea13437736?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2167&q=80"
                                            alt="" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

)


}

function FriendList() {
  return (
    <div className="flex  h-[75%] flex-col">
      <div className="  container-snap h-screen overflow-y-scroll rounded-lg shadow-sm dark:border-gray-300 dark:bg-transparent p-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-slate-600">
            Friend list 
          </h3>
          <a
            href="#"
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            View all
          </a>
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
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-slate-600">
                    Neil Sims
                  </p>
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

      <div className="   mx-12    mt-8  h-full    rounded-lg bg-white/50 ring-1 ring-slate-300  backdrop-blur-sm  md:ml-4  lg:m-10   lg:ml-2 lg:mr-8  lg:h-5/6 lg:w-5/6  lg:p-4 ">

<MatchResult/>

      </div>
    </div>
  );
}
