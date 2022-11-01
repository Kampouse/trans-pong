import { useEffect } from "react";
import { useNavigate } from "react-router";
import "./main.css";

export default function Login({ setIsAuth }) {
	const navigate = useNavigate();

	const loginRequest = () => {
		setIsAuth(true);
	}

	useEffect(() => {
		navigate('/');
	}, [])

  return (
		<>
		<div className="flex h-screen w-screen">
			<div className="m-auto" >
					<h1 className="font-kaushan xl:text-[250px] lg:text-[200px] md:text-[150px] sm:text-[100px] text-[75px] text-white ">trans-pong</h1>
					<button className="font-carattere bg-pink-500 text-white xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl text-lg font-bold py-2 px-4 rounded mr-2 mb-2 relative ml-[50%] translate-x-[-50%]" onClick={loginRequest}>Login</button>
			</div>
		</div>
		</>
  );
}
