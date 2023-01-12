import { Dialog } from '@mui/material'
import { useNavigate } from 'react-router-dom';

export function UserOption({open, onClose, userClicked, setValue})
{
    //  Username of the user clicked and his profile path
    const username = userClicked.current;
    var redirect = "/profile/" + username;
    const nav = useNavigate();


    //  CSS style for button
    const buttonCss = 'bg-slate-100 text-2xl font-Raleway hover:bg-purple-100 ring-1 ring-slate-500 rounded-lg mx-[25%] w-[50%] h-11'

    //  Get request for adding a friend
    async function addFriend(username: string)
    {
        await fetch('http://localhost:3000/profile/add/' + username)
        .then(function(){})
        .catch(function() {console.log("error on adding " + username);});
    }

    async function blockUser(username: string)
    {
        await fetch('http://localhost:3000/profile/block/' + username)
        .then(function(){})
        .catch(function() {console.log("error on blocking " + username);});
    }

    return (
        <Dialog onClose={onClose} open={open}>
            <div className='flex-col w-[450px] h-[500px] bg-sky-100 pt-1'>
                <h1 className='text-4xl font-Raleway w-full text-center py-5'>
                    {username}
                </h1>
                <div className='py-4'>
                    <button name='viewProfileButton' className={buttonCss} onClick={() =>{nav(redirect, {replace: true}); onClose(); setValue("1");}}>
                        Profile page
                    </button>
                </div>
                <div className='py-4'>
                    <button name='addFriendButton' className={buttonCss} onClick={() =>{addFriend(username), nav('/profile/' + username, {replace: true}); onClose();}}>
                        Add friend
                    </button>
                </div>
                <div className='py-4'>
                    <button name='blockUserEvent' className={buttonCss} onClick={() =>
                        {
                            blockUser(username);
                            nav('/profile/' + username, {replace: true});
                            onClose();
                        }}>
                        Block user
                    </button>
                </div>
                <div className='py-4'>
                    <button name='inviteChatButton' className={buttonCss} onClick={() =>
                        {
                            console.log("Insert event invite " + username + " to chat")
                        }}>
                        Invite to chat
                    </button>
                </div>
                <div className='py-4 mb-2'>
                    <button name='invitePlayButton' className={buttonCss} onClick={() =>{onClose()}}>
                        Cancel
                    </button>
                </div>
            </div>
        </Dialog>
    )
}
