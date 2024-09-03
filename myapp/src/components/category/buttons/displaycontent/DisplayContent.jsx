import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SeriesContent from './SeriesContent/SeriesContent'
import MovieContent from './MovieContent/MovieContent'
import AudioContent from './AudioContent/AudioContent'

const StyledTabsContainer = styled('div')(({ theme }) => ({
  width: '100%',
  borderRadius: '8px',
  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
  border: `1px solid ${theme.palette.divider}`,
  overflow: 'hidden',
}));

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    variant="fullWidth"
    textColor="inherit"
    TabIndicatorProps={{
      style: {
        backgroundColor: '#475be8',
      },
    }}
  />
))({
  backgroundColor: '#475be8',
  color: '#fff',
});

const StyledTab = styled((props) => <Tab {...props} />)({
  textTransform: 'none',
  fontWeight: 'bold',
});

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
      style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px' }}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

export default function DisplayContent() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <StyledTabsContainer>
      <StyledTabs value={value} onChange={handleChange} aria-label="content tabs">
        <StyledTab label="Series" />
        <StyledTab label="Movie" />
        <StyledTab label="Audio" />
      </StyledTabs>

      <TabPanel value={value} index={0}>
        {/* Series content goes here */}
        <SeriesContent/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* Movie content goes here */}
        <MovieContent/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        {/* Audio content goes here */}
        <AudioContent/>
      </TabPanel>
    </StyledTabsContainer>
  );
}
