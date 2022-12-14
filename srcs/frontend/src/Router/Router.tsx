import React, { useState, useEffect, useRef } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import { useNavigate } from 'react-router'
import { Routes, Route } from 'react-router-dom'
import { useAtom, atom } from 'jotai'
import Nav from 'views/Nav/Nav'
import { Menu } from 'views/Menu/menu'
import Game, { GameWatch } from 'views/Game/Game'
import Matchmaking from 'views/Game/Matchmaking'
import CreateGame from 'views/Game/CreateGame'
import PlayMenu from 'views/Game/PlayMenu'
import Login from 'views/Login/Login'
import Profile from 'views/Profile/Profile'
import '@styles/main.css'
import Error404 from 'views/Error/Error404'
import Chat from 'views/Chat/Chat'
import { ChatRoom, User } from 'utils/types'
import '@styles/main.css'
import { generateSerial } from 'utils'
export const useLogin = atom('should login')
export const useRooms = atom([] as ChatRoom[])
export const useUsers = atom([] as User[]);
export const useRoomCode = atom('');

export const getUserDetails = () =>
{
}

export interface SearchUserProps {
	open: boolean;
	onClose: () => void;
	searchInput: string;
	userClicked: React.MutableRefObject<User | null>;
}

export function SearchUser({ open, onClose, searchInput, userClicked }: SearchUserProps) {
	const [users, setUsers] = useAtom(useUsers);
	const usersList: User[] = users.filter((user: User) => {return user.username.search(searchInput.toLowerCase()) > -1});

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle className= 'text-blue-700 bg-sky-200' sx={{width: 250}}>
				Search Results
			</DialogTitle>
			<DialogContent sx={{height: 300, width: 250}} className='bg-sky-200'>
				{(usersList.length) ? (usersList.map((user: User) => {
					return (
						<div className="flex flex-row flex-nowrap align-center py-1.5 pl-4 my-auto cursor-pointer hover:bg-blue-700 hover:text-white h-[50px]" onClick={() => {userClicked.current = user}} key={generateSerial()}>
							<img
								className="h-[35px] w-[35px] rounded-full"
								src="https://images.unsplash.com/photo-1601046668428-94ea13437736?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2167&q=80"
								alt=""
							/>
							<div className="align-center my-auto pl-2">
								<p className="font-bold">{user.username}</p>
							</div>
					</div>	
					)
				})) : (
					<p>No result found</p>
				)}
			</DialogContent>
		</Dialog>
	)
}

export const myProfile = atom({
  username: '',
  displayName: '',
  image: '',
  userId: ''
})

export default function App()
{
	const [user, setUser] = useState(myProfile)
	const [login, setLogin] = useAtom(useLogin)
	const [openSearchUser, setOpenSearchUser] = useState(false);
	const [searchUser, setSearchUser] = useState('');
	const [users, setUsers] = useAtom(useUsers);
	const [rooms, setRooms] = useAtom(useRooms);
	const userClicked = useRef<User | null>(null);
	const navigate = useNavigate();

//  Here we check with the backend if the user is authentificated
  return (
    <div className=" flex container-snap h-screen min-h-screen w-full lg:overflow-y-hidden overflow-x-hidden  bg-[url('https://images.unsplash.com/photo-1564951434112-64d74cc2a2d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3387&q=80')] bg-cover    to-pink-500">
      {login == 'login' ? (
        <>
          <main>
            <Nav Status={'f'} setStatus={setUser} setOpenSearchUser={setOpenSearchUser} searchUser={searchUser} setSearchUser={setSearchUser} />
          </main>
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/Menu" element={<Menu />} />
            <Route path="/CreateGame" element={<CreateGame />} />
            <Route path="/Watch" element={<GameWatch />} />
            <Route path="/PlayMenu" element={<PlayMenu />} />
            <Route path="/Play" element={<Game />}></Route>
            <Route path="/MatchMaking" element={<Matchmaking />}></Route>
            <Route path="/Profile">
                <Route path=":username" element={<Profile />} />
                <Route path="" element={<Profile />} />
            </Route>
            <Route path="/Chat" element={<Chat />}></Route>
            <Route path="*" element={<Error404 />}></Route>
          </Routes>
        </>
      ) : (
        <Login Status={login} />
      )}
    </div>
  )
}
