import { Dialog, DialogContent, DialogTitle, Button } from '@mui/material'


export function UserOption({open, onClose, userClicked})
{
    //  Username of the user clicked
    const username = userClicked.current;

    //  Css style for button
    const buttonCss = 'bg-slate-100 text-2xl font-Raleway hover:bg-purple-100 ring-1 ring-slate-500 rounded-lg mx-[25%] w-[50%] h-12 bg-white'

    return (
        <Dialog onClose={onClose} open={open}>
            <div className='flex-col w-[450px] h-[500px] bg-sky-200 pt-1'>
                <h1 className='text-4xl font-Raleway w-full text-center py-5'>
                    {username}
                </h1>
                <div className='py-4'>
                    <button name='viewProfileButton' className={buttonCss} onClick={() =>
                        {
                            //  Event on click viewProfileButton
                            console.log("Insert event view profile of " + username)
                        }}>
                        Profile page
                    </button>
                </div>
                <div className='py-4'>
                    <button name='addFriendButton' className={buttonCss} onClick={() =>
                        {
                            //  Event on click addFriendButton
                            console.log("Insert event add friend " + username)
                        }}>
                        Add friend
                    </button>
                </div>
                <div className='py-4'>
                    <button name='invitePlayButton' className={buttonCss} onClick={() =>
                        {
                            //  Event on click invitePlayButton
                            console.log("Insert event invite " + username + " to play")
                        }}>
                        Invite to play
                    </button>
                </div>
                <div className='py-4'>
                    <button name='inviteChatButton' className={buttonCss} onClick={() =>
                        {
                            //  Event on click inviteChatButton
                            console.log("Insert event invite " + username + " to chat")
                        }}>
                        Invite to chat
                    </button>
                </div>
                <div className='py-4 mb-2'>
                    <button name='blockUserEvent' className={buttonCss} onClick={() =>
                        {
                            //  Event on click blockUserEvent
                            console.log("Insert event block " + username)
                        }}>
                        Block user
                    </button>
                </div>
            </div>
        </Dialog>
    )
}
