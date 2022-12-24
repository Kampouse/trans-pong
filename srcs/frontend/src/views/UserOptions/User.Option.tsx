import React from 'react'
import { Dialog, DialogContent, DialogTitle, Button } from '@mui/material'


export function UserOption(username: any)
{
    const open = true;

    return (
        <Dialog open={open}>
            <div className='flex w-full h-full'>
                Test {username}
            </div>
        </Dialog>
    )
}
