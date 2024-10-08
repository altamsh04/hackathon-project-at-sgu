import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  Avatar,
  Box,
  IconButton
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  if (!project) {
    console.error('Project data is missing');
    return null;
  }

  const { projectName, projectDescription, admin, createdAt, _id: projectId } = project;
  const userId = localStorage.getItem('userId');

  if (!userId) {
    console.error('User ID not found in local storage');
    return null;
  }

  console.log(`Project ID: ${projectId}`);
  console.log(`User ID: ${userId}`);
  const isAdmin = admin._id === userId;

  const handleViewClick = () => {
    if (isAdmin) {
      navigate(`/teammembers`);
    } else {
      sessionStorage.setItem('projectId', projectId);
      navigate(`/project/tasks`);
    }
  };
  
  const adminAvatarUrl = 'https://example.com/your-avatar.jpg';

  return (
    <Card sx={{ width: '100%', marginTop: '10px', backgroundColor: '#3b3939', color: '#fff' }}>
      <CardHeader
        avatar={
          <Avatar aria-label="profile-pic" src={adminAvatarUrl} />
        }
        title={
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography variant="body1" sx={{ color: '#fff' }}>
              {admin.username}
            </Typography>
            <Typography variant="body2" sx={{ color: 'gray' }}>
              Created at {new Date(createdAt).toLocaleDateString()}
            </Typography>
          </Box>
        }
        action={
          <IconButton aria-label="star">
            <StarIcon sx={{ color: '#fff' }} />
          </IconButton>
        }
        sx={{ alignItems: 'center', textAlign: 'left' }}
      />
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Box sx={{ textAlign: 'left' }}>
              <Typography variant="body2" color="text.secondary" sx={{ color: '#fff' }}>
                <strong>{projectName}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, color: '#fff' }}>
                {projectDescription}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '150px' }}>
              <Button
                variant="contained"
                color="success"
                sx={{ mb: 1, width: '100%' }}
                onClick={handleViewClick}
              >
                View
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ width: '100%' }}
              >
                Leave
              </Button>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
