import React, { useState, useEffect } from 'react';
import { Box, TextField, IconButton, Avatar, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { cssContainerQueries, styled } from '@mui/system';
import axios from 'axios';
import NavbarAndSidebar from '../SubPages/NavbarAndSidebar';
const ProfileCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#F3F3F3',
  borderRadius: '16px',
  padding: '32px',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  maxWidth: '400px',
  width: '100%',
  marginTop: '-120px'
}));

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    '& fieldset': {
      borderColor: '#ddd',
    },
    '&:hover fieldset': {
      borderColor: '#ccc',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#3f51b5',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#888',
  },
  '& .MuiInputAdornment-root': {
    color: '#888',
  },
});

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    username: '', 
    email: '',
    mobile: '',
    skills: '',
  });
  const [isEditable, setIsEditable] = useState({
    userName: false,
    email: false,
    mobile: false,
    skills: false,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:3000/api/users/${userId}`);
          const user = response.data;
          console.log(user)
          setUserData({
            username: user.username || '',
            email: user.email || '',
            mobile: user.mobile || ''
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    fetchUserData();
  }, []);



  return (
    <>
    <NavbarAndSidebar />
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: '#fff',
        padding: 3,
      }}
    >
      <ProfileCard>
        <Avatar
          alt="User Profile"
          src="../assets/default_profile.png"
          sx={{ width: 120, height: 120, mb: 3, border: '3px solid #611f69' }}
        />

        <Typography variant="h5" sx={{ mb: 2, color: '#611f69', fontWeight: 'bold' }}>
          Welcome, {userData.username}!
        </Typography>
        <StyledTextField
          label="Email ID"
          variant="outlined"
          value={userData.email}
          disabled={!isEditable.email}
          sx={{ mb: 2, width: '100%' }}
        />

        <StyledTextField
          label="Mobile Number"
          variant="outlined"
          value={userData.mobile}
          disabled={!isEditable.mobile}
          sx={{ mb: 2, width: '100%' }}
        />
      </ProfileCard>
    </Box>
    </>
  );
};

export default ProfilePage;
