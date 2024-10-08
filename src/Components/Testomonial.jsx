import React from 'react';
import { Box, Typography, Card, CardContent, Avatar } from '@mui/material';
import { motion } from 'framer-motion';

const testimonials = [
  { name: "John Doe", role: "Software Engineer", feedback: "RemoteSync has transformed the way we work remotely. It’s an essential tool for our team.", avatar: "https://via.placeholder.com/150" },
  { name: "Jane Smith", role: "Project Manager", feedback: "The real-time collaboration and AI-powered analytics have significantly boosted our productivity.", avatar: "https://via.placeholder.com/150" },
  { name: "Michael Brown", role: "Designer", feedback: "RemoteSync is a game-changer for remote teams. We can now stay on track effortlessly.", avatar: "https://via.placeholder.com/150" },
  { name: "Emily White", role: "HR Manager", feedback: "Managing remote teams has never been easier, thanks to RemoteSync!", avatar: "https://via.placeholder.com/150" },
  { name: "David Green", role: "Product Owner", feedback: "RemoteSync's features help us keep everything organized, even across different time zones.", avatar: "https://via.placeholder.com/150" },
];

const Testimonials = () => {
  return (
    <Box sx={{ padding: '50px 5%', backgroundColor: '#fff', overflow: 'hidden' }}>
      <Typography variant="h4" textAlign="center" gutterBottom
        sx={{color: '#611f69',
          fontSize: '3rem',  
          fontWeight: 'bold'
        }}
      >
        What Our Users Say
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          position: 'relative',
          whiteSpace: 'nowrap',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 4,
            animation: 'scroll 30s linear infinite',
          }}
        >
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <Box
              key={index}
              sx={{ minWidth: 300, flexShrink: 0 }}
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                    <Avatar src={testimonial.avatar} sx={{ marginRight: 2 }} />
                    <Box>
                      <Typography variant="h6">{testimonial.name}</Typography>
                      <Typography variant="body2" color="textSecondary">{testimonial.role}</Typography>
                    </Box>
                  </Box>
                  <Typography>{testimonial.feedback}</Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </Box>
  );
};

export default Testimonials;