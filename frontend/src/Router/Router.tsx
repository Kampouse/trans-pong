import React, { useState, useEffect, useRef, Children, useContext } from 'react'
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
import Login2fa from 'views/Login/Login2fa'
import '@styles/main.css'
import { generateSerial,Fetch } from 'utils'
import ColorOptions from 'views/Game/ColorOptions'
import { PrivateProfileDto } from 'utils/user.dto'
import { UserAPI } from 'api/user.api'
import { WebsocketContext, WebsocketProvider } from 'context/WebSocketContext'
// import { PrivateProfileDto } from '../../../backend/src/dtos/profile.dtos'
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

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
	const [user, setUser] = React.useState<PrivateProfileDto | null>(null)
	const [login, setLogin] = useAtom(useLogin)
  const [isLogin, setIsLogin] = useState(useLogin)
	const [openSearchUser, setOpenSearchUser] = useState(false);
	const [searchUser, setSearchUser] = useState('');
	const [users, setUsers] = useAtom(useUsers);
	const [rooms, setRooms] = useAtom(useRooms);
	const userClicked = useRef<User | null>(null);
	const navigate = useNavigate();
  return (
    <>
        <main>
            <Nav Status={'f'} setStatus={setUser} setOpenSearchUser={setOpenSearchUser} searchUser={searchUser} setSearchUser={setSearchUser} />
          </main>
        { isLogin &&  children }
    </>
  );
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

export const UserContext = React.createContext<PrivateProfileDto | null >(null);
export const SetUserContext = React.createContext<any>(null);

export default function App()
{
	const [user, setUser] = React.useState<PrivateProfileDto | null>(null)
	const [login, setLogin] = useAtom(useLogin)
	const [openSearchUser, setOpenSearchUser] = useState(false);
	const [searchUser, setSearchUser] = useState('');
	const [users, setUsers] = useAtom(useUsers);
	const [rooms, setRooms] = useAtom(useRooms);
	const userClicked = useRef<User | null>(null);
	const navigate = useNavigate();

  // const [user, setUser] = React.useState<UserDto | null>(null);
  const socket = useContext(WebsocketContext);
  const [loggedIn, setLoggedIn] = React.useState(false);
  // const [loggedIn, setLoggedIn] = React.useState(false);
	// const [ballColor, setBallColor] = useAtom(useBallColor)
	// const [backgroundColor, setBackgroundColor] = useAtom(useBackgroundColor)
	// const [paddleColor, setPaddleColor] = useAtom(usePaddleColor)

//  Here we check with the backend if the user is authentificated
  const SecondAuthStatus = async () => {
    const secondAuth = await Fetch('http://localhost:3000/profile/get/auth')
    if (secondAuth.status === 200) {
      const isAuth2 = await secondAuth.json()
      if (isAuth2.message && isAuth2.message === 'active') {
         return true
      }
      else if (isAuth2.message) {
        return  false
      }
    }
  }
  //when a user as 2fa enable force  the redirection to the 2fa page or to the login page
  //where the user can fiill the data to access   the rest of the app
const check = async () =>
{
  try {
    const auth = await Fetch('http://localhost:3000/auth/who')
    if (auth.status === 200) {
      setLogin('login')
    }
    else if (auth.status === 403)
      navigate('/')
  
    else if (auth.status === 401) {
      navigate('/2fa')   
    }
  }
  catch (error) {

      navigate('/')
  }
  
}
useEffect(() => { check()}, [])

React.useEffect(() => {
  const fetchProfile = async () => {
    const respUser = await UserAPI.getUserProfile();
    setUser(respUser);

    if (!respUser) {
      const logged = await UserAPI.isLoggedIn();
      setLoggedIn(logged.loggedIn);
    }
    else {
      setLoggedIn(true);
    }

    if (respUser) {
      socket.emit("userUpdate");
    }
  };

  fetchProfile();
  // eslint-disable-next-line
}, []);

React.useEffect(() => {
  socket.on("onUserChange", () => {
    const fetchProfile = async () => {
      const respUser = await UserAPI.getUserProfile();
      setUser(respUser);

      if (!respUser) {
        const logged = await UserAPI.isLoggedIn();
        setLoggedIn(logged.loggedIn);
      }
      else {
        setLoggedIn(true);
      }
    };

    fetchProfile();
  });
  return () => {
    socket.off("onUserChange");
  };
}, [socket]);
return (
        <>
    <div className=" flex container-snap h-screen min-h-screen w-full lg:overflow-y-hidden overflow-x-hidden  bg-[url('https://images.unsplash.com/photo-1564951434112-64d74cc2a2d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3387&q=80')] bg-cover    to-pink-500">
          <UserContext.Provider value={user}>
          <SetUserContext.Provider value={setUser}>
          <Routes>
           <Route path="/" element={  <Login Status={login} loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> } />
           <Route path="/2fa" element={  <Login2fa /> } />
            <Route path="/Menu" element={ <Wrapper><Menu/></Wrapper>} />
            <Route path="/Spectate" element={<Wrapper><SpectateMenu /> </Wrapper>} />
            <Route path="/Play" element={ <Wrapper> <Game /> </Wrapper>}></Route>
            <Route path="/MatchMaking" element={ <Wrapper><Matchmaking/></Wrapper>}></Route>
            <Route path="/Profile">
                <Route path=":username" element={ <Wrapper> <Profile/></Wrapper>} />
                <Route path="" element={  <Wrapper> <Profile/></Wrapper>} />
            </Route>
            <Route path="/Chat" element={<Wrapper> <WebsocketProvider value={socket}> <Chat /> </WebsocketProvider></Wrapper>}></Route>
            <Route path="*" element={<Error404 />}></Route>
            <Route path="/Game">
                <Route path="" element={<Wrapper> <SinglePlayerCanvas/></Wrapper> }></Route>
                <Route path=":id" element={<Wrapper><Game/></Wrapper>}></Route>
            </Route>
                <Route path="/ColorOptions" element={ <Wrapper> <ColorOptions/> </Wrapper>}></Route>
            </Routes>
            </SetUserContext.Provider>
        </UserContext.Provider>
        </div>
    </>
   )
}
