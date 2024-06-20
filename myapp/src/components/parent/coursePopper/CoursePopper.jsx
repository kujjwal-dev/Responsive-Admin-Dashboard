import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import CourseTable from '../courseTable/CourseTable';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';


function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function CoursePopper() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Courses
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
    
        maxWidth='md'
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Courses
          <IconButton onClick={handleClose} style={{float:'right'}}><CloseIcon color='primary'></CloseIcon></IconButton>
        </DialogTitle>
        <DialogContent>

            <CourseTable />
          
        </DialogContent>
        <DialogActions>
          
         
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
