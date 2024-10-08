import React from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { Add as AddIcon, Notifications as NotificationsIcon } from '@mui/icons-material';
import { Navigate, useNavigate } from 'react-router-dom';

const Column1 = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', background:'#efe8f0' }}>
      {/* New Project Section */}
      <Card sx={{ marginBottom: '10px', background: '#f4f4f4'}}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">New Project</Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{background: '#611f69'}}
            startIcon={<AddIcon />}
            onClick={() => navigate('/createproject')}
          >
            Add
          </Button>
        </CardContent>
      </Card>

      <Card sx={{ flexGrow: 1  }}>
        <CardContent>
          <Typography variant="h6" sx={{ marginBottom: '16px' }}>Notifications</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <NotificationsIcon color="action" sx={{ marginRight: '8px' }} />
            <Typography variant="body2">You have a new message.</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <NotificationsIcon color="action" sx={{ marginRight: '8px' }} />
            <Typography variant="body2">Your project has been updated.</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <NotificationsIcon color="action" sx={{ marginRight: '8px' }} />
            <Typography variant="body2">You have a new comment.</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Column1;
