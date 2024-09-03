import React, { useContext, useState } from 'react';
import { ContentContext } from '../../../../../context/ContentContext';
import { CategoryContext } from '../../../../../context/CategoryContext'; // Adjust path as needed
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Snackbar, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const SeriesContent = () => {
    const { addSeries, updateSeries, deleteSeries, contentSeries } = useContext(ContentContext);
    const { selectedSeries } = useContext(CategoryContext); // Fetch selected category
    const [openDialog, setOpenDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [currentSeriesId, setCurrentSeriesId] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);
    const handleOpenEditDialog = (series) => {
        setEditTitle(series.title);
        setEditDescription(series.description);
        setCurrentSeriesId(series._id);
        setOpenEditDialog(true);
    };
    const handleCloseEditDialog = () => setOpenEditDialog(false);

    const handleAddSeries = async () => {
        if (selectedSeries) {
            const seriesData = {
                title,
                description,
                series_category_id: selectedSeries._id // Pass category ID here
            };
            try {
                await addSeries(seriesData); // Call the function to add series
                setTitle('');
                setDescription('');
                handleCloseDialog();
                setSnackbarOpen(true); // Show Snackbar on success
            } catch (error) {
                console.error('Error adding series:', error);
            }
        } else {
            alert('No series category selected!');
        }
    };

    const handleUpdateSeries = async () => {
        if (currentSeriesId) {
            const updatedSeries = {
                title: editTitle,
                description: editDescription,
                series_category_id: selectedSeries._id // Pass category ID here
            };
            try {
                await updateSeries(currentSeriesId, updatedSeries);
                handleCloseEditDialog();
                setSnackbarOpen(true); // Show Snackbar on success
            } catch (error) {
                console.error('Error updating series:', error);
            }
        }
    };

    const handleDeleteSeries = async (id) => {
        try {
            await deleteSeries(id);
            setSnackbarOpen(true); // Show Snackbar on success
        } catch (error) {
            console.error('Error deleting series:', error);
        }
    };

    const handleCloseSnackbar = () => setSnackbarOpen(false); // Function to close Snackbar

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <Button
                    variant="contained"
                    style={{ width: '40%', backgroundColor: '#475be8', color: 'white' }}
                    onClick={handleOpenDialog}
                >
                    Add Content Series
                </Button>
                <TableContainer component={Paper} style={{ width: '80%', marginTop: '20px' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {contentSeries
                                .filter(series => series.series_category_id && series.series_category_id === selectedSeries?._id) // Check if series_category_id exists and filter based on selected category
                                .map((series) => (
                                    <TableRow key={series._id}>
                                        <TableCell>{series.title}</TableCell>
                                        <TableCell>{series.description}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleOpenEditDialog(series)}>Edit</Button>
                                            <Button color="error" onClick={() => handleDeleteSeries(series._id)}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            {/* Add Series Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Add Content Series</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        type="text"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddSeries} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Series Dialog */}
            <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                <DialogTitle>Edit Content Series</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        type="text"
                        fullWidth
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleUpdateSeries} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Operation successful!
                </Alert>
            </Snackbar>
        </div>
    );
};

export default SeriesContent;
