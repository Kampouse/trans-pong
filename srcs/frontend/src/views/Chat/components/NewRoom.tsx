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
import React, { useEffect, useRef, useState } from 'react'
import { generateSerial } from 'utils'
import { getUserDetails } from '../Chat'
import { User } from 'utils/types'
import { handleSendMessage } from '../ChatHandlers'
import { useNavigate } from 'react-router'

export interface NewRoomProps {
  open: boolean;
  onClose: (room: ChatRoom | null,
						rooms: ChatRoom[],
						setRooms: React.Dispatch<React.SetStateAction<ChatRoom[]>>,
						setOpenNewRoom:  React.Dispatch<React.SetStateAction<boolean>>) => void;
	users: User[];
	rooms: ChatRoom[];
	setRooms: React.Dispatch<React.SetStateAction<ChatRoom[]>>;
	setRoomCode: React.Dispatch<React.SetStateAction<string>>;
	setOpenNewRoom:  React.Dispatch<React.SetStateAction<boolean>>;
}

function NewRoom({ open, onClose, users, rooms, setRooms, setRoomCode, setOpenNewRoom }: NewRoomProps) {
  const [isNew, setIsNew] = useState(true)
  const [roomCodeInput, setRoomCodeInput] = useState('')
  const [status, setStatus] = useState('public')
  const [roomName, setRoomName] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [passwordMatch, setPasswordMatch] = useState(true)
  const [init, setInit] = useState(true)
	const [usersSelectArr, setUsersSelectArr] = useState([] as string[])
	const userClicked = useRef<User | null>(null);

	const navigate = useNavigate();

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
    setRoomCodeInput('')
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
									setRoomName('');
									setPassword('');
									setRepeatPassword('');
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
                  setRoomCodeInput('')
									setUsersSelectArr([]);
									setRoomName('');
									setPassword('');
									setRepeatPassword('');
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
										setRoomName('');
										setPassword('');
										setRepeatPassword('');
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
										setRoomName('');
										setPassword('');
										setRepeatPassword('');
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
										setRoomName('');
										setPassword('');
										setRepeatPassword('');
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
									disabled={status === 'private'}
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
								<FormControl sx={{ width: 150 }}>
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
                value={roomCodeInput}
                onChange={(e) => setRoomCode(e.target.value)}
                type="text"
                placeholder="Room Code"
              />
            </div>
          )}

          <div className="m-auto w-fit">
            <Button
              disabled={!passwordMatch || usersSelectArr.length === 0 || (status !== 'private' && roomName === '')}
              sx={[
                {
                  '&:hover': { backgroundColor: '#1d4ed8' },
                  backgroundColor: '#1d4ed8',
                  color: 'white'
                }
              ]}
              onClick={() => {
                if (isNew) {
									if (status === "private") {
										const user = users.find((user: User) => {return user.username === usersSelectArr.at(0)});
										if (user !== undefined) {
											userClicked.current = user;
											handleSendMessage(userClicked, rooms, setRooms, setRoomCode, setOpenNewRoom, navigate);
										}
									}
									else {
										let arrUsers : User[] = [];
										usersSelectArr.forEach((userSelected: string) => {
											const user = users.find((user: User) => {return user.username === userSelected});
											if (user !== undefined) {
												arrUsers.push(user);
											}
										})

										const serial = generateSerial();
										setRoomCode(serial);

										handleClose({
											code: serial,
											name: roomName,
											users: [getUserDetails(), ...arrUsers],
											owner: getUserDetails(),
											admins: [getUserDetails()],
											status: status,
											password: password,
											messages: [],
											image: null
										})
									}
								}
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