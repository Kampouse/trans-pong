import { Dialog } from '@mui/material'
import { usersocket } from './Matchmaking';

export function Queue({open, onClose})
{
    console.log("HELLO IM ACTIVE")
    return (
        <Dialog onClose={onClose} open={open}>
            <div className='w-[400px] h-[100px] bg-sky-100 pt-1'>
                <p className="text-xl text-center py-6 font-Merriweather">
                    Waiting for an opponent...
                </p>
            </div>
            <div className='bg-sky-100 px-[40%] pb-4'>
                <button className='w-20 h-10 hover:bg-purple-200 font-Merriweather text-xl rounded-lg ring-1 ring-slate-500 bg-sky-200' onClick={() => {onClose()}}>
                    Cancel
                </button>
            </div>
        </Dialog>
    );
}
