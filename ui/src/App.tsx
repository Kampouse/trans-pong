
import { Menu } from "components/menu";
import { Routes, Route } from "react-router-dom";
import Login from "components/Login";
import CreateGame from "components/CreateGame";
import Game from "components/Game";
import PlayMenu from "components/PlayMenu";
import Nav from "components/Nav";
export default function App() {
  return (
    <div className="  h-screen min-h-screen w-full overflow-x-hidden  bg-gradient-to-r from-purple-500  to-pink-500">
      <>
		<main>
<Nav/>
<Login/>
			</main>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/CreateGame" element={<CreateGame />} />
          <Route path="/PlayMenu" element={<PlayMenu />} />
          <Route path="/Play" element={<Game />}></Route>
        </Routes>
      </>
    </div>
  );
}


