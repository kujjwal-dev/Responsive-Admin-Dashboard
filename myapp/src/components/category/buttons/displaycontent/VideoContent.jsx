import React, { useContext, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { CategoryContext } from "../../../../context/CategoryContext";

export default function VideoContent() {
    const { videos, getVideoContent, selectedSeries } = useContext(CategoryContext);
    const [open, setOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        getVideoContent();
    }, []);

    const handleClickOpen = (video) => {
        setSelectedVideo(video);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedVideo(null);
    };

    // Filter video content based on selected series through series id
    const filteredVideos = videos.filter(video => video.series_id === selectedSeries?._id);
    console.log(filteredVideos);

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="video table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Class</TableCell>
                            <TableCell>URL</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredVideos.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <span style={{ cursor: 'pointer', color: 'blue' }} onClick={() => handleClickOpen(row)}>
                                        {row.title}
                                    </span>
                                </TableCell>
                                <TableCell>{row.class_grade}</TableCell>
                                <TableCell>
                                    <a href={row.video_url} target="_blank" rel="noopener noreferrer">
                                        {row.video_url}
                                    </a>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                aria-labelledby="video-dialog-title"
            >
                <DialogTitle id="video-dialog-title">
                    {selectedVideo?.title}
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <strong>Class:</strong> {selectedVideo?.class_grade}
                        <br />
                        <br />
                        <strong>URL:</strong> <a href={selectedVideo?.video_url} target="_blank" rel="noopener noreferrer">{selectedVideo?.video_url}</a>
                        <br />
                        <br />
                        <strong>Description:</strong> {selectedVideo?.description}
                        <br />
                        <br />
                        <img src={selectedVideo?.video_thumbnail} className='w-[30px] h-[30px] mt-10' alt='' />
                        <br /> 
                        <br/>
                        <strong>Video thumbnail: </strong> {selectedVideo?.video_thumbnail}
                        <br />
                        <br />
                        <strong>Content Category:</strong> {selectedVideo?.content_category}
                        <br />
                        <br />
                        <strong>Content Source Type:</strong> {selectedVideo?.content_source_type}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    );
}
