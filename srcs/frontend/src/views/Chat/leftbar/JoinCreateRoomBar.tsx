import { PersonSearch } from "@mui/icons-material";
import { Autocomplete, Box, Grid, IconButton, styled, Toolbar } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import React from "react";
import { CreateRoomDialog } from "./CreateRoomDialog";
import { WhiteBorderTextField } from "./WhiteBorderTextField";
import { JoinRoomDialog } from "./JoinRoomDialog";
import { ChatAPI } from "api/chat.api";
import LockIcon from '@mui/icons-material/Lock';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { WebsocketContext } from "context/WebSocketContext";

const SearchPersonn = styled('div')(({ theme }) => ({
    color: 'primary',
    backgroundColor: 'primary',
    paddingLeft: 0,
    borderRadius: 1,
  }));
  
export const JoinCreateRoomBar = ({
    currentRooms,
    handleChangeChannel
}: any) => {

    const [allRooms, setAllRooms] = React.useState<string[]>([]);
    const socket = React.useContext(WebsocketContext);

    React.useEffect(() => {  
        const fetchRoomNames = async() => {
            const resp: {rooms: string[]} = await ChatAPI.getAllRoomNames();
            setAllRooms(resp.rooms);
        }

        fetchRoomNames();
    }, []);

    React.useEffect(() => {
        socket.on('roomCreated', ({roomName}) => {
            setAllRooms((allRooms) => [...allRooms, roomName])
        });
        return () => {
          socket.off('roomCreated');
        };
      }, [socket]);

      React.useEffect(() => {
        socket.on('deleteRoom', ({roomName}) => {
          setAllRooms(allRooms.filter(room => room !== roomName));
        });
        return () => {
          socket.off('deleteRoom');
        };
      }, [socket, allRooms]);

    const [openJoinRoom, setOpenJoinRoom] = React.useState<boolean>(false);
    const [roomToJoin, setRoomToJoin]= React.useState<string>('');

    const joinRoomHandler = (roomName: string) => {
        const idx = currentRooms.findIndex((room: { roomName: string; }) => {
            return room.roomName.toUpperCase() === roomName.toUpperCase();
        });
        if (idx !== -1) {
            handleChangeChannel(null, idx);
        }
        else {
            setOpenJoinRoom(true);
            setRoomToJoin(roomName);
        }
    }

    const keyPress = (event: any): void => {
        if (event.keyCode === 13) {
            joinRoomHandler(event.target.value);
        }
    }

    const handleClick = (event: any, value: string, reason: any) => {
        joinRoomHandler(value);
    }

    const [openCreateRoom, setOpenCreateRoom] = React.useState<boolean>(false);


    const onAddClick = () => {
        setOpenCreateRoom(true);
    }

    const handleCloseCreateRoom = () => {
        setOpenCreateRoom(false);
    }

    return (
    <>

    <SearchPersonn>
    <Toolbar>

        <PersonSearch/>
        
        <Autocomplete
            sx={{  width:180, mr:2, paddingLeft:'10px' }}
            disableClearable
            freeSolo
            onChange={handleClick}
            options={allRooms}
            renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <Grid container >
                        <Grid>
                            {option}
                        </Grid>
                        <Grid sx={{marginLeft:'auto'}}>
                            {
                            currentRooms.find( ({roomName }: {roomName: string}) => roomName === option ) ?
                            <ArrowForwardIosIcon />
                            :
                            <LockIcon />
                            }
                        </Grid>
                    </Grid>
                </Box>
            )}
            renderInput={(params) => (
                <>

                <WhiteBorderTextField
                    {...params}
                    onKeyDown={keyPress}
                    label="...search"
                    InputProps={{
                        ...params.InputProps,
                    }}
                />

                </>
            )}
        />

        <IconButton onClick={onAddClick}>
            <AddIcon />
        </IconButton>

    </Toolbar>

    </SearchPersonn>

    <CreateRoomDialog
        open={openCreateRoom}
        onClose={handleCloseCreateRoom}
    />

    <JoinRoomDialog 
        open={openJoinRoom}
        roomName={roomToJoin}
        setOpen={setOpenJoinRoom}
    />

    </>
    )
}