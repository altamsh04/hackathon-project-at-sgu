import React, { useState } from 'react';
import ProfileCard from '../Components/ProfileCard';
import PopUp from '../Components/PopUp';
import { Container, CssBaseline, Typography, Grid } from '@mui/material';
import NavbarAndSidebar from '../SubPages/NavbarAndSidebar';
const TeamMembers = () => {
  const [open, setOpen] = useState(false);

  const handleAssignTask = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemove = () => {
    console.log('User Removed');
  };

  return (
    <>
    <NavbarAndSidebar />
      <CssBaseline />
      <Container
        maxWidth="lg"
        sx={{
          textAlign: 'center',
          mt: 1,
        }}
      >
        <Grid
          container
          spacing={10}
          sx={{
            justifyContent: 'center',
            mt: '-40px',
          }}
        >
          <Grid item xs={12} sm={6} md={4}>
            <ProfileCard
              name="John Doe"
              email="johndoe@example.com"
              skills={['JavaScript', 'React', 'Node.js']}
              progress={75}
              onAssignTask={handleAssignTask}
              onRemove={handleRemove}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ProfileCard
              name="Jane Smith"
              email="janesmith@example.com"
              skills={['Python', 'Django', 'Data Science']}
              progress={60}
              onAssignTask={handleAssignTask}
              onRemove={handleRemove}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ProfileCard
              name="Alice Johnson"
              email="alicejohnson@example.com"
              skills={['Java', 'Spring', 'Microservices']}
              progress={20}
              onAssignTask={handleAssignTask}
              onRemove={handleRemove}
            />
          </Grid>
        </Grid>
      </Container>
      <PopUp open={open} onClose={handleClose} />
    </>
  );
};

export default TeamMembers;