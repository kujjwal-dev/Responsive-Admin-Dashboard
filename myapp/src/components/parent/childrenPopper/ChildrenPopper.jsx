import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import ChildrenTable from "../childrenTable/ChildrenTable";
import CourseTable from "../courseTable/CourseTable";

const ChildrenPopper = ({ children }) => {
    const [open, setOpen] = useState(false);

    const handleOpenPopup = () => {
        setOpen(true);
    }

    const handleClosePopup = () => {
        setOpen(false);
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <Button className="rounded-full text-sm" onClick={handleOpenPopup} color="primary" variant="contained">
                {children}
            </Button>
            <Dialog open={open} onClose={handleClosePopup} fullWidth maxWidth="md" fullScreen>

                <DialogTitle>
                    {children} Details
                    <IconButton onClick={handleClosePopup} style={{ float: 'right' }}>
                        <CloseIcon color='primary' />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <div className="flex flex-col gap-20">
                        <ChildrenTable />
                        <div style={{ marginTop: '80px' }}> 
                            <CourseTable />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    {/* Additional actions can be added here if needed */}
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ChildrenPopper;
