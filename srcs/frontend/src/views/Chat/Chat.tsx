import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext
} from 'react'
import '@styles/main.css'
import { ChatAPI, PrivateMsgsDto, RoomDto } from 'api/chat.api'
import { WebsocketContext } from 'context/WebSocketContext'
import { Box, Grid, Paper } from '@mui/material'
import { PrivateProfileDto } from 'utils/user.dto'
import { Feed } from './feed/Feed'
import { JoinCreateRoomBar } from './leftbar/JoinCreateRoomBar'
import { RoomTabs } from './leftbar/RoomTabs'
import { DiscussionTabs } from './leftbar/DiscussionTabs'
import { Contacts } from './rightbar/Contacts'

enum ChannelType {
  none = 0,
  privateMessage = 1,
  publicChannel = 2,
}

export const Chat = () => {
  const [tabIndex, setTabIndex] = React.useState<number>(0);
  const [rooms, setRooms] = React.useState<RoomDto[]>([]);
  const [privateMsgs, setPrivateMsgs] = React.useState<PrivateMsgsDto[]>([]);
  const [channelType, setChannelType] = React.useState<ChannelType>(ChannelType.none);
  const socket = React.useContext(WebsocketContext);

  React.useEffect(() => {
    const fetchMsgs = async () => {
      const chans: { rooms: RoomDto[] } = await ChatAPI.getRoomsFromUser();
      setRooms(chans.rooms);
      const pms: { privateMsgs: PrivateMsgsDto[] } = await ChatAPI.getPMsFromUser();
      setPrivateMsgs(pms.privateMsgs);
    };

    fetchMsgs();
  }, []);

  React.useEffect(() => {
    socket.on("newPrivateMsgUser", ({ userDto: newUser }) => {
      if (!privateMsgs.find(({ userDto }) => userDto.id === newUser.id)) {
        setPrivateMsgs((privateMsgs) => [...privateMsgs, { userDto: newUser, messages: [] }]);
      }
    });
    return () => {
      socket.off("newPrivateMsgUser");
    };
  }, [socket, privateMsgs]);

  React.useEffect(() => {
    socket.on("receivePrivateMsg", ({ userId, messageDto }) => {
      const addPM: PrivateMsgsDto[] = privateMsgs.map((pm) => {
        if (pm.userDto.id === userId) {
          pm.messages.push(messageDto);
        }
        return pm;
      });
      setPrivateMsgs(addPM);
    });
    return () => {
      socket.off("receivePrivateMsg");
    };
  }, [socket, privateMsgs]);

  React.useEffect(() => {
    socket.on("newRoomMessage", ({ roomName, messageDto }) => {
      const addRoomMsg: RoomDto[] = rooms.map((room) => {
        if (room.roomName === roomName) {
          room.messages.push(messageDto);
        }
        return room;
      });
      setRooms(addRoomMsg);
    });
    return () => {
      socket.off("newRoomMessage");
    };
  }, [socket, rooms]);

  React.useEffect(() => {
    socket.on("goToPM", ({ userDto: newUser }) => {
      let index = privateMsgs.findIndex(({ userDto }) => userDto.id === newUser.id);
      if (index < 0) {
        index = privateMsgs.length + 1;
      }
      setTabIndex(index);
      setChannelType(ChannelType.privateMessage);
    });
    return () => {
      socket.off("goToPM");
    };
  }, [socket, privateMsgs]);

  React.useEffect(() => {
    socket.on("addRoom", ({ room }) => {
      setRooms((rooms) => [...rooms, room]);
    });
    return () => {
      socket.off("addRoom");
    };
  }, [socket]);

  React.useEffect(() => {
    socket.on("roomChanged", ({ newRoom }: { newRoom: RoomDto }) => {
      const updateRooms: RoomDto[] = rooms.map((room) => {
        if (room.roomName === newRoom.roomName) {
          return newRoom;
        }
        return room;
      });
      setRooms(updateRooms);
    });
    return () => {
      socket.off("roomChanged");
    };
  }, [socket, rooms]);

  React.useEffect(() => {
    socket.on("deleteRoom", ({ roomName }) => {
      const roomIndex: number = rooms.findIndex((room) => room.roomName === roomName);
      if (roomIndex === -1) {
        return;
      } else if (tabIndex === roomIndex) {
        setChannelType(ChannelType.none);
      } else if (tabIndex < roomIndex) {
        setTabIndex(tabIndex - 1);
      }
      setRooms(rooms.filter((room) => room.roomName !== roomName));
    });
    return () => {
      socket.off("deleteRoom");
    };
  }, [socket, rooms, tabIndex]);

  const handleChangeDicussion = (event: React.SyntheticEvent | null, newValue: number) => {
    setTabIndex(newValue);
    setChannelType(ChannelType.privateMessage);
  };

  const handleChangeChannel = (event: React.SyntheticEvent | null, newValue: number) => {
    setTabIndex(newValue);
    setChannelType(ChannelType.publicChannel);
  };

  return (
    //className="m-auto flex h-4/6 w-[90%] max-w-[1500px] rounded-2xl grid grid-cols-10 grid-rows-10"
    <Box className='m-auto flex w-[90%] max-w-[2500px]'>
    <Grid container spacing={4}>
        {/* ------------ LEFT BAR ------------ */}

        <Grid item xs={2.5} sm={2.5} md={2.5} lg={2.5}>
          <Paper>
            <JoinCreateRoomBar currentRooms={rooms} handleChangeChannel={handleChangeChannel} />

            <div>
              <RoomTabs
                value={channelType === ChannelType.publicChannel ? tabIndex : false}
                rooms={rooms}
                handleChangeChannel={handleChangeChannel}
              />
            </div>

            <div>
              <DiscussionTabs
                value={channelType === ChannelType.privateMessage ? tabIndex : false}
                rooms={privateMsgs}
                handleChangeChannel={handleChangeDicussion}
              />
            </div>
            </Paper>
        </Grid>

        {/* ------------ FEED ------------ */}
        <Grid item xs={7} sm={7} md={7} lg={7}>
          <Feed
            rooms={rooms}
            privateMsgs={privateMsgs}
            tabIndex={tabIndex}
            channelType={channelType}
          />
        </Grid>

        {/* ------------ RIGHT BAR ------------ */}

        <Grid item xs={2.5} sm={2.5} md={2.5} lg={2.5}>
          <Paper>
            <Contacts
              users={
                channelType === ChannelType.publicChannel
                  ? rooms.at(tabIndex)?.users || null
                  : channelType === ChannelType.privateMessage
                  ? [privateMsgs.at(tabIndex)?.userDto as PrivateProfileDto] || null
                  : null
              }
              room={channelType === ChannelType.publicChannel ? rooms.at(tabIndex) || null : null}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Chat
