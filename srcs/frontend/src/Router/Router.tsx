import React, { useState, useEffect, useRef } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import { useNavigate } from 'react-router'
import { Routes, Route } from 'react-router-dom'
import { useAtom, atom } from 'jotai'
import Nav from 'views/Nav/Nav'
import { Menu } from 'views/Menu/menu'
import Game from 'views/Game/Game'
import { SpectateMenu } from 'views/Game/Spectate'
import Matchmaking from 'views/Game/Matchmaking'
import Login from 'views/Login/Login'
import Profile from 'views/Profile/Profile'
import SinglePlayerCanvas from 'views/Game/components/SinglePlayerCanvas'
import '@styles/main.css'
import Error404 from 'views/Error/Error404'
import Chat from 'views/Chat/Chat'
import { ChatRoom, User } from 'utils/types'
import '@styles/main.css'
import { generateSerial,Fetch } from 'utils'
import ColorOptions from 'views/Game/ColorOptions'
export const useLogin = atom('should login')
export const useRooms = atom([] as ChatRoom[])
export const useUsers = atom([] as User[]);
export const useRoomCode = atom('');

export const useBallColor = atom('#ffffff')
export const useBackgroundColor = atom('#ff0000')
export const usePaddleColor = atom('#ffffff')

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

	// const [ballColor, setBallColor] = useAtom(useBallColor)
	// const [backgroundColor, setBackgroundColor] = useAtom(useBackgroundColor)
	// const [paddleColor, setPaddleColor] = useAtom(usePaddleColor)

//  Here we check with the backend if the user is authentificated
const check = async () =>
{
    Fetch('http://localhost:3000/auth/who')
      .then((response) => response.status)
      .then((status) =>
      {
        if (status == 200)
        {
            console.log("User is authentificated, proceed to open the dashboard")
            setLogin('login')
        }
        else
        {
          navigate('/')
            console.log("No user logged, please login.")
        }
      })
}

useEffect(() => { check()}, [])
  return (
    <div className=" flex container-snap h-screen min-h-screen w-full lg:overflow-y-hidden overflow-x-hidden  bg-[url('https://images.unsplash.com/photo-1564951434112-64d74cc2a2d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3387&q=80')] bg-cover    to-pink-500">
        <>
          <main>
            <Nav Status={'f'} setStatus={setUser} setOpenSearchUser={setOpenSearchUser} searchUser={searchUser} setSearchUser={setSearchUser} />
          </main>
          <Routes>
            <Route path="/" element={<Login Status={login} />} />
            <Route path="/Menu" element={<Menu />} />
            <Route path="/Spectate" element={<SpectateMenu />} />
            <Route path="/Play" element={<Game />}></Route>
            <Route path="/MatchMaking" element={<Matchmaking />}></Route>
            <Route path="/Profile">
                <Route path=":username" element={<Profile />} />
                <Route path="" element={<Profile />} />
            </Route>
            <Route path="/Chat" element={<Chat />}></Route>
            <Route path="*" element={<Error404 />}></Route>
            <Route path="/Game">
                <Route path="" element={<SinglePlayerCanvas/>}></Route>
                <Route path=":id" element={<Game/>}></Route>
            </Route>
                <Route path="/ColorOptions" element={<ColorOptions/>}></Route>
            </Routes>
        </>
			<SearchUser open={openSearchUser} onClose={() => {setOpenSearchUser(false); setSearchUser('')}} searchInput={searchUser} userClicked={userClicked} />
    </div>
  )
}
