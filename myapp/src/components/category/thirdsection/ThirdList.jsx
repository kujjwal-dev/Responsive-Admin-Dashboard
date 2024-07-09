import React, { useContext } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { CategoryContext } from '../../../context/CategoryContext'


export default function ThirdList() {
 
  const { series, selectedMainCategory ,  selectedSubCategory } = useContext(CategoryContext);

  const filteredSeries = series.filter(ser=>
    ser.main_category_id === selectedMainCategory && ser.sub_category_id === selectedSubCategory
  );

  return (
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
      
        
          {filteredSeries.map((series,index) => (
            <ListItemButton key={index}>
            <ListItemText >
              {series.series}
            </ListItemText>
            </ListItemButton>
          ))}
        
      
    
      

      
    </List>
  );
}