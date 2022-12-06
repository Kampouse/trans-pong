import { Menu } from 'components/menu'
import { Routes, Route } from 'react-router-dom'
import Game, { GameWatch } from 'components/Game'
import CreateGame from './CreateGame'
import PlayMenu from './PlayMenu'
import Nav from './Nav'
import Login from './Login'
import Profile from './Profile'
import Api from './Api'
import './main.css'
import Error404 from './Error404'
import Chat from './Chat/Chat'
import React, { useState, useEffect, useRef } from 'react'
import { useAtom, atom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { atomWithStorage } from 'jotai/utils'
import { ChatRoom, User, initAchievement } from './types'
import { Close } from '@mui/icons-material'
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'
import { generateSerial } from 'utils'
import { useNavigate } from 'react-router'

import { prisma } from '../../../backend/src/main'

export const useLogin = atom('should login')
export const useRooms = atom([] as ChatRoom[])
export const useUsers = atom([] as User[]);
export const useRoomCode = atom('');
// export const useUserClicked = atom<React.MutableRefObject<User | null>>(null);

let player2: User = {
  username: 'jbadia',
  id: 'OIWJKDJKR23',
  blockedUsers: [],
  status: 'Online',
  matchHistory: [],
  friendList: [],
  friendRequests: [],
  achievements: initAchievement(),
  firstname: 'Justine',
  lastname: 'Badia'
}
let player3: User = {
  username: 'gcollet',
  id: 'FIKJM32',
  blockedUsers: [],
  status: 'Online',
  matchHistory: [],
  friendList: [],
  friendRequests: [],
  achievements: initAchievement(),
  firstname: 'Gab',
  lastname: 'Collet'
}
let player4: User = {
  username: 'mmondell',
  id: 'UIDJKJ21',
  blockedUsers: [],
  status: 'Playing',
  matchHistory: [],
  friendList: [],
  friendRequests: [],
  achievements: initAchievement(),
  firstname: 'Maxime',
  lastname: 'Mondello'
}
let player5: User = {
  username: 'aguay',
  id: 'OIEK121',
  blockedUsers: [],
  status: 'Playing',
  matchHistory: [],
  friendList: [],
  friendRequests: [],
  achievements: initAchievement(),
  firstname: 'Anthony',
  lastname: 'Guay'
}
let player6: User = {
  username: 'olabrecq',
  id: 'DWAOIIK24R2',
  blockedUsers: [],
  status: 'Offline',
  matchHistory: [],
  friendList: [],
  friendRequests: [],
  achievements: initAchievement(),
  firstname: 'Olivier',
  lastname: 'Labrecque Lacasse'
}
let player7: User = {
  username: 'mleblanc',
  id: 'HIUWADKL32331',
  blockedUsers: [],
  status: 'Offline',
  matchHistory: [],
  friendList: [],
  friendRequests: [],
  achievements: initAchievement(),
  firstname: 'Michael',
  lastname: 'Leblanc'
}
let player8: User = {
  username: 'tberube',
  id: 'OAISJIK23',
  blockedUsers: [],
  status: 'Offline',
  matchHistory: [],
  friendList: [],
  friendRequests: [],
  achievements: initAchievement(),
  firstname: 'Thomas',
  lastname: 'Bérubé'
}

let player1: User = {
  username: 'gasselin',
  id: 'IOEHNJ323',
  blockedUsers: [],
  status: 'Online',
  matchHistory: [
    { scoreUser: 5, scoreOpp: 0, opponent: player2, result: 'win' },
    { scoreUser: 2, scoreOpp: 5, opponent: player5, result: 'loss' },
    { scoreUser: 5, scoreOpp: 4, opponent: player7, result: 'win' },
    { scoreUser: 5, scoreOpp: 0, opponent: player2, result: 'win' },
    { scoreUser: 5, scoreOpp: 4, opponent: player7, result: 'win' },
    { scoreUser: 5, scoreOpp: 4, opponent: player7, result: 'win' },
    { scoreUser: 5, scoreOpp: 4, opponent: player7, result: 'win' },
    { scoreUser: 5, scoreOpp: 4, opponent: player7, result: 'win' },
    { scoreUser: 5, scoreOpp: 4, opponent: player7, result: 'win' }
  ],
  friendList: [player2, player3, player4],
  friendRequests: [player5, player6, player7, player8],
  achievements: initAchievement(),
  firstname: 'Gabriel',
  lastname: 'Asselin'
}

let userDetails: User = player1

export const getUserDetails = () => {
  return userDetails
}


export interface SearchUserProps {
	open: boolean;
	onClose: () => void;
	searchInput: string;
	userClicked: React.MutableRefObject<User | null>;
}

export const getStaticProps = async () => {
	const feed = await prisma.profile.findMany({
		include: {
			// blockedBy
		}
	})
  // const feed = await prisma.post.findMany({
  //   where: { published: true },
  //   include: {
  //     author: {
  //       select: { name: true },
  //     },
  //   },
  // });
  return {
    props: { feed },
    revalidate: 10,
  };
};

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

export default function App() {
  const [user, setUser] = useState(myProfile)
  const [login, setLogin] = useAtom(useLogin)
	const [openSearchUser, setOpenSearchUser] = useState(false);
	const [searchUser, setSearchUser] = useState('');
	const [users, setUsers] = useAtom(useUsers);
	const [rooms, setRooms] = useAtom(useRooms);
	const userClicked = useRef<User | null>(null);
	const navigate = useNavigate();

  const check = async () => {
    fetch('http://localhost:3000/auth/verify', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user != 'no user') {
          setLogin('login')
        }
        return data.user
      })
  }

  //this function should assign a jwt to the user since you can only get if there a active session
  const who = async () => {
    fetch('http://localhost:3000/auth/who', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        return setUser(data.user)
      })
  }

  //this function is called because after page is refreshed variable lost ...
  useEffect(() => {
    check()
    who()

		setRooms([
      {
        code: generateSerial(),
        name: 'Room1',
        users: [player1, player2, player3, player4, player5, player6],
        owner: player1,
        admins: [player1, player2],
        status: 'public',
        password: '',
        messages: [],
        image: null
      },
      {
        code: generateSerial(),
        name: 'Room2',
        users: [player1, player4],
        owner: player4,
        admins: [player4],
        status: 'private',
        password: '',
        messages: [],
        image: null
      }
    ])

    setUsers([
      player1,
      player2,
      player3,
      player4,
      player5,
      player6,
      player7,
      player8
    ])
  }, [])

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
            <Route path="/Profile/:username" element={<Profile userClicked={userClicked} />}></Route>
            <Route path="/Chat" element={<Chat />}></Route>
            <Route path="*" element={<Error404 />}></Route>
          </Routes>
        </>
      ) : (
        <Login Status={login} />
      )}
			<SearchUser open={openSearchUser} onClose={() => {setOpenSearchUser(false); setSearchUser('')}} searchInput={searchUser} userClicked={userClicked} />
    </div>
  )
}
