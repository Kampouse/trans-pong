import { Dialog } from "@mui/material";

export function GoogleReset({open, onClose})
{
  return (  
    <Dialog onClose={onClose} open={open}>
        <div className="px-4 py-2 w-[300px] h-[320px] bg-sky-200 font-Raleway text-center">
            <p className="text-2xl py-2">Google Authenticator</p>
            <p className="text-lg py-2">Google 2 way authenticator is already active on your account.</p>
            <p className="text-md py-2">To remove, enter the authentification token and press remove</p>
            <form action='http://localhost:3000/profile/remove/authenticator' method='POST'>
                <input name="token" id="token" type="text" placeholder="6 digit token like : 123456" className="w-[80%] text-center mt-2"></input>
                <button className='hover:bg-purple-200 hover:text-black h-fit w-22 my-3 mx-[8%] px-4 text-md rounded-md bg-[#1976d2] text-white' type="submit">Remove</button>
            </form>
            <button className='hover:bg-purple-200 hover:text-black h-fit w-fit my-3 mx-[30%] px-5 text-md rounded-md bg-[#1976d2] text-white'onClick={() =>{onClose();}}>Cancel</button>
        </div>
    </Dialog>
  )
}
