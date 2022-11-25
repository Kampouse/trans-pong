import { Close } from '@mui/icons-material'
import { Alert, AlertColor, IconButton, Snackbar } from '@mui/material'

export interface SnackbarProps {
  message: string
  open: boolean
  severity: AlertColor | undefined
  onClose: () => void
}

// Place in App.tsx later
export function AchievementSnackbar() {}

export function GeneralSnackbar({
  message,
  open,
  severity,
  onClose
}: SnackbarProps) {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert
        variant="filled"
        onClose={onClose}
        severity={severity}
        sx={[{ width: '100%', color: 'white', fontWeight: 'bold' }]}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}
