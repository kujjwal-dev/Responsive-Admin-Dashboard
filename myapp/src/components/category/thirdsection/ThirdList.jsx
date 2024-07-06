import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';


export default function ThirdList() {
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
          Series
        </ListSubheader>
      }
    >
        <ListItemButton>
        
        <ListItemText primary="Hanuman" />
      </ListItemButton>

      <ListItemButton>
        
        <ListItemText primary="Ram" />
      </ListItemButton>

      
     
    </List>
  );
}