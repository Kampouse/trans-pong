import { Menu } from "components/menu";
import { Routes, Route } from "react-router-dom";
import Game, { GameWatch } from "components/Game";
import CreateGame from "./CreateGame";
import PlayMenu from "./PlayMenu";
import Nav from "./Nav";
import Login from "./Login";
import Profile from "./Profile";
import "./main.css";
import Error404 from "./Error404";
import Chat from "./Chat/Chat";
import { useState } from "react";

export default function App() {

  const [ isAuth, setIsAuth ] = useState(false);

  return (
    <div className=" container-snap h-screen min-h-screen w-full overflow-x-hidden  bg-[url('https://images.unsplash.com/photo-1564951434112-64d74cc2a2d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3387&q=80')] bg-cover    to-pink-500">
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
	          <Route path="/Profile" element={<Profile />}></Route>
			 			<Route path="/Chat" element={<Chat />}></Route>
	          <Route path="*" element={<Error404 />}></Route>
	        </Routes>
	      </>
	  ) : (
			<Login setIsAuth={setIsAuth} />
	  ) }
    </div>
  );
}
