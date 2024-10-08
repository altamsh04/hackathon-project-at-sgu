import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      sx={{
        margin: '30px',
        width: '1450px',
        backgroundColor: '#fff',
        borderTopLeftRadius: '50px',
        borderTopRightRadius: '50px',
        borderBottomRightRadius: '50px',
        borderBottomLeftRadius: '50px',
        overflow: 'hidden',
      }}
      component={motion.div}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: "#611f69" }}>
          RemoteSync
        </Typography>
        <Button 
          variant="outlined" 
          sx={{ borderColor: '#611f69', marginRight: 2, color: "#611f69" }}
          onClick={() => navigate('/signin')}
        >
          Sign In
        </Button>
        <Button 
          color="white" 
          sx={{ marginRight: 2, backgroundColor: '#611f69' }}
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
