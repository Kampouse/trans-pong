import { Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import QRCode from 'qrcode.react';
import {Fetch } from 'utils';
import { getAuth } from "views/Profile/Profile";

export function GoogleAuth({open, onClose})
{
  const [qrCode, setQrCode] = useState<any>(null);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    Fetch('http://localhost:3000/profile/create/googleAuth')
      .then((response) => response.json())
      .then((data) => {
        setQrCode(data.QRcode);
      })
  }, []);
 


  const  handleSubmit  = async  (e) => 
  {
    e.preventDefault();
    const data =  await Fetch('api/profile/create/validation', "POST", JSON.stringify({token: token}))
    .catch((err) => {
        console.error(err);
      })

    if (data && data.status >= 200)
    {
      const isActive = await Fetch('api/profile/get/auth')
      if (isActive.status === 200)
      {
        const output = await isActive.json()
        const activeState = output.message === "active" ? true : false;
        if (!activeState)
        {
            alert("Invalid token");
            return;
        }
        else {
          return onClose(activeState);
        }
      }
      else {
        console.log('error');
      }
    }
    else
        console.log("Invalid code")
  } 
    

  return (  
    <Dialog onClose={onClose} open={open}>
        <div className="px-4 py-4 w-[385px] h-[485px] bg-sky-200">
            <p className=" font-Raleway text-center text-3xl">Google Authenticator</p>
            <div className="my-5 mx-14 h-[240px] w-[240px] ring-2  ring-black" >
                {qrCode && <QRCode value={qrCode} size={240} level="M" bgColor="#ffffff" fgColor="#000000" />}
            </div>
            <iframe name="dummyframe" id="dummyframe" className='w-0 h-0'></iframe>
          <input name="token" id="token" onChange={(e) =>  setToken(e.target.value)}  maxLength={7} type="text" placeholder="6 digit token (123456)" className="font-Raleway h-6 w-full text-center text-lg my-2"></input>
                <button onClick={(e) => {handleSubmit(e)}} className='hover:bg-purple-200 hover:text-black h-fit w-28 font-Raleway my-2 mx-[33%] px-5 text-lg rounded-md bg-[#1976d2] text-white' type='submit'>Activate</button>
                <button onClick={() => {onClose();}} className='hover:bg-purple-200 hover:text-black h-fit w-28 my-2 font-Raleway mx-[33%] px-5 text-lg rounded-md bg-[#1976d2] text-white' type='submit'>Close</button>
        </div>
    </Dialog>
  )
}
