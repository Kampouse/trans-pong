import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAtom,atom } from 'jotai'
import { useLogin , getUserDetails } from "../Router/Router";


import { TextField, FormControl, OutlinedInput } from "@mui/material";
import { User } from "../utils/types";

export default function Nav({Status, setStatus, setOpenSearchUser, searchUser, setSearchUser}) {
  const [login, setLogin] = useAtom(useLogin)
	const userDetails: User = getUserDetails();

	const buttonHandler = ( func: () => void, event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    func();
    const button: HTMLButtonElement = event.currentTarget;
  };

  const logout = () => {
    setLogin('reset')
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
          <Link to="/" className=" text-xl font-Merriweather text-white">
            Transcendence
          </Link>
          <Link to="/Matchmaking" className=" ml-2 pl-3 font-Merriweather text-white">
            Play
          </Link>
          <Link to="/Profile" className=" ml-2 pl-3 font-Merriweather text-white">
            Profile
          </Link>
          <Link to="/Channel" className=" ml-2 pl-3 font-Merriweather text-white">
            Channel
          </Link>
          <ul className="mr-auto flex flex-col pl-0"></ul>
        </div>

        <div className="relative flex items-center font-Merriweather">
					<form onSubmit={(e) => {e.preventDefault(); if (searchUser !== '') setOpenSearchUser(true); }}>
						<input value={searchUser} type="text" placeholder="Search User" onChange={e => setSearchUser(e.target.value)} className="w-[125px] rounded-sm text-gray-700" />
					</form>
					<button  onClick={(event) => buttonHandler(logout, event) } type="submit" className="pl-4" >Logout </button>
        </div>
      </div>
    </nav>
  )
}
