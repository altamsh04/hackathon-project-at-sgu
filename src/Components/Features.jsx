import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const features = [
  { 
    title: "Task Management", 
    description: "Efficiently manage tasks and deadlines.", 
    image: "https://d34u8crftukxnk.cloudfront.net/slackpress/prod/sites/6/M10A6H%402x.jpg?d=500x500&f=inside" 
  },
  { 
    title: "Real-time Collaboration", 
    description: "Collaborate in real-time across time zones.", 
    image: "https://d34u8crftukxnk.cloudfront.net/slackpress/prod/sites/6/collaborative-leadership-hero.jpg?d=500x500&f=inside" 
  },
  { 
    title: "File Sharing", 
    description: "Securely share files and documents.", 
    image: "https://d34u8crftukxnk.cloudfront.net/slackpress/prod/sites/6/tech-ebook-blog-hero-920x920%401x.jpg?d=500x500&f=inside" 
  },
  { 
    title: "Video Conferencing", 
    description: "Integrated video conferencing to stay connected.", 
    image: "https://d34u8crftukxnk.cloudfront.net/slackpress/prod/sites/6/2021-06-huddles-feature-hero%402x.jpg?d=500x500&f=inside" 
  },
  { 
    title: "Progress Tracking", 
    description: "Track your team's progress with detailed reports.", 
    image: "https://d34u8crftukxnk.cloudfront.net/slackpress/prod/sites/6/slack-marketing-efficiency-02-2x%402x.jpg?d=500x500&f=inside" 
  },
  { 
    title: "AI-Powered Analytics", 
    description: "Utilize AI to optimize team performance.", 
    image: "https://d34u8crftukxnk.cloudfront.net/slackpress/prod/sites/6/2021-08-platform-education-boost-teamwork-hero%402x-1.jpg?d=500x500&f=inside" 
  },
];

const Features = () => {
  return (
    <Box sx={{ padding: '50px 5%', backgroundColor: '#2E073F' }}>
      <Typography 
        variant="h4" 
        textAlign="center" 
        gutterBottom 
        sx={{
          fontSize: '3rem',  
          fontWeight: 'bold', 
          color: '#fff'
        }}
      >
        Features
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {features.map((feature, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={index}
            component={motion.div}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <Box 
              sx={{ 
                padding: 2, 
                backgroundColor: '#ffffff', 
                borderRadius: '8px', 
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: 3, 
                maxWidth: '80%', 
                height: '250px', 
                margin: '0 auto',
              }}
            >
              <Box
                component="img"
                src={feature.image}
                alt={feature.title}
                sx={{
                  width: '100%',
                  height: '120px', 
                  borderRadius: '8px',
                  marginBottom: 1.5,
                  objectFit: 'contain'
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000' }}>
                {feature.title}
              </Typography>
              <Typography sx={{ color: '#000', fontSize: '0.875rem', marginTop: 1 }}>
                {feature.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Features;