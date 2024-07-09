import React, { useContext } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { CategoryContext } from '../../../context/CategoryContext';

export default function FirstList() {
    const { mainCategories ,  setSelectedMainCategory , setSelectedSubCategory, setSelectedSeries } = useContext(CategoryContext);

    const handleSelectMainCategory = (mainCategoryId) => {
        setSelectedMainCategory(mainCategoryId);
        setSelectedSubCategory(null);
        setSelectedSeries(null);
        
    }

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
                        <ListItemText>{category.main_category}</ListItemText>
                    </ListItemButton>
                ))}
            </List>
        </>
    );
}
