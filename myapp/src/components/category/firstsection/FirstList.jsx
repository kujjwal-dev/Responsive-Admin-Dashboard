import React, { useContext, useState } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { CategoryContext } from '../../../context/CategoryContext';
import { IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function FirstList() {
    const { mainCategories , setMainCategories,   setSelectedMainCategory , setSelectedSubCategory, setSelectedSeries , updateMainCategory , deleteMainCategory } = useContext(CategoryContext);
    const [isEditing,setIsEditing] = useState(null);
    const [updatedName,setUpdatedName] = useState('');

    const handleSelectMainCategory = (mainCategoryId) => {
        setSelectedMainCategory(mainCategoryId);
        setSelectedSubCategory(null);
        setSelectedSeries(null);
    }

    const handleEdit = (category) => {
        setIsEditing(category.id)
        setUpdatedName(category.main_category)
    }

    const handleUpdate = async(categoryId) => {
        
        //update ui with updated value
        const updatedCategories = mainCategories.map(category =>
            category.id === categoryId ? { ...category, main_category: updatedName } : category
        );
        setMainCategories(updatedCategories); 

        //update the main category
        try {
            await updateMainCategory(categoryId,updatedName);
            console.log(updatedName)
            setIsEditing(null)
        } catch (error) {
            console.error("Error updating main category",error)
        }
    }



    const handleDelete = async (categoryId, e) => {
        e.stopPropagation();
        const updatedCategories = mainCategories.filter(category => category.id !== categoryId);
        setMainCategories(updatedCategories); 

        try {
            await deleteMainCategory(categoryId);
            console.log(categoryId)
        } catch (err) {
            console.error('Delete failed:', err);
            setMainCategories(mainCategories);
        }
    };
    return (
        <>
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Main Category
                    </ListSubheader>
                }
            >
                {mainCategories.map((category, index) => (
                    <ListItemButton key={index} onClick={() => handleSelectMainCategory(category.id)}>

                        { isEditing === category.id ? (
                            <TextField
                            value={updatedName}
                            onChange={(e) => setUpdatedName(e.target.value)}
                            onBlur={() => handleUpdate(category.id)}
                            autoFocus
                            size='small'
                            sx={{flex:1}}
                            />
                        )   :   (
                            <ListItemText onClick={(e) => {
                                e.stopPropagation()
                                handleEdit(category)}} sx={{flex:1}}>{category.main_category}</ListItemText>
                        ) }
                        <IconButton size='small' onClick={(e) => handleDelete(category.id,e)}>
                        <DeleteIcon fontSize="small" />
                        </IconButton>

                    </ListItemButton>
                ))}
            </List>
        </>
    );
}
