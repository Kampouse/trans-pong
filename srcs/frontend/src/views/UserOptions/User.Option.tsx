import { Dialog } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { Fetch } from 'utils';
import { useEffect, useState } from 'react';

//  Get data about the friend relation

const useFetch = () =>
{
	const [relation, setRelation] = useState<any>(null);
	
	// useEffect(() => {
		Fetch('http://localhost:3000/profile')
      .then((response) => response.json())
			.then((data) => {
				setRelation(data);
			})
			.catch((err) => {
        console.error(err);
      })       
	// }, [])
	return {relation};
}

export function UserOption({open, onClose, userClicked, setValue})
{
    //  Username of the user clicked and his profile path
    const username = userClicked.current;
    var redirect = "/profile/" + username;
    const nav = useNavigate();
		

    //  CSS style for button
    const buttonCss = 'bg-slate-100 text-2xl font-Raleway hover:bg-purple-100 ring-1 ring-slate-500 rounded-lg mx-[25%] w-[50%] h-10'

    //  Get request for adding a friend
    async function addFriend(username: string)
    {
        await Fetch('http://localhost:3000/profile/add/' + username)
        .then(function(){})
        .catch(function() {console.log("error on adding " + username);});
    }

    async function removeFriend(username: string)
    {
        await Fetch('http://localhost:3000/profile/remove/' + username)
        .then(function(){})
        .catch(function() {console.log("error on removing friend " + username);});
    }

    async function blockUser(username: string)
    {
        await Fetch('http://localhost:3000/profile/block/' + username)
        .then(function(){})
        .catch(function() {console.log("error on blocking " + username);});
    }

    async function unBlockUser(username: string)
    {
        await Fetch('http://localhost:3000/profile/unblock/' + username)
        .then(function(){})
        .catch(function() {console.log("error on unblocking " + username);});
    }

    return (
        <Dialog onClose={onClose} open={open}>
            <div className='w-[450px] h-[450px] bg-sky-100 pt-1'>
                <h1 className='text-4xl font-Raleway w-full text-center py-5'>
                    {username}
                </h1>
                <div className='py-3'>
                    <button name='viewProfileButton' className={buttonCss} onClick={() =>{nav(redirect, {replace: true}); onClose(); setValue("1");}}>
                        Profile page
                    </button>
                </div>
                <div className='py-3'>
                    <button name='addFriendButton' className={buttonCss} onClick={() =>{addFriend(username), nav('/profile/' + username, {replace: true}); onClose(); setValue("1");}}>
                        Add friend
                    </button>
                </div>
                <div className='py-3'>
                    <button name='blockUserEvent' className={buttonCss} onClick={() =>
                        {
                            blockUser(username);
                            setValue("1");
                            nav('/profile/' + username, {replace: true});
                            onClose();
                        }}>
                        Block user
                    </button>
                </div>
                <div className='py-3'>
                    <button name='inviteChatButton' className={buttonCss} onClick={() =>
                        {
                            console.log("Insert event invite " + username + " to chat")
                        }}>
                        Invite to chat
                    </button>
                </div>
                <div className='py-3'>
                    <button name='invitePlayButton' className={buttonCss} onClick={() =>{onClose()}}>
                        Cancel
                    </button>
                </div>
            </div>
        </Dialog>
    )
}
