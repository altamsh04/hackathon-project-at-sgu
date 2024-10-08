import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, Avatar, Grid, Button, Fade } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavbarAndSidebar from '../SubPages/NavbarAndSidebar';

const MyProjects = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/project/allprojects');
        const userAdminProjects = response.data.filter(project => project.admin === userId);
        setProjects(userAdminProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleViewProject = (projectId, adminId) => {
    navigate(`/projects/${projectId}/admin/${adminId}`);
  };

  return (
    <>
      <NavbarAndSidebar />
      <Box sx={{ padding: { xs: '8px', sm: '16px', md: '32px' }, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        <Typography variant="h4" sx={{ marginBottom: '24px', color: '#333' }}>
          My Projects
        </Typography>

        {projects.length > 0 ? (
          <Grid container spacing={3}>
            {projects.map(project => (
              <Grid item xs={12} sm={6} md={4} key={project._id}>
                <Fade in timeout={500}>
                  <Card
                    sx={{
                      backgroundColor: '#3b3939',
                      color: '#fff',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                      },
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                        <Avatar sx={{ backgroundColor: '#611f69', marginRight: '12px' }}>
                          {project.projectName.charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{project.projectName}</Typography>
                      </Box>
                      <Typography variant="body2" sx={{ marginBottom: '16px' }}>
                        {project.projectDescription}
                      </Typography>
                      <Typography variant="caption" color="gray" sx={{ display: 'block', marginBottom: '12px' }}>
                        Created on: {new Date(project.createdAt).toLocaleDateString()}
                      </Typography>
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: '#611f69', '&:hover': { backgroundColor: '#4b144e' } }}
                        onClick={() => handleViewProject(project._id, project.admin)}
                      >
                        View Project
                      </Button>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1" sx={{ color: '#666' }}>
            No projects found where you are the admin.
          </Typography>
        )}
      </Box>
    </>
  );
};

export default MyProjects;
