import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, IconButton, Stack, TextField } from "@mui/material";
import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import ChildrenTable from "../childrenTable/ChildrenTable";
import CoursePopper from "../coursePopper/CoursePopper";


const ChildrenPopper = () => {
    const [open, setOpen] = React.useState(false);
    const functionOpenPopup = () => {
        setOpen(true);
    }
    const functionClosePopup = () => {
        setOpen(false);
    }

 

    return(
        <div style={{textAlign: 'center'}}>
            <Button className="rounded-full text-sm" onClick={functionOpenPopup} color="primary" variant="contained">Details</Button>
            <Dialog open={open} onClose={functionClosePopup} fullWidth maxWidth="md">
            <DialogTitle>Children Details<IconButton onClick={functionClosePopup} style={{float:'right'}}><CloseIcon color='primary'></CloseIcon></IconButton></DialogTitle>
            <DialogContent>
              <div className="flex flex-col gap-4">
                <ChildrenTable />
               <CoursePopper />
               </div>
               
            </DialogContent> 
            <DialogActions>
               
            </DialogActions>
            </Dialog>
        </div>
    );
}


export default ChildrenPopper;