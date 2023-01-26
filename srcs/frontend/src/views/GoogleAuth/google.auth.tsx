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
 

       
        
  const  handleSubmit  = async  (e) => {
    e.preventDefault();
    const data =  await Fetch ('api/profile/create/validation', "POST", JSON.stringify({token: token}))
    if (data.status >= 200) {
      const isActive = await Fetch('api/profile/get/auth')
      if (isActive.status === 200) {
         const output = await isActive.json()
        const activeState = output.message === "active" ? true : false;
        if (!activeState)
          throw new Error('invalid token')
        else {
          return onClose(activeState);
        }
      }
      else {
        console.log('error');
      }
    }
  } 
    

  return (  
    <Dialog onClose={onClose} open={open}>
        <div className="px-4 py-4 w-[300px] h-[400px] bg-sky-200">
            <p className=" font-Raleway text-center text-2xl">Google Authenticator</p>
            <div className="my-3 h-[160px] w-[160px] ring-2 mx-[20%] ring-black" >
                {qrCode && <QRCode value={qrCode} size={160} level="M" bgColor="#ffffff" fgColor="#000000" />}
            </div>
            <iframe name="dummyframe" id="dummyframe" className='w-0 h-0'></iframe>
          <input name="token" id="token" onChange={(e) =>  setToken(e.target.value)}  maxLength={7} type="text" placeholder="6 digit token like : 123456" className="w-full text-center mt-2"></input>
                <button onClick={(e) => {handleSubmit(e)}} className='h-fit w-fit my-2 mx-[30%] px-5 text-lg rounded-md bg-[#1976d2] text-white' type='submit'>Activate</button>
                <button onClick={() => {onClose();}} className='h-fit w-fit my- mx-[30%] px-7 text-lg rounded-md bg-[#1976d2] text-white' type='submit'>Close</button>
        </div>
    </Dialog>
  )
}
