import { Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import QRCode from 'qrcode.react';

export function GoogleAuth({open, onClose})
{
  const [qrCode, setQrCode] = useState<any>(null);

  useEffect(() => {
    fetch('http://localhost:3000/profile/create/googleAuth')
      .then((response) => response.json())
      .then((data) => {
        setQrCode(data.QRcode);
      })
  }, []);

  return (  
    <Dialog onClose={onClose} open={open}>
        <div className="px-4 py-4 w-[300px] h-[320px] bg-sky-200">
            <p className=" font-Merriweather text-center text-2xl">Google Auth</p>
            <div className="my-3 h-[160px] w-[160px] ring-2 mx-[20%] ring-black" >
                {qrCode && <QRCode value={qrCode} size={160} level="M" bgColor="#ffffff" fgColor="#000000" />}
            </div>
            <form action='http://localhost:3000/profile/create/validation/' method='POST'>
                <input name="token" id="token" type="text" placeholder="6 digit token like : 123456" className="w-full text-center mt-2"></input>
                <button className='h-fit w-fit my-2 mx-[30%] px-5 text-lg rounded-md bg-[#1976d2] text-white' type='submit'>Activate</button>
            </form>
        </div>
    </Dialog>
  )
}
