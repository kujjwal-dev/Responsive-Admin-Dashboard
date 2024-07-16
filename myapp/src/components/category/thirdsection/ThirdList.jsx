import React, { useContext, useState } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { CategoryContext } from '../../../context/CategoryContext';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from '@mui/material';


export default function ThirdList() {

  const { series, setSeries, selectedMainCategory, selectedSubCategory, updateSeries, deleteSeries, getSeriesById, setSelectedSeries } = useContext(CategoryContext);
  const [isEditing, setIsEditing] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [open, setOpen] = useState(false);
  const [seriesToDelete, setSeriesToDelete] = useState(null);

  const filteredSeries = series.filter(ser =>
    ser.main_category_id === selectedMainCategory && ser.sub_category_id === selectedSubCategory
  );

  const handleSeriesSelect = async (seriesId) => {
    console.log(seriesId);
    try {
      await getSeriesById(seriesId);
    } catch (error) {
      console.error('Error getting series details', error)
    }

  }

  const handleEdit = (series) => {
    setIsEditing(series._id);
    setUpdatedName(series.series);
  }

  const handleUpdate = async (seriesId) => {
    // Update UI with updated value
    const updatedCategories = series.map(series =>
      series._id === seriesId ? { ...series, series: updatedName } : series
    );
    setSeries(updatedCategories);

    // Update the main category
    try {
      await updateSeries(seriesId, updatedName);
      console.log(updatedName);
      setIsEditing(null);
    } catch (error) {
      console.error("Error updating main category", error);
    }
  }

  const handleOpenDialog = (seriesId, e) => {
    e.stopPropagation();
    setSeriesToDelete(seriesId);
    setOpen(true);
  }

  const handleCloseDialog = () => {
    setOpen(false);
    setSeriesToDelete(null);
  }

  const handleDelete = async () => {

    const seriesId = seriesToDelete;

    const updatedSeries = series.filter(series => series._id !== seriesId);
    setSeries(updatedSeries);

    try {
      await deleteSeries(seriesId)
    } catch (error) {
      console.error('Delete Failed', error)
      setSeries(series)
    } finally {
      handleCloseDialog();
    }

  }

  return (
    <>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Series
          </ListSubheader>
        }
      >


        {filteredSeries.map((series, index) => (
          <ListItemButton key={index} onClick={() => handleSeriesSelect(series._id)} >
            {isEditing === series._id ? (
              <TextField
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
                size='small'
                sx={{ flex: 1 }}
              />
            ) : (
              <ListItemText sx={{ flex: 1 }} >  {series.series}  </ListItemText>
            )}

            <IconButton size='small' onClick={(e) => {
              e.stopPropagation();
              isEditing === series._id ? handleUpdate(series._id) : handleEdit(series)
            }} sx={{ color: '#475be8' }} >
              {isEditing === series._id ? <SaveIcon fontSize='small' /> : <EditIcon fontSize='small' />}
            </IconButton>

            <IconButton size='small' onClick={(e) => handleOpenDialog(series._id, e)} sx={{ color: '#475be8' }} >
              <DeleteIcon fontSize='small' />
            </IconButton>


          </ListItemButton>
        ))}

      </List>

      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent >
          <DialogContentText id='alert-dialog-description'>
            Do you really want to delete this series ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Delete
          </Button>
          <Button onClick={handleCloseDialog} color='primary'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
}