import Medal from './medal.ico'
import { Popover, PopoverHandler, PopoverContent, Button } from "@material-tailwind/react"
import { Matches, User } from 'components/types';
import { getUserDetails } from './Chat/Chat';

function MatchResult({userDetails}: {userDetails: User}) {
  return (
    <div className="mx-auto w-[100%] h-full rounded-md  px-4 pt-0  sm:px-8">
      <div className="py-4 ">
        <div  className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold leading-tight">Matches Played</h2>
        </div>
        <div className="-mx-4 overflow-x-auto p-4 sm:-mx-8 sm:px-8 ">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow shadow-gray-300 bg-white/[55%] h-[390px] overflow-y-scroll scrollbar-hide">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="border-b-2   border-gray-300 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Winner
                  </th>
                  <th className="border-b-2 border-gray-300  px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Res.
                  </th>
                  <th className="border-b-2 border-gray-300  px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Res.
                  </th>
                  <th className="border-b-2 border-gray-300  px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Loser
                  </th>
                </tr>
              </thead>
							
							<tbody>
							{userDetails.matchHistory.map((currentMatch: Matches) => {
								return (
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
													<p className=" text-gray-900">{(currentMatch.result === 'win') ? userDetails.username : currentMatch.opponent.username}</p>
												</div>
											</div>
										</td>
										<td className="border-b border-gray-300  p-5 text-sm">
											<p className=" text-center text-gray-900">{(currentMatch.result === 'win') ? currentMatch.scoreUser : currentMatch.scoreOpp}</p>
										</td>
										<td className="border-b border-gray-300  p-5 text-sm">
											<p className=" text-center text-gray-900">{(currentMatch.result === 'loss') ? currentMatch.scoreUser : currentMatch.scoreOpp}</p>
										</td>
										<td className="w-2/5 border-b border-gray-300  p-5 text-sm">
											<div className="float-right flex items-center">
												<div className="mr-3">
													<p className=" text-right text-gray-900">{(currentMatch.result === 'loss') ? userDetails.username : currentMatch.opponent.username}</p>
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
								)
							})}
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
    <div className="flex  md:h-[60%] h-[60%] flex-col">
      <div className="container-snap rounded-lg p-8 dark:border-gray-300 dark:bg-transparent">
        <div className="flex items-center justify-between ">
          <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-slate-600">
            Friend list
          </h3>
        </div>
        <div className="flow-root h-[280px] overflow-y-scroll scrollbar-hide">
          <ul
            role="list"
            className="divide-y divide-gray-500 dark:divide-slate-300"
          >
            <li className="py-4">
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
                  <p className="text-sm text-gray-500 dark:text-slate-500"><span className="text-green-600">●</span>Online</p>
                </div>
              </div>
            </li>
            <li className="py-4">
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
                  <p className="text-sm text-gray-500 dark:text-slate-500"><span className="text-amber-500">●</span>Playing</p>
                </div>
              </div>
            </li>
            <li className="py-4">
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
                  <p className="text-sm text-gray-500 dark:text-slate-500"><span className="text-red-600">●</span>Offline</p>
                </div>
              </div>
            </li>
						<li className="py-4">
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
                  <p className="text-sm text-gray-500 dark:text-slate-500"><span className="text-red-600">●</span>Offline</p>
                </div>
              </div>
            </li>
						<li className="py-4">
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
                  <p className="text-sm text-gray-500 dark:text-slate-500"><span className="text-red-600">●</span>Offline</p>
                </div>
              </div>
            </li>
						<li className="py-4">
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
                  <p className="text-sm text-gray-500 dark:text-slate-500"><span className="text-red-600">●</span>Offline</p>
                </div>
              </div>
            </li>
						<li className="py-4">
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
                  <p className="text-sm text-gray-500 dark:text-slate-500"><span className="text-red-600">●</span>Offline</p>
                </div>
              </div>
            </li>
						<li className="py-4">
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
                  <p className="text-sm text-gray-500 dark:text-slate-500"><span className="text-red-600">●</span>Offline</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const getAchievementCSS = (name: string) => {
	if (name) // if achievement obtained
		return "flex items-center";
	return "flex items-center opacity-25";
}

function Achievements() {
	return (
		<div className="w-[100%] h-full rounded-md px-4 pt-0 sm:px-8 ">
			<div className="pt-8 pb-4">
          <h2 className="text-2xl font-semibold leading-tight">Achievements</h2>
			</div>
			<div className="-mx-4 p-2 sm:-mx-8 sm:px-8">
        <div className="inline-block min-w-full shadow shadow-gray-300 bg-white/[55%] h-[420px] overflow-y-scroll scrollbar-hide">
          <table className="min-w-full leading-normal">
            <tbody>
              <tr>
                <td className="border-b border-gray-300  p-3 text-smw-1/4">
                  <div className={getAchievementCSS("FirstSteps")}>
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
					  				<div className='ml-1'>
					  					<p className='text-lg font-semibold'>First steps</p>
										</div>
                  </div>
                </td>
                <td className="border-b border-gray-300  p-3 text-sm w-1/4">
                  <div className={getAchievementCSS("UploadImage")}>
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
										<div className='ml-1'>
					  					<p className='text-lg font-semibold'>Upload image</p>
										</div>
                  </div>
                </td>
								<td className="border-b border-gray-300  p-3 text-sm w-1/4">
                  <div className={getAchievementCSS("FirstMessage")}>
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
										<div className='ml-1'>
					  					<p className='text-lg font-semibold'>First message</p>
										</div>
                  </div>
                </td>
								<td className="border-b border-gray-300  p-3 text-sm w-1/4">
                  <div className={getAchievementCSS("FirstFriend")}>
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
												/>
                    </div>
										<div className='ml-1'>
					  					<p className='text-lg font-semibold'>First friend</p>
										</div>
                  </div>
                </td>
							</tr>
							<tr>
                <td className="border-b border-gray-300  p-3 text-sm w-1/4">
                  <div className={getAchievementCSS("ChangeSettings")}>
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
										<div className='ml-1'>
					  					<p className='text-lg font-semibold'>Change settings</p>
										</div>
                  </div>
                </td>
                <td className="border-b border-gray-300  p-3 text-smw-1/4">
                  <div className={getAchievementCSS("FirstWin")}>
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
					  				<div className='ml-1'>
					  					<p className='text-lg font-semibold'>First win</p>
										</div>
                  </div>
                </td>
								<td className="border-b border-gray-300  p-3 text-sm w-1/4">
                  <div className={getAchievementCSS("WonGiveUp")}>
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
										<div className='ml-1'>
					  					<p className='text-lg font-semibold'>Won by give up</p>
										</div>
                  </div>
                </td>
								<td className="border-b border-gray-300  p-3 text-sm w-1/4">
                  <div className={getAchievementCSS("5Wins")}>
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
										<div className='ml-1'>
					  					<p className='text-lg font-semibold'>5 wins</p>
										</div>
                  </div>
                </td>
							</tr>
							<tr>
								<td className="border-b border-gray-300  p-3 text-sm w-1/4">
                  <div className={getAchievementCSS("10Wins")}>
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
										<div className='ml-1'>
					  					<p className='text-lg font-semibold'>10 wins</p>
										</div>
                  </div>
                </td>
                <td className="border-b border-gray-300  p-3 text-smw-1/4">
                  <div className={getAchievementCSS("25Wins")}>
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
					  				<div className='ml-1'>
					  					<p className='text-lg font-semibold'>25 wins</p>
										</div>
                  </div>
                </td>
                <td className="border-b border-gray-300  p-3 text-sm w-1/4">
                  <div className={getAchievementCSS("50Wins")}>
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
										<div className='ml-1'>
					  					<p className='text-lg font-semibold'>50 wins</p>
										</div>
                  </div>
                </td>
								<td className="border-b border-gray-300  p-3 text-sm w-1/4">
                  <div className={getAchievementCSS("100Wins")}>
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
										<div className='ml-1'>
					  					<p className='text-lg font-semibold'>100 wins</p>
										</div>
                  </div>
                </td>
							</tr>
							<tr>
								<td className="border-b border-gray-300  p-3 text-sm w-1/4">
                  <div className={getAchievementCSS("3Row")}>
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
										<div className='ml-1'>
					  					<p className='text-lg font-semibold'>3 in a row</p>
										</div>
                  </div>
                </td>
                <td className="border-b border-gray-300  p-3 text-smw-1/4">
                  <div className={getAchievementCSS("5Row")}>
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
					  				<div className='ml-1'>
					  					<p className='text-lg font-semibold'>5 in a row</p>
										</div>
                  </div>
                </td>
                <td className="border-b border-gray-300  p-3 text-sm w-1/4">
                  <div className={getAchievementCSS("10Row")}>
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
										<div className='ml-1'>
					  					<p className='text-lg font-semibold'>10 in a row</p>
										</div>
                  </div>
                </td>
								<td className="border-b border-gray-300  p-3 text-sm w-1/4">
                  <div className={getAchievementCSS("15Row")}>
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
										<div className='ml-1'>
					  					<p className='text-lg font-semibold'>15 in a row</p>
										</div>
                  </div>
                </td>
							</tr>
							<tr>
								<td className="border-b border-gray-300  p-3 text-sm w-1/4">
                  <div className={getAchievementCSS("20Row")}>
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
										<div className='ml-1'>
					  					<p className='text-lg font-semibold'>20 in a row</p>
										</div>
                  </div>
                </td>
                <td className="border-b border-gray-300  p-3 text-smw-1/4">
                  <div className={getAchievementCSS("Shut5")}>
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
					  				<div className='ml-1'>
					  					<p className='text-lg font-semibold'>Shut 5 times</p>
										</div>
                  </div>
                </td>
                <td className="border-b border-gray-300  p-3 text-sm w-1/4">
                  <div className={getAchievementCSS("Shut10")}>
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
										<div className='ml-1'>
					  					<p className='text-lg font-semibold'>Shut 10 times</p>
										</div>
                  </div>
                </td>
								<td className="border-b border-gray-300  p-3 text-sm w-1/4">
                  <div className={getAchievementCSS("Shut15")}>
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
										<div className='ml-1'>
					  					<p className='text-lg font-semibold'>Shut 15 times</p>
										</div>
                  </div>
                </td>
							</tr>
							<tr>
								<td className="border-b border-gray-300  p-3 text-sm w-1/4">
                  <div className={getAchievementCSS("Shut20")}>
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
										<div className='ml-1'>
					  					<p className='text-lg font-semibold'>Shut 20 times</p>
										</div>
                  </div>
                </td>
                <td className="border-b border-gray-300  p-3 text-smw-1/4">
                  <div className={getAchievementCSS("Shut25")}>
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
					  				<div className='ml-1'>
					  					<p className='text-lg font-semibold'>Shut 25 times</p>
										</div>
                  </div>
                </td>
                <td className="border-b border-gray-300  p-3 text-sm w-1/4">
                  <div className={getAchievementCSS("25points")}>
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
										<div className='ml-1'>
					  					<p className='text-lg font-semibold'>25 points</p>
										</div>
                  </div>
                </td>
								<td className="border-b border-gray-300  p-3 text-sm w-1/4">
                  <div className={getAchievementCSS("50points")}>
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
										<div className='ml-1'>
					  					<p className='text-lg font-semibold'>50 points</p>
										</div>
                  </div>
                </td>
							</tr>
							<tr>
								<td className="border-b border-gray-300  p-3 text-sm w-1/4">
                  <div className={getAchievementCSS("100points")}>
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
										<div className='ml-1'>
					  					<p className='text-lg font-semibold'>100 points</p>
										</div>
                  </div>
                </td>
                <td className="border-b border-gray-300  p-3 text-smw-1/4">
                  <div className={getAchievementCSS("250points")}>
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
					  				<div className='ml-1'>
					  					<p className='text-lg font-semibold'>250 points</p>
										</div>
                  </div>
                </td>
                <td className="border-b border-gray-300  p-3 text-sm w-1/4">
                  <div className={getAchievementCSS("500points")}>
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
										<div className='ml-1'>
					  					<p className='text-lg font-semibold'>500 points</p>
										</div>
                  </div>
                </td>
								<td className="border-b border-gray-300  p-3 text-sm w-1/4">
                  <div className={getAchievementCSS("Diamond")}>
                    <div className="sm:table-cell">
                      <img
                        className="h-[25px] w-[25px]"
                        src={Medal}
                        alt=""
                      />
                    </div>
										<div className='ml-1'>
					  					<p className='text-lg font-semibold'>Diamond trophy</p>
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

export default function Profile() {
	const  userDetails: User = getUserDetails();

  return (
    <div className="m-auto pt-[50px] flex flex-col lg:flex-row h-[750px] w-full">
      <div className="h-[100%] mx-[5%] rounded-lg bg-white/50 p-1 ring-1 ring-slate-300 backdrop-blur-sm lg:w-[20%] ">
        <div className="grid-rows-1">
          <img
            className="mx-auto mt-12 mb-5  h-40 w-40"
            src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
            alt="Avatar"
          />
          <h1 className="text-center text-2xl font-bold">Username</h1>
          <h1 className="text-center">Rating</h1>
					<h1 className="text-center"><span className="text-green-600">●</span>Online</h1>
          <h1 className="text-center">Rating == wrong</h1>
          <h1 className="text-center">Rating == bad </h1>
        </div>
      
			  <FriendList />

				{/* <div className='mx-auto flex max-w-fit align-bottom'>
					<Popover>
						<PopoverHandler>
							<Button variant='gradient' className=" bg-pink-500 text-white font-bold ">Stats</Button>
						</PopoverHandler>
						<PopoverContent>
							Wins: <br/>
							Losses: <br/>
							Points won:
						</PopoverContent>
					</Popover>
				</div> */}
      </div>
			
			<div className='w-[35%] h-full flex'>
				<div className='w-[75%] h-full bg-sky-200 rounded-xl'></div>
				<div className='w-[25%] h-full grid grid-rows-8'>
					<div className='grid bg-sky-200 mt-4 mr-10 rounded-r-full'><p className='mt-6 ml-2'>Match History</p></div>
					<div className='grid bg-sky-200 mt-4 mr-10 rounded-r-full'><p className='mt-6 ml-2'>Achievements</p></div>
					<div className='grid bg-sky-200 mt-4 mr-10 rounded-r-full'><p className='mt-6 ml-2'>Stats</p></div>
					<div className='grid bg-sky-200 mt-4 mr-10 rounded-r-full'><p className='mt-6 ml-2'>Friend Requests</p></div>
				</div>
			</div>

			{/* <div className="lg:ml-0 mx-[5%] lg:w-[60%] pt-[50px] lg:pt-0">
	      <div className="bg-white/50 rounded-lg backdrop-blur-sm mb-[50px] h-[475px] ring-1 ring-slate-300">
	        <MatchResult userDetails={userDetails} />
	      </div>

				<div className="bg-white/50 rounded-lg backdrop-blur-sm mt-4 mb-10 h-[475px] ring-1 ring-slate-300">
	        <Achievements />
	      </div>
	    </div> */}
		</div>
  );
}

// https://codesandbox.io/s/r4m5jp6jjq
// https://mui.com/material-ui/react-tabs/
// https://codepen.io/str3d6885b6fb/pen/MNVemK