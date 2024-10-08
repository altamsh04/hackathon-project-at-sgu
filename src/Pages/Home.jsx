import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import NavbarAndSidebar from '../SubPages/NavbarAndSidebar';
import Dashboard from '../SubPages/Dashboard';

const Home = () => {
  const [searchText, setSearchText] = useState('');
  const theme = useTheme();

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <>
      <NavbarAndSidebar searchText={searchText} handleSearchChange={handleSearchChange} />
      <Box sx={{ padding: theme.spacing(2), marginTop: theme.spacing(1) }}>
        <Dashboard />
      </Box>
    </>
  );
};

export default Home;
