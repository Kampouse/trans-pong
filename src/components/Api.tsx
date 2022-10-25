import { Routes, Route } from "react-router-dom";
import React, { useState,useEffect } from "react";
import { InputType } from "zlib";

type ApiOutput = { message: string | null;

};
//  a type for the input to the API call to the backend that check if a user as this email and username in the database
 type DataIntput = {
  username: string;
  email: string;
 }

export default function Api()  {

  const [data , setData] = useState<ApiOutput>({message: null});
  const [inputs, setInputs] = useState<DataIntput>({username: "", email: ""});
  const [shouldTrigger, setShouldTrigger] = useState(false);

/* generic function to handle the input change */
  const buttonHandler = ( func: (input:DataIntput) => void, event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    func(inputs);
    const button: HTMLButtonElement = event.currentTarget;
  };
    
const  getAllUsers= async () => {
    fetch("http://localhost:3000/users", {
      method: "GET", 
      headers: { "Content-Type": "application/json" }, 
      
    }).then((response) => response.json()).then((data) => {
      return data;
    }) 
}
const  login = async () => {

      console.log("login");
  fetch("http://localhost:3000/auth/login", { 
    method: "GET" }).then((response) => response.json()).then((data) => {
})
}


 const PostVerifUser = async (input: DataIntput, func?: (input:DataIntput) => void) => { 
  const response = await fetch("http://localhost:3000/users/exists/" + input.email + "/" + input.username, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  const dataArr: Array<InputType> = data;
    if(dataArr.length == 0 &&  func !== undefined)
      func(input);
    else {
      // maybe send a message to the user that the username or email is already taken
      console.log("user already exists");
    }
  return data;
}
 
const  CreateUser = async (Data:DataIntput ) => {
    fetch("http://localhost:3000/users", {
      method: "POST", 
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify(Data)
    }).then((response) => response.json()).then((data) => {
      return data;
    }) 
}

const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
}
    useEffect(() => {
      if (shouldTrigger) {
          getAllUsers();
      }
    }, [shouldTrigger]);
  return( 
    <>
    <div className="flex flex-col justify-center items-center pt-20 ">
          <form className="flex flex-col justify-center items-center pt-20 " onSubmit={() =>{CreateUser(inputs) ; console.log("did it send")  } }>
          <label htmlFor="name">Name</label>
          <input type="text" onChange={handleInputChange} name="username" id="username" />
          <label htmlFor="email">Email</label>
          <input type="text"  onChange={handleInputChange} name="email" id="email" />
      <button className=" border-0  py-2 px-2.5 bg-slate-800 text-gray-200 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0"
        onClick={(event) => buttonHandler(() => { PostVerifUser(inputs,CreateUser) }, event)} type="submit"  >send data </button>

      </form>
// button that trigger login function
      <button className=" border-0  py-2 px-2.5 bg-slate-800 text-gray-200 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0"
        onClick={(event) => buttonHandler(login, event)} type="submit"  >login </button>
  </div>
 </>)
}
