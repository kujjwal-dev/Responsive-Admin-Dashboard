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
import { Button, TextField } from '@mui/material';
import toast from "react-hot-toast";



export default function VideoContent() {
    const { videos, getVideoContent, selectedSeries, updateVideoContent, deleteVideoContent } = useContext(CategoryContext);
    const [open, setOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [videoData, setVideoData] = useState({
        title: '',
        class_grade: '',
        video_url: '',
        description: '',
        video_thumbnail: '',
        content_category: '',
        content_source_type: '',
    });
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false); 

    useEffect(() => {
        getVideoContent();
    }, []);

    const handleClickOpen = (video) => {
        setSelectedVideo(video);
        setVideoData(video);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedVideo(null);
        setEditMode(false);
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = async () => {
        if (selectedVideo) {
            await updateVideoContent(selectedVideo.id, videoData);
            setEditMode(false);
            setSelectedVideo({ ...selectedVideo, ...videoData }); // Update selectedVideo with edited data
            setOpen(true); // Redirect to main dialog
            toast.success('Content Updated'); 
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVideoData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleDelete = async () => {
        if (selectedVideo) {
            setConfirmDeleteOpen(true);
        }
    };

    const confirmDelete = async () => {
        if (selectedVideo) {
            await deleteVideoContent(selectedVideo.id);
            setConfirmDeleteOpen(false); 
            handleClose();
        }
    };

    // Filter video content based on selected series through series id and content type
    const filteredVideos = videos.filter(video => video.series_id === selectedSeries?._id && video.content_type === 'video');

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="video table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Class</TableCell>
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
                    {editMode ? "Edit Video Content" : selectedVideo?.title}
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
                    {editMode ? (
                        <>
                            <TextField
                                name="title"
                                label="Title"
                                value={videoData.title}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                name="class_grade"
                                label="Class"
                                value={videoData.class_grade}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                name="video_url"
                                label="Video URL"
                                value={videoData.video_url}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                name="description"
                                label="Description"
                                value={videoData.description}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                name="video_thumbnail"
                                label="Thumbnail URL"
                                value={videoData.video_thumbnail}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                name="content_category"
                                label="Content Category"
                                value={videoData.content_category}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                name="content_source_type"
                                label="Content Source Type"
                                value={videoData.content_source_type}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <Button onClick={handleSave} color="primary" variant="contained" style={{ marginTop: '16px' }}>
                                Save
                            </Button>
                        </>
                    ) : (
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
                            <img src={selectedVideo?.video_thumbnail} alt="Thumbnail" style={{ width: '100px', height: '100px' }} />
                            <br />
                            <br />
                            <strong>Video thumbnail: </strong> {selectedVideo?.video_thumbnail}
                            <br />
                            <br />
                            <strong>Content Category:</strong> {selectedVideo?.content_category}
                            <br />
                            <br />
                            <strong>Content Source Type:</strong> {selectedVideo?.content_source_type}
                        </DialogContentText>
                    )}
                </DialogContent>
                {!editMode && (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '1rem' }}>
                            <Button
                                onClick={handleEdit}
                                color="primary"
                                variant="contained"
                                sx={{
                                    width: "15%",
                                    margin: '0.5rem',
                                    bgcolor: '#475be8',
                                    '&:hover': {
                                        bgcolor: '#3a4aa1',
                                    },
                                    fontSize: 'small'
                                }}
                            >
                                Edit
                            </Button>
                            <Button
                                onClick={handleDelete}
                                color="secondary"
                                variant="contained"
                                sx={{
                                    width: "15%",
                                    margin: '0.5rem',
                                    bgcolor: '#475be8',
                                    '&:hover': {
                                        bgcolor: '#3a4aa1',
                                    },
                                    fontSize: 'small'
                                }}
                            >
                                Delete
                            </Button>
                        </div>
                        <Dialog
                            open={confirmDeleteOpen}
                            onClose={() => setConfirmDeleteOpen(false)}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Are you sure you want to delete this video content?
                                </DialogContentText>
                            </DialogContent>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px' }}>
                                <Button onClick={() => setConfirmDeleteOpen(false)} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={confirmDelete} color="secondary" autoFocus>
                                    Delete
                                </Button>
                            </div>
                        </Dialog>
                    </>
                )}
            </Dialog>
        </>
    );
}
