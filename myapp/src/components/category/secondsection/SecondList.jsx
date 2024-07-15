import React, { useContext, useState } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { CategoryContext } from '../../../context/CategoryContext'
import { IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

export default function SecondList() {

  const { subCategories, setSubCategories,  selectedMainCategory, setSelectedSubCategory, setSelectedSeries, updateSubCategory , deleteSubCategory } = useContext(CategoryContext);
  const [isEditing, setIsEditing] = useState(null);
  const [updatedName, setUpdatedName] = useState('');

 
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
  // Update UI with updated value
  const updatedCategories = subCategories.map(subcategory =>
      subcategory._id === subcategoryId ? { ...subcategory, sub_category: updatedName } : subcategory
  );
  setSubCategories(updatedCategories);

  // Update the main category
  try {
      await updateSubCategory(subcategoryId, updatedName);
      console.log(updatedName);
      setIsEditing(null);
  } catch (error) {
      console.error("Error updating main category", error);
  }
}

const handleDelete = async(mainCategoryId,subCategoryId,e) => {
  e.stopPropagation();
  console.log(mainCategoryId);
  console.log(subCategoryId);
  const updatedCategories = subCategories.filter(category => category.id !== subCategoryId);
  setSubCategories(updatedCategories);

  try {
    await deleteSubCategory(mainCategoryId,subCategoryId);
  } catch (error) {
    console.error('Delete failed',err);
    setSubCategories(subCategories)
  }
  
}




  return (
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
      {filteredSubCategories.map((subcategory,index) => (
        <ListItemButton key={index} onClick={() => handleSelectSubCategory(subcategory._id) }>
          {isEditing === subcategory._id ? (
            <TextField
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            size='small'
            sx={{flex:1}}
             />
          ) : (
            <ListItemText sx={{flex:1}}>{subcategory.sub_category}</ListItemText>
          )}

          <IconButton size='small' onClick={(e) => {
            e.stopPropagation();
            isEditing === subcategory._id ? handleUpdate(subcategory._id) : handleEdit(subcategory)
          }} sx={{ color: '#475be8' }} >
            {isEditing === subcategory._id ? <SaveIcon fontSize='small'/> : <EditIcon fontSize='small'/> }
          </IconButton>

          <IconButton size='small' onClick={(e) => handleDelete(subcategory.main_category_id,subcategory._id,e)} sx={{ color: '#475be8' }} >
            <DeleteIcon fontSize='small'/>
          </IconButton>

        </ListItemButton>
      ))}
      
      

     
    </List>
  );
}