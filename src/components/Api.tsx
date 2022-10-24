import { Routes, Route } from "react-router-dom";
import { useState,useEffect } from "react";

type ApiOutput = { message: string | null;

};



export default function Api()  {
// allow localhost to access the api on port 3000
  const [data , setData] = useState<ApiOutput>({message: null});
const [shouldTrigger, setShouldTrigger] = useState(false);
  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const button: HTMLButtonElement = event.currentTarget;
      getData();
  };
    

const  getData = async () => {
    fetch("http://localhost:3000/users", {
      method: "GET", 
      headers: { "Content-Type": "application/json" }, 
      
    }).then((response) => response.json()).then((data) => {
        console.log(data);
    }) 
}
const  createUser = async (  ) => {
  console.log("hello");
  fetch("http://localhost:3000/users", {
    method: "POST", 
    headers: {  "Content-Type": "application/json"  }, body : JSON.stringify({name: "setting", email: "of the futer" })
    
  }

).then((response) => response.json()).then((data) => setData({ message: data.message }));



} 
// only trigger the api call when the button is clicked 
      useEffect(() => {
        if (shouldTrigger) {
           getData();
        }
      }, [shouldTrigger]);

  return( 
    <>
    <div className="flex flex-col justify-center items-center pt-20 ">
    <button
          className=" border-0  py-2 px-2.5 bg-slate-800 text-gray-200 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0"
          type="button" onClick={ buttonHandler } >getData </button>
          

    
 <h1> {data.message} </h1>
  </div>

 </> 
  
  )

}
