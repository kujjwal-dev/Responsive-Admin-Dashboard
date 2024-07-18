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

const AudioContent = () => {
  const { videos, getVideoContent, selectedSeries } = useContext(CategoryContext);
  const [open, setOpen] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState(null);

  useEffect(() => {
    getVideoContent();
  }, []);

  const handleClickOpen = (audio) => {
    setSelectedAudio(audio);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAudio(null);
  };

  // Filter audio content based on selected series through series id and content type
  const filteredAudios = videos.filter(video => video.series_id === selectedSeries?._id && video.content_type === 'audio');
  console.log(filteredAudios);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="audio table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Class</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAudios.map((row, index) => (
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
        aria-labelledby="audio-dialog-title"
      >
        <DialogTitle id="audio-dialog-title">
          {selectedAudio?.title}
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
            <strong>Class:</strong> {selectedAudio?.class_grade}
            <br />
            <br />
            <strong>URL:</strong> <a href={selectedAudio?.video_url} target="_blank" rel="noopener noreferrer">{selectedAudio?.video_url}</a> {/* Again, assuming audio uses the same URL field */}
            <br />
            <br />
            <strong>Description:</strong> {selectedAudio?.description}
            <br />
            <br />
            <img src={selectedAudio?.video_thumbnail} className='w-[30px] h-[30px] mt-10' alt='' />
            <br />
            <br />
            <strong>Audio thumbnail: </strong> {selectedAudio?.video_thumbnail}
            <br />
            <br />
            <strong>Content Category:</strong> {selectedAudio?.content_category}
            <br />
            <br />
            <strong>Content Source Type:</strong> {selectedAudio?.content_source_type}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AudioContent;
