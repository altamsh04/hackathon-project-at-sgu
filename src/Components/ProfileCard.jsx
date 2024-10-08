import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Button,
  Chip,
  Box,
  CircularProgress,
} from '@mui/material';

const ProfileCard = ({ name, email, skills, progress, onAssignTask, onRemove }) => {
  const getProgressColor = (progress) => {
    if (progress <= 33) {
      return '#f44336';
    } else if (progress <= 66) {
      return '#ffeb3b';
    } else {
      return '#4caf50';
    }
  };

  const handleRemoveUser = async (memberId) => {
    try {
        await axios.post('http://localhost:3000/api/project/removeUser', {
            projectId,
            userId: memberId
        });

        setMembers(members.filter(member => member._id !== memberId));
        alert('User removed successfully');
    } catch (error) {
        console.error('Error removing user:', error);
        alert('Failed to remove user');
    }
};

  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: 'auto',
        boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
        borderRadius: 3,
        transition: '0.3s',
        '&:hover': {
          boxShadow: '0 12px 20px rgba(0,0,0,0.3)',
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            alt={name}
            src="/path-to-image.jpg"
            sx={{ width: 56, height: 56 }}
          />
        }
        title={<Typography variant="h6" sx={{ fontWeight: 'bold' }}>{name}</Typography>}
        subheader={<Typography variant="body2" color="textSecondary">{email}</Typography>}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Skills:
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            flexWrap: 'wrap',
            my: 1,
            p: 2,
            backgroundColor: '#f0f4f7',
            borderRadius: 2,
            boxShadow: 'inset 0 0 8px rgba(0,0,0,0.1)',
          }}
        >
          {skills.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              sx={{ backgroundColor: '#e0f7fa', color: '#00796b', fontWeight: 'bold' }}
            />
          ))}
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            mt: 2,
          }}
        >
          <CircularProgress
            variant="determinate"
            value={progress}
            size={100}
            thickness={6}
            sx={{ color: getProgressColor(progress) }}
          />
          <Box
            sx={{
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="h6"
              component="div"
              color="textPrimary"
              sx={{ fontWeight: 'bold' }}
            >
              {Math.round(progress)}%
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={onAssignTask}
          sx={{ textTransform: 'none', backgroundColor: '#2196f3' }}
        >
          Add Task
        </Button>
        <Button
          variant="contained"
          color="success"
          sx={{ textTransform: 'none', backgroundColor: '#4caf50' }}
        >
          View Task
        </Button>
        <Button
          variant="contained"
          color="error"
          sx={{ textTransform: 'none', backgroundColor: '#f44336' }}
        >
          Delete Member
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProfileCard;
