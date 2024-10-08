import React from 'react';
import { Grid, Box } from '@mui/material';
import Column1 from './Column1';
import Column2 from './Column2';
import Column3 from './Column3';

const Dashboard = () => {
  return (
    <Box sx={{ height: '100vh', padding: 0, display: 'flex', marginTop: '0'}}>
      <Grid container spacing={0} sx={{ height: '100%', margin: 0, width: '100%' }}>
        <Grid item xs={12} md={3} sx={{ height: '100%' }}>
          <Column1 />
        </Grid>
        <Grid item xs={12} md={6} sx={{ height: '100%' }}>
          <Column2 />
        </Grid>
        <Grid item xs={12} md={3} sx={{ height: '100%' }}>
          <Column3 />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
