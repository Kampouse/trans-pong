import { Menu } from "components/menu";
import { Routes, Route } from "react-router-dom";
import Game from "components/Game";
import CreateGame from "./CreateGame";
import PlayMenu from "./PlayMenu";
import Nav from "./Nav";
import Login from "./Login";
export default function App() {
  return (
    <div className="  h-screen min-h-screen w-full overflow-x-hidden bg-gradient-to-r from-purple-500  to-pink-500">
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
