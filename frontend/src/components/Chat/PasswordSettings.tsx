import { Dialog, DialogContent, DialogTitle, Button } from '@mui/material'
import { useEffect, useState } from 'react'

export interface PasswordSettingsProps {
  open: boolean
  onClose: (password: string | null) => void
}

export function PasswordSettings({ open, onClose }: PasswordSettingsProps) {
  const [newPassword, setNewPassword] = useState('')
  const [repeatNewPassword, setRepeatNewPassword] = useState('')
  const [passwordMatch, setPasswordMatch] = useState(true)

  const handleClose = (val: string | null) => {
    onClose(newPassword)
  }

  useEffect(() => {
    setPasswordMatch(newPassword === repeatNewPassword ? true : false)
  }, [newPassword, repeatNewPassword])

  return (
    <Dialog onClose={() => handleClose(null)} open={open}>
      <DialogTitle className="bg-sky-200 text-blue-700">
        Password Settings
      </DialogTitle>
      <DialogContent className="bg-sky-200">
        <form className="mx-auto">
          <div className="m-auto w-fit">
            <input
              onChange={(e) => {
                setNewPassword(e.target.value)
              }}
              type="password"
              placeholder="Enter New Password"
            />
          </div>
          <div className="py-4 m-auto w-fit">
            <input
              onChange={(e) => {
                setRepeatNewPassword(e.target.value)
              }}
              type="password"
              placeholder="Repeat New Password"
            />
          </div>
          <div className="pb-4">
            <p className="text-center">
              Keep both fields empty
              <br />
              to reset password and
              <br />
              make room public
            </p>
          </div>
          {!passwordMatch && (
            <div className="m-auto w-fit">
              <p className="text-red-600">Passwords doesn't match</p>
            </div>
          )}

          <div className="m-auto w-fit flex">
            <div>
              <Button
                disabled={!passwordMatch}
                sx={[
                  {
                    '&:hover': { backgroundColor: '#1d4ed8' },
                    backgroundColor: '#1d4ed8',
                    color: 'white'
                  }
                ]}
                onClick={() => handleClose(newPassword)}
              >
                Proceed
              </Button>
            </div>
            <div className="pl-4">
              <Button
                sx={[
                  {
                    '&:hover': { backgroundColor: '#1d4ed8' },
                    backgroundColor: '#1d4ed8',
                    color: 'white'
                  }
                ]}
                onClick={() => handleClose(null)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
