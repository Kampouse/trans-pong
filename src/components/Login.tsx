import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useState  } from "react";
import "./main.css";

 type DataIntput = {
  username: string;
  email: string;
 }


export default function Login({ setIsAuth }) {
	const navigate = useNavigate();
	const [Navi , setNavi] = useState("/");
  const [inputs, setInputs] = useState<DataIntput>({username: "", email: ""});

	  const buttonHandler = ( func: (input:DataIntput) => void, event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    func(inputs);
    const button: HTMLButtonElement = event.currentTarget;
  };
  const  check = async () => {
    fetch("http://localhost:3000/auth/verify", {
      method: "GET",
      headers: { "Content-Type": "application/json",  "Access-Control-Allow-Origin": "*" , "Access-Control-Allow-Credentials": "true" 
     },
    }).then((response) => response.json()).then((data) => {
      if (data.user === "no user") {
        login();
      }
      else {
		  setIsAuth(true);
		  setNavi("/");
      }
      return data;
    })
}  
const login = async () => {
			window.location.href =  "https://api.intra.42.fr/oauth/authorize?client_id=0b768d33ad33083e6f78a8ac6cf1f546be68c17d7fa5bf6479233bab2905f978&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2F42login&response_type=code";
	}
	useEffect(() => {


		check();
		navigate(Navi);
	}, [Navi]);

  return (
		<>
		<div className="flex h-screen w-screen">
			<div className="m-auto" >
					<h1 className="font-kaushan xl:text-[250px] lg:text-[200px] md:text-[150px] sm:text-[100px] text-[75px] text-white ">trans-pong</h1>
					<button className="font-carattere bg-pink-500 text-white xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl text-lg font-bold py-2 px-4 rounded mr-2 mb-2 relative ml-[50%] translate-x-[-50%]" >Login</button>
					<button className=" border-0  py-2 px-2.5 bg-slate-800 text-gray-200 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0"
						onClick={(event) => buttonHandler(check, event) } type="submit"  >Login </button>


			</div>
		</div>
		</>
  );
}
