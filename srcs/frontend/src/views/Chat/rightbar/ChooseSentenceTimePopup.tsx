import {
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Button,
} from "@mui/material";
import React from "react";

enum Sentence {
  none = -1,
  ban = 0,
  mute = 1,
}

interface ChooseSentenceTimePopupProps {
  open: boolean;
  setOpen: Function;
  sentence: Sentence;
  handleSentence: () => void;
  userName: string;
  setTime: Function;
}

export const ChooseSentenceTimePopup = ({
  open,
  setOpen,
  sentence,
  handleSentence,
  userName,
  setTime,
}: ChooseSentenceTimePopupProps) => {
  const handlePickTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTime(
      value === "unban"
        ? 0
        : value === "onemin"
        ? 1
        : value === "fivemin"
        ? 5
        : value === "fifteenmin"
        ? 15
        : value === "onehour"
        ? 60
        : value === "oneday"
        ? 1440
        : -1
    );
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {sentence === Sentence.ban
          ? `Ban ${userName} ?`
          : sentence === Sentence.mute && `Mute ${userName} ?`}
      </DialogTitle>

      <DialogActions>
        <FormControl sx={{ ml: 2 }}>
          <FormLabel id="demo-row-radio-buttons-group-label">
            {sentence === Sentence.ban
              ? "Pick ban time"
              : sentence === Sentence.mute && "Pick mute time"}
          </FormLabel>

          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={handlePickTime}
          >
            <FormControlLabel
              value="unban"
              control={<Radio />}
              label={sentence === Sentence.ban ? "Kick" : sentence === Sentence.mute && "Unmute"}
            />
            <FormControlLabel value="onemin" control={<Radio />} label="1 min" />
            <FormControlLabel value="fivemin" control={<Radio />} label="5 min" />

            <FormControlLabel value="fifteenmin" control={<Radio />} label="15 min" />
            <FormControlLabel value="onehour" control={<Radio />} label="1 hour" />
            <FormControlLabel value="oneday" control={<Radio />} label="24 hour" />
          </RadioGroup>
        </FormControl>
      </DialogActions>

      <DialogActions>
        <Button onClick={() => handleSentence()}>
          {sentence === Sentence.ban ? "ban" : sentence === Sentence.mute && "mute"}
        </Button>

        <Button onClick={() => setOpen(false)}>cancel</Button>
      </DialogActions>
    </Dialog>
  );
};
