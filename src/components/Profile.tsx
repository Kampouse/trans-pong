import Medal from './medal.ico'

function MatchResult() {
  return (
    <div className="mx-auto w-[100%] h-full rounded-md  px-4 pt-0  ring-1   ring-slate-300 sm:px-8">
      <div className="py-4">
        <div  className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold leading-tight">Recent Matches</h2>
					<a
            href="#"
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            View all
          </a>
        </div>
        <div className="-mx-4 overflow-x-auto p-4 sm:-mx-8 sm:px-8 ">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow shadow-gray-300 bg-white/[55%]">
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
      <div className="  container-snap h-[85%] overflow-y-scroll rounded-lg p-8 dark:border-gray-300 dark:bg-transparent">
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
		<div className="w-[100%] h-full rounded-md px-4 pt-0 ring-1 ring-slate-300 sm:px-8 mb-10">
			<div className="pt-8 pb-4">
          <h2 className="text-2xl font-semibold leading-tight">Achievements</h2>
			</div>
			<div className="-mx-4 overflow-x-auto p-2 sm:-mx-8 sm:px-8">
        <div className="inline-block min-w-full overflow-hidden shadow shadow-gray-300 bg-white/[55%]">
          <table className="min-w-full leading-normal">
            <tbody>
              <tr>
                <td className="border-b border-gray-300  p-3 text-sm">
                  <div className="flex items-center">
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
                  </div>
                </td>
                <td className="border-b border-gray-300  p-3 text-sm">
                  <div className="flex items-center">
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
                  </div>
                </td>
								<td className="border-b border-gray-300  p-3 text-sm">
                  <div className="flex items-center">
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
                  </div>
                </td>
								<td className="border-b border-gray-300  p-3 text-sm">
                  <div className="flex items-center">
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
                  </div>
                </td>
							</tr>
							<tr>
                <td className="border-b border-gray-300  p-3 text-sm">
                  <div className="flex items-center">
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
                  </div>
                </td>
                <td className="border-b border-gray-300  p-3 text-sm">
                  <div className="flex items-center">
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
                  </div>
                </td>
								<td className="border-b border-gray-300  p-3 text-sm">
                  <div className="flex items-center">
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
                  </div>
                </td>
								<td className="border-b border-gray-300  p-3 text-sm">
                  <div className="flex items-center">
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
                  </div>
                </td>
							</tr>
							<tr>
                <td className="border-b border-gray-300  p-3 text-sm">
                  <div className="flex items-center">
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
                  </div>
                </td>
                <td className="border-b border-gray-300  p-3 text-sm">
                  <div className="flex items-center">
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
                  </div>
                </td>
								<td className="border-b border-gray-300  p-3 text-sm">
                  <div className="flex items-center">
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
                  </div>
                </td>
								<td className="border-b border-gray-300  p-3 text-sm">
                  <div className="flex items-center">
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
                  </div>
                </td>
							</tr>
							<tr>
                <td className="border-b border-gray-300  p-3 text-sm">
                  <div className="flex items-center">
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
                  </div>
                </td>
                <td className="border-b border-gray-300  p-3 text-sm">
                  <div className="flex items-center">
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
                  </div>
                </td>
								<td className="border-b border-gray-300  p-3 text-sm">
                  <div className="flex items-center">
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
                  </div>
                </td>
								<td className="border-b border-gray-300  p-3 text-sm">
                  <div className="flex items-center">
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
                  </div>
                </td>
							</tr>
							<tr>
                <td className="border-b border-gray-300  p-3 text-sm">
                  <div className="flex items-center">
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
                  </div>
                </td>
                <td className="border-b border-gray-300  p-3 text-sm">
                  <div className="flex items-center">
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
                  </div>
                </td>
								<td className="border-b border-gray-300  p-3 text-sm">
                  <div className="flex items-center">
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
                  </div>
                </td>
								<td className="border-b border-gray-300  p-3 text-sm">
                  <div className="flex items-center">
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
                  </div>
                </td>
							</tr>
							<tr>
                <td className="border-b border-gray-300  p-3 text-sm">
                  <div className="flex items-center">
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
                  </div>
                </td>
                <td className="border-b border-gray-300  p-3 text-sm">
                  <div className="flex items-center">
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
                  </div>
                </td>
								<td className="border-b border-gray-300  p-3 text-sm">
                  <div className="flex items-center">
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
                  </div>
                </td>
								<td className="border-b border-gray-300  p-3 text-sm">
                  <div className="flex items-center">
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
                  </div>
                </td>
							</tr>
							<tr>
                <td className="border-b border-gray-300  p-3 text-sm">
                  <div className="flex items-center">
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
                  </div>
                </td>
                <td className="border-b border-gray-300  p-3 text-sm">
                  <div className="flex items-center">
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
                  </div>
                </td>
								<td className="border-b border-gray-300  p-3 text-sm">
                  <div className="flex items-center">
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
                  </div>
                </td>
								<td className="border-b border-gray-300  p-3 text-sm">
                  <div className="flex items-center">
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
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
	);
}

// First steps : Welcome to the game
// Uploaded a profile pic
// Sent your first message in the Chat
// First friend added to your friend list
// First Match Won
// Won 5/10/25/50/100 matches
// Won 3/5/10/15/20 matches in a row
// Shut out opponent 5/10/15/20/25 times
// Scored 25/50/100/250/500 points
// Customized the game
// Won by opponent's withdrawal
// All achievements obtained

export default function Profile() {
  return (
    <div className="mt-16 mb-10 flex h-screen min-h-screen flex-col lg:h-screen lg:flex-row">
      <div className="mx-[5%] mt-8 h-5/6 rounded-lg bg-white/50 p-1 ring-1 ring-slate-300 backdrop-blur-sm md:mx-[5%] lg:m-10 lg:mx-[5%] lg:h-5/6 lg:w-[25%]">
        <div className="grid-rows-1">
          <img
            className="mx-auto mt-12 mb-5  h-40 w-40"
            src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
            alt="Avatar"
          />
          <h1 className="text-center text-2xl font-bold">Username</h1>
          <h1 className="text-center">Rating</h1>
					<h1 className="text-center"><span className="text-green-600">●</span> is online</h1>
          <h1 className="text-center">Rating == wrong</h1>
          <h1 className="text-center">Rating == bad </h1>
        </div>
        <FriendList />
      </div>

			<div className="grid grid-cols-1 lg:grid-rows-3 sm:grid-rows-4 h-5/6 lg:ml-0 mx-[5%] mt-8 md:mx-[5%] lg:m-10 lg:mx-[5%] lg:w-[60%] sm:mt-[6%]">
	      <div className="grid row-span-2 lg:h-[95%] bg-white/50 rounded-lg backdrop-blur-sm mb-[5%] min-h-[450px]">
	        <MatchResult />
	      </div>

				<div className="grid lg:row-span-1 row-span-2 bg-white/50 rounded-lg backdrop-blur-sm mt-4 mb-10 lg:mb-0 min-h-[450px]">
	        <Achievements />
	      </div>
	    </div>
		</div>
  );
}
