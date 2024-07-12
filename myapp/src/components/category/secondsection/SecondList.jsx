import React, { useContext } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { CategoryContext } from '../../../context/CategoryContext'

export default function SecondList() {

  const { subCategories, selectedMainCategory, setSelectedSubCategory, setSelectedSeries } = useContext(CategoryContext);

 
  const filteredSubCategories = subCategories.filter(sub => sub.main_category_id === selectedMainCategory);

  const handleSelectSubCategory = (subCategoryId) => {
    setSelectedSubCategory(subCategoryId);
    setSelectedSeries(null);
  
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
          <ListItemText>{subcategory.sub_category}</ListItemText>
        </ListItemButton>
      ))}
      
      

     
    </List>
  );
}