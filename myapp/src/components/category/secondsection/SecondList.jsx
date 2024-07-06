import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function SecondList() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

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
        <ListItemButton>
        
        <ListItemText primary="Ramayana" />
      </ListItemButton>

      <ListItemButton>
        
        <ListItemText primary="Mahabharat" />
      </ListItemButton>
     
    </List>
  );
}