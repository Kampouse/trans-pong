import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAtom,atom } from 'jotai'
import { useLogin } from "./App";

export default function Nav({Status, setStatus}) {
      const [login, setLogin] = useAtom(useLogin)
	  const buttonHandler = ( func: () => void, event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    func();
    const button: HTMLButtonElement = event.currentTarget;
  };

	const logout = () => {
      setLogin("reset");
       
	}
  return (

    <nav className="fixed z-10 flex w-full flex-wrap items-center justify-between bg-gray-900 py-3 text-gray-200 shadow-lg">
      <div className=" flex w-full flex-wrap items-center justify-between px-6">
        <button
          className=" border-0 bg-transparent py-2 px-2.5 text-gray-200 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent1"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        ></button>
        <div className=" grow  " id="navbarSupportedContent1">
          <Link to="/" className=" text-xl font-semibold text-white">
            trans-pong
          </Link>
          <Link to="/Play" className=" ml-2 pl-3 font-semibold text-white">
            Play
          </Link>
          <Link to="/Profile" className=" ml-2 pl-3 font-semibold text-white">
            Profile
          </Link>
          <Link to="/API" className=" ml-2 pl-3 font-semibold text-white">
            API
          </Link>
          <ul className="  mr-auto flex flex-col pl-0"></ul>
        </div>

        <div className="relative flex items-center">
			<button  onClick={(event) => buttonHandler(logout, event) } type="submit"  >Login </button>
        </div>
      </div>
    </nav>
  );
}
