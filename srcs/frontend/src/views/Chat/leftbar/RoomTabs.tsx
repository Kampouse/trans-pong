import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { RoomDto } from "api/chat.api"
import { Tab, Tabs, Typography } from '@mui/material';

function a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
}

interface RoomTabsProps {
    value: number | false
    rooms: RoomDto[]
    handleChangeChannel: (event: React.SyntheticEvent | null, newValue: number) => void
}

export const RoomTabs = ({
    value,
    rooms,
    handleChangeChannel

}: RoomTabsProps) => {

    return (
    <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
        >
        <Typography style={{paddingLeft:'8px'}}>Channels</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Tabs 
          orientation="vertical"

          value={value}

          onChange={handleChangeChannel}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider', height: '28vh' }}
          >

            {rooms.map((channel: RoomDto, index: number) => {
              return (
                <Tab key={index} label={channel.roomName} {...a11yProps(index)}/> 
              );
            })}


          </Tabs>
        </AccordionDetails>
    </Accordion>
    )
}