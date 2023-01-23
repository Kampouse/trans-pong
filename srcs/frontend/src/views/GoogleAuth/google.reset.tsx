import { Dialog } from "@mui/material";
import { useState } from "react";
import { Fetch } from "utils";
export function GoogleReset({open, onClose})
{
const [input, setInput] = useState<string>('')
  const handleSubmit = (e) => {
    e.preventDefault();
     const body = { token: input }
    Fetch("/api/profile/remove/authenticator", "POST", JSON.stringify(body)).then((response) => {
      if (response.status === 200) {
        const isActive =  Fetch('api/profile/get/auth').then((response) => response.json()).then((data) => {
          const activeState = data.message === "inactive" ? true : false;
           if(activeState)
           {
             return  onClose(activeState);
           }
           else {
             throw new Error('token is invalid') 

           }
        })
      }
      else {
        //should be a ui alert that token is invalid
        console.log("token is invalid");
      }
    })
}
 const handleChange = (e) => { 
    setInput(e.target.value)
  }
  
  return (  
    <Dialog onClose={onClose} open={open}>
        <div className="px-4 py-2 w-[300px] h-[320px] bg-sky-200 font-Raleway text-center">
            <p className="text-2xl py-2">Google Authenticator</p>
            <p className="text-lg py-2">Google 2 way authenticator is already active on your account.</p>
            <p className="text-md py-2">To remove, enter the authentification token and press remove</p>
            <iframe name="dummyframe" id="dummyframe" className='w-0 h-0'></iframe>
        <input onChange={(e) => handleChange(e)} name="token" id="token" maxLength={7} type="text" placeholder="6 digit token like : 123456" className="w-[80%] text-center mt-2"></input>
        <button className='hover:bg-purple-200 hover:text-black h-fit w-22 my-3 mx-[8%] px-4 text-md rounded-md bg-[#1976d2] text-white'
           onClick={(e) => { handleSubmit(e) }} type="submit">Remove</button>
            <button className='hover:bg-purple-200 hover:text-black h-fit w-fit my-3 mx-[30%] px-5 text-md rounded-md bg-[#1976d2] text-white'onClick={() => {onClose();}}>Cancel</button>
        </div>
    </Dialog>
  )
}
