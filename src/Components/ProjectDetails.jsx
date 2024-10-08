import React, { useEffect, useState } from 'react';
import { Typography, Box, Card, CardContent, Grid, Avatar, Button, CardActionArea, LinearProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavbarAndSidebar from '../SubPages/NavbarAndSidebar';
import CloseIcon from '@mui/icons-material/Close';

const ProjectDetails = () => {
    const { projectId, adminId } = useParams();
    const [project, setProject] = useState(null);
    const [members, setMembers] = useState([]);
    const [progress, setProgress] = useState(0); // Progress state
    const [openDialog, setOpenDialog] = useState(false); // State to control dialog open/close
    const [selectedMemberId, setSelectedMemberId] = useState(null); // State to store the selected member ID
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskAttachment, setTaskAttachment] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProject = async () => {
            try {
                // Fetch project details
                const projectResponse = await axios.get(`http://localhost:3000/api/project/myprojects/${projectId}/admin/${adminId}`);
                const projectData = projectResponse.data;
                setProject(projectData);

                // Fetch member details
                if (projectData.memberButtons && projectData.memberButtons.length > 0) {
                    const memberIds = projectData.memberButtons;
                    const memberPromises = memberIds.map(id => axios.get(`http://localhost:3000/api/users/${id}`));
                    const memberResponses = await Promise.all(memberPromises);
                    setMembers(memberResponses.map(res => res.data));
                }
            } catch (error) {
                console.error('Error fetching project details or members:', error);
            }
        };

        fetchProject();
    }, [projectId, adminId]);

    const handleAssignTask = (memberId) => {
        setSelectedMemberId(memberId);
        setOpenDialog(true); // Open the dialog when "Assign Task" is clicked
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedMemberId(null); // Clear selected member ID
        setTaskTitle('');
        setTaskDescription('');
        setTaskAttachment(null);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        if (!taskTitle || !taskDescription) {
            alert('Please fill in both the title and description');
            return;
        }
    
        try {
            // Send the task data to the backend
            const taskData = {
                project_id: projectId,       // Capturing project ID from the URL params
                userid: selectedMemberId,    // Capturing selected member ID
                title: taskTitle,
                description: taskDescription
            };
            console.log(taskData);
            const response = await axios.post('http://localhost:3000/api/tasks', taskData);
    
            if (response.status === 201) {
                alert('Task assigned successfully');
            } else {
                alert('Failed to assign task');
            }
    
            // Close the dialog after successful submission
            handleCloseDialog();
        } catch (error) {
            console.error('Error assigning task:', error);
            alert('There was an error assigning the task');
        }
    };
    

    const handleAttachmentChange = (event) => {
        setTaskAttachment(event.target.files[0]);
    };

    const handleRemoveUser = (memberId) => {
        console.log(`Remove user ${memberId}`);
        alert(`User ${memberId} removed`);
    };

    const handleViewTasks = (memberId) => {
        console.log(`View tasks for member ${memberId}`);
        alert(`Viewing tasks for member ${memberId}`);
    };

    const updateProgress = (percentage) => {
        setProgress(percentage);
    };

    if (!project) {
        return <Typography variant="h6">Loading...</Typography>;
    }

    return (
        <>
            <NavbarAndSidebar />
            <Box sx={{ padding: { xs: '8px', sm: '16px', md: '32px' }, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
                <Typography variant="h4" sx={{ marginBottom: '24px', color: '#333' }}>
                    {project.projectName}
                </Typography>

                <Card sx={{ backgroundColor: '#fff', color: '#333', marginBottom: '24px' }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
                            {project.projectName}
                        </Typography>
                        <Typography variant="body1" sx={{ marginBottom: '16px' }}>
                            {project.projectDescription}
                        </Typography>
                        <Typography variant="caption" color="gray" sx={{ display: 'block', marginBottom: '12px' }}>
                            Created on: {new Date(project.createdAt).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" sx={{ marginBottom: '8px' }}>
                            Skills:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '16px' }}>
                            {project.userInputButtons && project.userInputButtons.map((button, index) => (
                                <Button key={index} variant="outlined" sx={{ color: '#611f69', borderColor: '#611f69' }}>
                                    {button}
                                </Button>
                            ))}
                        </Box>
                    </CardContent>
                </Card>
                <Typography variant="h5" sx={{ marginBottom: '24px', color: '#333' }}>
                    Team Members
                </Typography>

                <Grid container spacing={3}>
                    {members.map(member => (
                        <Grid item xs={12} sm={6} md={4} key={member._id}>
                            <Card sx={{ backgroundColor: '#fff', color: '#333', height: '100%' }}>
                                <CardActionArea>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                                            <Avatar sx={{ backgroundColor: '#611f69', marginRight: '12px' }}>
                                                {member.username.charAt(0).toUpperCase()}
                                            </Avatar>
                                            <Typography variant="h6">{member.username}</Typography>
                                        </Box>
                                        <Typography variant="body2" sx={{ marginBottom: '8px' }}>
                                            Email: {member.email}
                                        </Typography>
                                        <Box sx={{ marginTop: '16px' }}>
                                            <Button
                                                variant="outlined"
                                                sx={{ color: '#03a9f4', borderColor: '#03a9f4', marginRight: '8px' }}
                                                onClick={() => handleAssignTask(member._id)}
                                            >
                                                Assign Task
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                sx={{ color: '#e57373', borderColor: '#e57373', marginRight: '8px' }}
                                                onClick={() => handleRemoveUser(member._id)}
                                            >
                                                Remove User
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                sx={{ color: '#81c784', borderColor: '#81c784' }}
                                                onClick={() => handleViewTasks(member._id)}
                                            >
                                                View Tasks
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{ marginTop: '24px' }}>
                    <Typography variant="h6" sx={{ marginBottom: '8px', color: '#333' }}>
                        Project Progress
                    </Typography>
                    <LinearProgress variant="determinate" value={progress} sx={{ height: '10px', borderRadius: '5px' }} />
                    <Typography variant="caption" sx={{ marginTop: '4px', color: '#333' }}>
                        {progress}% completed
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#611f69', '&:hover': { backgroundColor: '#4b144e' }, marginTop: '24px' }}
                    onClick={() => navigate('/myprojects')}
                >
                    Back to My Projects
                </Button>
                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>
                        Assign Task
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={handleCloseDialog}
                            aria-label="close"
                            sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <Box component="form" onSubmit={handleFormSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <TextField
                                label="Task Title"
                                variant="outlined"
                                fullWidth
                                value={taskTitle}
                                onChange={(e) => setTaskTitle(e.target.value)}
                            />
                            <TextField
                                label="Task Description"
                                variant="outlined"
                                multiline
                                rows={4}
                                fullWidth
                                value={taskDescription}
                                onChange={(e) => setTaskDescription(e.target.value)}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <Button type="submit" onClick={handleFormSubmit}>Submit</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </>
    );
};

export default ProjectDetails;
