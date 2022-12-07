import {
  Button,
  ButtonGroup,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
	FormControl,
	InputLabel,
	ListItemText,
	MenuItem,
	OutlinedInput,
	Select,
	SelectChangeEvent,
	Theme,
	useTheme
} from '@mui/material'
import { ChatRoom } from '@utils/types'
import React, { useEffect, useState } from 'react'
import { generateSerial } from 'utils'
import { getUserDetails } from '@router/Router'
import { User } from 'utils/types'

export interface NewRoomProps {
  open: boolean;
  onClose: (room: ChatRoom | null,
						rooms: ChatRoom[],
						setRooms: React.Dispatch<React.SetStateAction<ChatRoom[]>>,
						setOpenNewRoom:  React.Dispatch<React.SetStateAction<boolean>>) => void;
	rooms: ChatRoom[];
	setRooms: React.Dispatch<React.SetStateAction<ChatRoom[]>>;
	setOpenNewRoom:  React.Dispatch<React.SetStateAction<boolean>>;
}

function NewRoom({ open, onClose, rooms, setRooms, setOpenNewRoom }: NewRoomProps) {
  const [isNew, setIsNew] = useState(true)
  const [roomCode, setRoomCode] = useState('')
  const [status, setStatus] = useState('public')
  const [roomName, setRoomName] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [passwordMatch, setPasswordMatch] = useState(true)
  const [init, setInit] = useState(true)
	const [usersSelect, setUsersSelect] = useState([] as User[])
	const [usersSelectArr, setUsersSelectArr] = useState([] as string[])

	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: 250,
				width: 200,
			},
		},
	};

  const handleClose = (val: null | ChatRoom) => {
    setIsNew(true)
    setRoomCode('')
    setRoomName('')
    setStatus('public')
    setPassword('')
    setRepeatPassword('')
    setPasswordMatch(true)
    setInit(true)
    onClose(val, rooms, setRooms, setOpenNewRoom)
  }

  useEffect(() => {
    if (!init)
      setPasswordMatch(
        password === '' || repeatPassword === '' || password !== repeatPassword
          ? false
          : true
      )
    setInit(false)
  }, [password, repeatPassword])



	const handleChange = (event: SelectChangeEvent<typeof usersSelectArr>) => {
    const {
      target: { value },
    } = event;
    setUsersSelectArr(
      typeof value === 'string' ? value.split(',') : value,
    );
  };


	const theme = useTheme();
	const [personName, setPersonName] = React.useState<string[]>([]);
	function getStyles(name: string, personName: string[], theme: Theme) {
		return {
			fontWeight:
				personName.indexOf(name) === -1
					? theme.typography.fontWeightRegular
					: theme.typography.fontWeightMedium,
		};
	}

  return (
    <Dialog onClose={() => handleClose(null)} open={open}>
      <DialogTitle className="bg-sky-200 text-blue-700">New Room</DialogTitle>
      <DialogContent className="bg-sky-200">
        <form className="mx-auto">
          <div className="pb-4">
            <ButtonGroup>
              <Button
                onClick={() => {
                  setIsNew(true)
                  setPasswordMatch(true)
                  setStatus('public')
									setUsersSelectArr([]);
                }}
                sx={[
                  isNew && {
                    '&:hover': { backgroundColor: '#1d4ed8' },
                    backgroundColor: '#1d4ed8',
                    color: 'white'
                  }
                ]}
              >
                Create Room
              </Button>
              <Button
                onClick={() => {
                  setIsNew(false)
                  setRoomCode('')
									setUsersSelectArr([]);
                }}
                sx={[
                  !isNew && {
                    '&:hover': { backgroundColor: '#1d4ed8' },
                    backgroundColor: '#1d4ed8',
                    color: 'white'
                  }
                ]}
              >
                Join Room
              </Button>
            </ButtonGroup>
          </div>

          {isNew ? (
            <div>
              <ButtonGroup>
                <Button
                  onClick={() => {
                    setStatus('public')
                    setPasswordMatch(true)
										setUsersSelectArr([]);
                  }}
                  sx={[
                    status === 'public' && {
                      '&:hover': { backgroundColor: '#1d4ed8' },
                      backgroundColor: '#1d4ed8',
                      color: 'white'
                    }
                  ]}
                >
                  Public
                </Button>
                <Button
                  onClick={() => {
                    setStatus('private')
                    setPasswordMatch(true)
										setUsersSelectArr([]);
                  }}
                  sx={[
                    status === 'private' && {
                      '&:hover': { backgroundColor: '#1d4ed8' },
                      backgroundColor: '#1d4ed8',
                      color: 'white'
                    }
                  ]}
                >
                  Private
                </Button>
                <Button
                  onClick={() => {
                    setStatus('protected')
                    setPasswordMatch(false)
										setUsersSelectArr([]);
                  }}
                  sx={[
                    status === 'protected' && {
                      '&:hover': { backgroundColor: '#1d4ed8' },
                      backgroundColor: '#1d4ed8',
                      color: 'white'
                    }
                  ]}
                >
                  Protected
                </Button>
              </ButtonGroup>
              <div className="pt-4 m-auto w-fit">
                <input
                  onChange={(e) => {
                    setRoomName(e.target.value)
                  }}
                  type="text"
                  placeholder="Enter Room Name"
                />
              </div>
              <div className="pt-4 m-auto w-fit">
                <input
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  disabled={status !== 'protected'}
                  type="password"
                  placeholder="Enter Password"
                />
              </div>
              <div className="pt-4 m-auto w-fit">
                <input
                  onChange={(e) => {
                    setRepeatPassword(e.target.value)
                  }}
                  disabled={status !== 'protected'}
                  type="password"
                  placeholder="Repeat Password"
                />
              </div>
							<div className="py-4 m-auto w-fit">
								<FormControl>
									<Select
										labelId="demo-multiple-name-label"
										id="demo-multiple-name"
										displayEmpty
										multiple={(status === "private") ? false : true}
										value={usersSelectArr}
										onChange={handleChange}
										input={<OutlinedInput/>}
										renderValue={(selected) => {
											if (selected.length === 0) {
												return <em>Select Friends</em>;
											}
											return selected.join(', ');
										}}
										MenuProps={MenuProps}
										inputProps={{ 'aria-label': 'Without label' }}
									>
										<MenuItem disabled value="">
											<em>Select Friends</em>
										</MenuItem>
										{getUserDetails().friendList.map((name : User) => (
											<MenuItem
												key={name.username}
												value={name.username}
											>
												<Checkbox checked={usersSelectArr.indexOf(name.username) > -1} />
              					<ListItemText primary={name.username} />
											</MenuItem>
										))}
									</Select>
								</FormControl>
              </div>
              {password !== '' && !passwordMatch && (
                <div className="m-auto w-fit">
                  <p className="text-red-600">Passwords doesn't match</p>
                </div>
              )}
            </div>
          ) : (
            <div className="pb-4 m-auto w-fit">
              <input
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                type="text"
                placeholder="Room Code"
              />
            </div>
          )}

          <div className="m-auto w-fit">
            <Button
              disabled={!passwordMatch}
              sx={[
                {
                  '&:hover': { backgroundColor: '#1d4ed8' },
                  backgroundColor: '#1d4ed8',
                  color: 'white'
                }
              ]}
              onClick={() => {
                if (isNew)
                  handleClose({
                    code: generateSerial(),
                    name: roomName,
                    users: [getUserDetails()],
                    owner: getUserDetails(),
                    admins: [getUserDetails()],
                    status: status,
                    password: password,
                    messages: [],
                    image: null
                  })
                // else
                // joinRoom
              }}
            >
              Proceed
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default NewRoom
