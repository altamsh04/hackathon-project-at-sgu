import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import ProjectCard from '../Components/ProjectCard';
import axios from 'axios';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const MessageText = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  animation: `${slideIn} 1s ease-out`,
  [theme.breakpoints.up('sm')]: {
    fontSize: '3rem',
  },
}));

const HighlightedText = styled(Typography)(({ theme }) => ({
  display: 'inline',
  fontWeight: 'bold',
  fontSize: '3.5rem',
  background: 'linear-gradient(90deg, #611f69, #9e2a7b)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: `${fadeIn} 1.5s ease-in`,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: '0.875rem',
  padding: '8px 16px',
}));

const Column2 = () => {
  const [showCards, setShowCards] = useState(false);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState({}); 

  const handleAction = () => {
    setShowCards(true);
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/project/allprojects');
        const userProjects = response.data.filter(project =>
          project.memberButtons.includes(userId)
        );
        setProjects(userProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        const usersMap = response.data.reduce((map, user) => {
          map[user._id] = user;
          return map;
        }, {});
        setUsers(usersMap);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchProjects();
    fetchUsers();
  }, []);

  return (
    <Box sx={{ height: '100%', marginLeft: '10px', marginRight: '10px' }}>
      <Card sx={{ height: '100%' }}>
        <Typography variant="h5" sx={{ padding: '16px' }}>
          Home
        </Typography>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {!showCards ? (
            <>
              <Typography variant="body1" sx={{ marginTop: '20px', textAlign: 'center' }}>
                <HighlightedText variant="body1">Hello, User!</HighlightedText>
              </Typography>
              <MessageText variant="body1" sx={{ textAlign: 'center', marginTop: '10px' }} onClick={handleAction}>
                Let's make your day productive. How can we assist?
              </MessageText>
              <StyledButton variant="contained" onClick={handleAction} sx={{ marginTop: '20px', background: '#611f69' }}>
                Start Managing Tasks
              </StyledButton>
            </>
          ) : (
            <>
              {projects.map(project => (
                <ProjectCard 
                  key={project._id} 
                  project={{
                    ...project,
                    admin: users[project.admin] || { username: 'Unknown' }
                  }}
                />
              ))}
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Column2;