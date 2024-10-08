import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, CircularProgress } from '@mui/material';
import NavbarAndSidebar from '../SubPages/NavbarAndSidebar';
const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userId = localStorage.getItem('userId');
    const projectId = sessionStorage.getItem('projectId');

    useEffect(() => {
        const fetchTasks = async () => {
            if (userId && projectId) {
                try {
                    const tasksResponse = await axios.get('http://localhost:3000/api/tasks');
                    const allTasks = tasksResponse.data;
                    const filtered = allTasks.filter(task => task.project_id === projectId && task.userid === userId);

                    setTasks(allTasks);
                    setFilteredTasks(filtered);
                } catch (err) {
                    setError('Failed to fetch tasks');
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            } else {
                setError('User ID or Project ID not found.');
                setLoading(false);
            }
        };

        fetchTasks();
    }, [userId, projectId]);

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}><CircularProgress /></Box>;
    }

    if (error) {
        return <Typography variant="h6" color="error">{error}</Typography>;
    }

    return (
        <><NavbarAndSidebar />
            <Box sx={{ padding: 2 }}>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ color: 'black', fontWeight: 'bold' }}
                >
                    Task List
                </Typography>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Created At</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredTasks.map(task => (
                                <TableRow key={task._id}>
                                    <TableCell>{task.title}</TableCell>
                                    <TableCell>{task.description}</TableCell>
                                    <TableCell>{new Date(task.created_at).toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>);
};

export default TaskList;
