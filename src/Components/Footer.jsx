import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#2E073F',
        color: '#ffffff',
        padding: '40px 0',
        marginTop: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
            RemoteSync
            </Typography>
            <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
            RemoteSync is a leading platform for remote teams, offering powerful project management and collaboration tools to help your team work together seamlessly, no matter where they are in the world.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box>
              <Link href="#" underline="none" color="inherit" sx={{ display: 'block', marginBottom: '8px' }}>
                Home
              </Link>
              <Link href="#" underline="none" color="inherit" sx={{ display: 'block', marginBottom: '8px' }}>
                Features
              </Link>
              <Link href="#" underline="none" color="inherit" sx={{ display: 'block', marginBottom: '8px' }}>
                Pricing
              </Link>
              <Link href="#" underline="none" color="inherit" sx={{ display: 'block', marginBottom: '8px' }}>
                Contact Us
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box>
              <IconButton href="#" sx={{ color: '#ffffff' }}>
                <Facebook />
              </IconButton>
              <IconButton href="#" sx={{ color: '#ffffff' }}>
                <Twitter />
              </IconButton>
              <IconButton href="#" sx={{ color: '#ffffff' }}>
                <LinkedIn />
              </IconButton>
              <IconButton href="#" sx={{ color: '#ffffff' }}>
                <Instagram />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
          <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
            © {new Date().getFullYear()} RemoteSync. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;