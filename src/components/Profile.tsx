function MatchResult() {
  return (
    <div className="container mx-auto w-[100%] rounded-md bg-white/[55%]  px-4 pt-0  ring-1   ring-slate-300 sm:px-8">
      <div className="py-8">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">Match Result</h2>
        </div>
        <div className="-mx-4 overflow-x-auto p-4 sm:-mx-8 sm:px-8">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow shadow-gray-300 ">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="border-b-2   border-gray-300 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Home
                  </th>
                  <th className="border-b-2 border-gray-300  px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Res.
                  </th>
                  <th className="border-b-2 border-gray-300  px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Res.
                  </th>
                  <th className="border-b-2 border-gray-300  px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Away
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="w-2/5 border-b border-gray-300  p-5 text-sm">
                    <div className="flex items-center">
                      <div className="hidden h-10 w-10 shrink-0 sm:table-cell">
                        <img
                          className="h-full w-full rounded-full"
                          src="https://images.unsplash.com/photo-1601046668428-94ea13437736?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2167&q=80"
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <p className=" text-gray-900">Team 1</p>
                      </div>
                    </div>
                  </td>
                  <td className="border-b border-gray-300  p-5 text-sm">
                    <p className=" text-center text-gray-900">0</p>
                  </td>
                  <td className="border-b border-gray-300  p-5 text-sm">
                    <p className=" text-center text-gray-900">3</p>
                  </td>
                  <td className="w-2/5 border-b border-gray-300  p-5 text-sm">
                    <div className="float-right flex items-center">
                      <div className="mr-3">
                        <p className=" text-right text-gray-900">Team 2</p>
                      </div>

                      <div className="hidden h-10 w-10 shrink-0 sm:table-cell">
                        <img
                          className="h-full w-full rounded-full"
                          src="https://images.unsplash.com/photo-1601046668428-94ea13437736?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2167&q=80"
                          alt=""
                        />
                      </div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="w-2/5 border-b border-gray-300  p-5 text-sm">
                    <div className="flex items-center">
                      <div className="hidden h-10 w-10 shrink-0 sm:table-cell">
                        <img
                          className="h-full w-full rounded-full"
                          src="https://images.unsplash.com/photo-1601046668428-94ea13437736?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2167&q=80"
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <p className=" text-gray-900">Team 3</p>
                      </div>
                    </div>
                  </td>
                  <td className="border-b border-gray-300  p-5 text-sm">
                    <p className=" text-center text-gray-900">0</p>
                  </td>
                  <td className="border-b border-gray-300  p-5 text-sm">
                    <p className=" text-center text-gray-900">3</p>
                  </td>
                  <td className="w-2/5 border-b border-gray-300  p-5 text-sm">
                    <div className="float-right flex items-center">
                      <div className="mr-3">
                        <p className=" text-right text-gray-900">Team 4</p>
                      </div>
                      <div className="hidden h-10 w-10 shrink-0 sm:table-cell">
                        <img
                          className="h-full w-full rounded-full"
                          src="https://images.unsplash.com/photo-1601046668428-94ea13437736?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2167&q=80"
                          alt=""
                        />
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
  );
}

function FriendList() {
  return (
    <div className="flex  h-[75%] flex-col">
      <div className="  container-snap h-[90%] overflow-y-scroll rounded-lg p-8 shadow-sm dark:border-gray-300 dark:bg-transparent">
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

function Achievements() {
	return (
			<div className="grid-rows-1">
				<h2 className="text-center text-2xl font-semibold pt-6 pb-4">Achievements</h2>
				<h2 className="text-xl font-semibold pl-6">Earned</h2>
				<h2 className="text-xl font-semibold pl-6">Unearned</h2>
			</div>
	);
}

// First steps : Welcome to the game
// Uploaded a profile pic
// Sent your first message in the Chat
// First friend added to your friend list
// First Match Won
// Won 5/10/25/50/100/250 matches
// Won 3/5/10/15/20/25 matches in a row
// Shut out opponent 3/5/10/15/20/25 times
// Scored 25/50/100/250/500/1000 points
// Customized the game
// Won by opponent's withdrawal
// Reaching X rank?
// All achievements obtained

export default function Profile() {
  // canvas should be  replace by the actual game and the chat should be replaced by the actual chat
  return (
    <div className="mt-16 flex h-screen min-h-screen flex-col lg:h-screen lg:flex-row">
      <div className="mx-12 mt-8 h-5/6 rounded-lg bg-white/50 p-1 ring-1 ring-slate-300 backdrop-blur-sm md:ml-4 lg:m-10 lg:mx-8 lg:h-5/6 lg:w-[20%]">
        <div className="grid-rows-1">
          <img
            className="mx-auto mt-12 mb-5  h-40 w-40"
            src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
            alt="Avatar"
          />
          <h1 className="text-center text-2xl font-bold">Username</h1>
          <h1 className="text-center">Rating</h1>
					<h1  className="text-center"><span className="text-green-600">●</span> is online</h1>
          <h1 className="text-center">Rating == wrong</h1>
          <h1 className="text-center">Rating == bad </h1>
        </div>
        <FriendList />
      </div>

      <div className="mx-12 mt-8 h-full rounded-lg backdrop-blur-sm md:ml-4 lg:m-10 lg:mx-8 lg:h-5/6 lg:w-1/2">
        <MatchResult />
      </div>

			<div className="mx-12 mt-8 h-5/6 rounded-lg bg-white/50 p-1 ring-1 ring-slate-300 backdrop-blur-sm md:ml-4 lg:m-10 lg:mx-8 lg:h-5/6 lg:w-[20%]">
				<Achievements />
			</div>
    </div>
  );
}
