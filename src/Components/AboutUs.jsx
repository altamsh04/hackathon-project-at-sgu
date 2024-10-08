import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <Box sx={{ padding: '50px 5%', background: 'Black' }} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <Typography
        variant="h4"
        textAlign="center"
        gutterBottom
        sx={{ 
          fontSize: '3rem',  
          fontWeight:'bold', 
          color: '#fff',      
        }}
      >
        About RemoteSync
      </Typography>

      <Typography variant="body1" sx={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        RemoteSync is designed to empower remote teams by providing a seamless project management experience. Our platform integrates task management, real-time collaboration, and AI-powered analytics to help your team stay productive across different time zones.
      </Typography>
    </Box>
  );
};

export default AboutUs;