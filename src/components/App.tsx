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
import { useState, useEffect } from 'react'
import { useAtom, atom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { atomWithStorage } from 'jotai/utils'

export const useLogin = atom('should login')
export const myProfile = atom({
  username: '',
  displayName: '',
  image: '',
  userId: ''
})
export default function App() {
  const [user, setUser] = useState(myProfile)
  const [login, setLogin] = useAtom(useLogin)
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
  }, [])
  return (
<<<<<<< HEAD
    <div className=" flex container-snap h-screen min-h-screen w-full lg:overflow-y-hidden overflow-x-hidden  bg-[url('https://images.unsplash.com/photo-1564951434112-64d74cc2a2d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3387&q=80')] bg-cover    to-pink-500">
      {login == 'login' ? (
        <>
          <main>
            <Nav Status={'f'} setStatus={setUser} />
          </main>
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/Menu" element={<Menu />} />
            <Route path="/CreateGame" element={<CreateGame />} />
            <Route path="/Watch" element={<GameWatch />} />
            <Route path="/PlayMenu" element={<PlayMenu />} />
            <Route path="/Play" element={<Game />}></Route>
            <Route path="/Profile" element={<Profile />}></Route>
            <Route path="/Chat" element={<Chat />}></Route>
            <Route path="*" element={<Error404 />}></Route>
          </Routes>
        </>
      ) : (
        <Login Status={login} setStatus={setUser} />
      )}
=======
    <div className="container-snap flex h-screen min-h-screen w-full overflow-x-hidden  bg-[url('https://images.unsplash.com/photo-1564951434112-64d74cc2a2d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3387&q=80')] bg-cover    to-pink-500">
      { isAuth ? (
		  <>
	        <main>
	          <Nav setIsAuth={setIsAuth} />
	        </main>
	        <Routes>
	          <Route path="/" element={<Menu />} />
	          <Route path="/CreateGame" element={<CreateGame />} />
	          <Route path="/Watch" element={<GameWatch />} />
	          <Route path="/PlayMenu" element={<PlayMenu />} />
	          <Route path="/Play" element={<Game />}></Route>
	          <Route path="/Profile/:username" element={<Profile />}></Route>
			 			<Route path="/Chat" element={<Chat />}></Route>
	          <Route path="*" element={<Error404 />}></Route>
	        </Routes>
	      </>
	  ) : (
			<Login setIsAuth={setIsAuth} />
	  ) }
>>>>>>> origin/gasselin
    </div>
  )
}
