import React, { useContext, useState } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { CategoryContext } from '../../../context/CategoryContext';
import { IconButton, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

export default function SecondList() {

  const { subCategories, setSubCategories, selectedMainCategory, setSelectedSubCategory, setSelectedSeries, updateSubCategory, deleteSubCategory } = useContext(CategoryContext);
  const [isEditing, setIsEditing] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [open, setOpen] = useState(false);
  const [subCategoryToDelete, setSubCategoryToDelete] = useState(null);

  const filteredSubCategories = subCategories.filter(sub => sub.main_category_id === selectedMainCategory);

  const handleSelectSubCategory = (subCategoryId) => {
    setSelectedSubCategory(subCategoryId);
    setSelectedSeries(null);
  }

  const handleEdit = (subcategory) => {
    setIsEditing(subcategory._id);
    setUpdatedName(subcategory.sub_category);
  }
  
  const handleUpdate = async (subcategoryId) => {
    const updatedCategories = subCategories.map(subcategory =>
      subcategory._id === subcategoryId ? { ...subcategory, sub_category: updatedName } : subcategory
    );
    setSubCategories(updatedCategories);

    try {
      await updateSubCategory(subcategoryId, updatedName);
      console.log(updatedName);
      setIsEditing(null);
    } catch (error) {
      console.error("Error updating sub category", error);
    }
  }

  const handleOpenDialog = (subcategory, e) => {
    e.stopPropagation();
    setSubCategoryToDelete(subcategory);
    setOpen(true);
  }

  const handleCloseDialog = () => {
    setOpen(false);
    setSubCategoryToDelete(null);
  }

  const handleDelete = async () => {
    const { main_category_id, _id: subCategoryId } = subCategoryToDelete;
    const updatedCategories = subCategories.filter(category => category._id !== subCategoryId);
    setSubCategories(updatedCategories);

    try {
      await deleteSubCategory(main_category_id, subCategoryId);
    } catch (error) {
      console.error('Delete failed', error);
      setSubCategories(subCategories);
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
            Sub Category
          </ListSubheader>
        }
      >
        {filteredSubCategories.map((subcategory, index) => (
          <ListItemButton key={index} onClick={() => handleSelectSubCategory(subcategory._id)}>
            {isEditing === subcategory._id ? (
              <TextField
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
                size='small'
                sx={{ flex: 1 }}
              />
            ) : (
              <ListItemText sx={{ flex: 1 }}>{subcategory.sub_category}</ListItemText>
            )}

            <IconButton size='small' onClick={(e) => {
              e.stopPropagation();
              isEditing === subcategory._id ? handleUpdate(subcategory._id) : handleEdit(subcategory);
            }} sx={{ color: '#475be8' }} >
              {isEditing === subcategory._id ? <SaveIcon fontSize='small' /> : <EditIcon fontSize='small' />}
            </IconButton>

            <IconButton size='small' onClick={(e) => handleOpenDialog(subcategory, e)} sx={{ color: '#475be8' }}>
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
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Do you really want to delete this sub category?
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
