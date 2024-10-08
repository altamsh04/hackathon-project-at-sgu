import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Box, IconButton, InputAdornment, Typography, Autocomplete, Container, Paper, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NavbarAndSidebar from '../SubPages/NavbarAndSidebar';
import run from '../config/gemini';  // Import the run function

function CreateProject() {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [userInput, setUserInput] = useState('');
  const [userInputButtons, setUserInputButtons] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [memberButtons, setMemberButtons] = useState([]);
  const [members, setMembers] = useState([]);
  const [aiResponse, setAiResponse] = useState(''); // State to store AI response
  const [loading, setLoading] = useState(false); // State to track loading

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        setMembers(response.data.map(user => ({ id: user._id, name: user.username })));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUserInputButton = () => {
    if (userInput) {
      setUserInputButtons([...userInputButtons, userInput]);
      setUserInput('');
    }
  };

  const handleAddMemberButton = () => {
    if (selectedMember) {
      setMemberButtons([...memberButtons, selectedMember.id]);
      setSelectedMember(null);
    }
  };

  const handleRemoveUserInputButton = (indexToRemove) => {
    setUserInputButtons(userInputButtons.filter((_, index) => index !== indexToRemove));
  };

  const handleRemoveMemberButton = (indexToRemove) => {
    setMemberButtons(memberButtons.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const adminId = localStorage.getItem('userId');
    if (!adminId) {
      console.error('Admin ID is not available in localStorage.');
      return;
    }

    const projectData = {
      projectName,
      projectDescription,
      userInputButtons,
      memberButtons,
      admin: adminId,
    };

    try {
      const response = await axios.post('http://localhost:3000/api/project/createproject', projectData);
      console.log('Project created successfully:', response.data);
      setProjectName('');
      setProjectDescription('');
      setUserInputButtons([]);
      setMemberButtons([]);
    } catch (error) {
      console.error('Error creating project:', error.response ? error.response.data : error.message);
    }
  };

  // Function to handle AI button click
  const handleAskAI = async () => {
    const prompt = `
      I am creating a project with the following details:
      Project Name: ${projectName}
      Description: ${projectDescription}
      Tools & Skills: ${userInputButtons.join(', ')}
      Members: ${memberButtons.join(', ')}
    `;

    setLoading(true);  // Start loading
    try {
      const aiGeneratedText = await run(prompt);  // Call the AI API
      setAiResponse(aiGeneratedText);  // Store the response
    } catch (error) {
      console.error('Error asking AI:', error);
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  return (
    <>
      <NavbarAndSidebar />

      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
          <Box component="form" onSubmit={handleSubmit}>
            {/* Heading */}
            <Typography variant="h4" component="h1" gutterBottom>
              Create New Projects
            </Typography>

            {/* Small Description */}
            <Typography variant="body1" gutterBottom>
              Here you can add members and details about the project.
            </Typography>

            {/* Project Name and Description */}
            <TextField
              label="Project Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <TextField
              label="Project Description"
              variant="outlined"
              fullWidth
              margin="normal"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
            />

            {/* User Input with Add Button */}
            <TextField
              label="Tools & Skills"
              variant="outlined"
              fullWidth
              margin="normal"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ background: '#611F69' }}
                      onClick={handleAddUserInputButton}
                    >
                      Add
                    </Button>
                  </InputAdornment>
                ),
              }}
            />

            {/* Dynamic Buttons from User Input */}
            <Box
              sx={{
                mt: 2,
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 1,
              }}
            >
              {userInputButtons.map((buttonText, index) => (
                <Button
                  key={index}
                  variant="outlined"
                  endIcon={
                    <IconButton
                      size="small"
                      color="inherit"
                      onClick={() => handleRemoveUserInputButton(index)}
                    >
                      <CloseIcon />
                    </IconButton>
                  }
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  {buttonText}
                </Button>
              ))}
            </Box>

            {/* Search Bar for Adding Members */}
            <Autocomplete
              options={members}
              getOptionLabel={(option) => option.name}
              value={selectedMember}
              onChange={(event, newValue) => setSelectedMember(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Members"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          color="primary"
                          onClick={handleAddMemberButton}
                          disabled={!selectedMember}
                        >
                          Add
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            {/* Dynamic Buttons from Selected Members with Admin Image */}
            <Box
              sx={{
                mt: 2,
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 1,
              }}
            >
              {memberButtons.map((memberId, index) => {
                const member = members.find((m) => m.id === memberId);
                return (
                  <Button
                    key={index}
                    variant="outlined"
                    startIcon={
                      <img
                        src={'./src/assets/default_profile.png'}
                        alt="Admin"
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          marginRight: '8px',
                        }}
                      />
                    }
                    endIcon={
                      <IconButton
                        size="small"
                        color="inherit"
                        onClick={() => handleRemoveMemberButton(index)}
                      >
                        <CloseIcon />
                      </IconButton>
                    }
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    {member ? member.name : 'Unknown'}
                  </Button>
                );
              })}
            </Box>

            {/* Ask AI Button */}
            <Button
              variant="contained"
              color="secondary"
              sx={{ mt: 2, background: '#4285F4' }}
              fullWidth
              onClick={handleAskAI}
              disabled={loading}  // Disable button while loading
            >
              Ask AI to Create Project Mapping
            </Button>

            {/* Loader */}
            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <CircularProgress />
              </Box>
            )}

            {/* Display AI Response */}
            {aiResponse && !loading && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6">AI Generated Project Mapping:</Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                  {aiResponse}
                </Typography>
              </Box>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3, background: '#611F69' }}
            >
              Create Project
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default CreateProject;
