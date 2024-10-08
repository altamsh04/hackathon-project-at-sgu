import React, { useContext, useEffect, useRef } from 'react';
import { Box, Typography, Avatar, TextField, IconButton, CircularProgress } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { Context } from '../Context/Context';

const Column3 = () => {
  const { sendPrompt, showResult, loading, chatHistory, input, setInput } = useContext(Context);
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendPrompt();
    }
  };

  return (
    <Box sx={{ height: '650px', display: 'flex', flexDirection: 'column', backgroundColor: 'white', overflowY: 'auto', borderRadius: '5px'}}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
        <Typography variant="h6" color="textSecondary">
          Sync AI
        </Typography>
        <Avatar src="/path/to/user_icon.png" alt="User Icon" />
      </Box>
      <Box sx={{ flex: 1, maxWidth: '900px', margin: 'auto', padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
          {chatHistory.map((msg, index) => (
            <Box key={index} sx={{ marginBottom: '10px', display: 'flex', flexDirection: 'column', alignItems: msg.type === 'user' ? 'flex-end' : 'flex-start' }}>
              <Typography sx={{ 
                maxWidth: '70%', 
                wordBreak: 'break-word', 
                backgroundColor: msg.type === 'user' ? 'rgba(209, 234, 255, 0.9)' : 'rgba(241, 241, 241, 0.9)', // Increased opacity
                color: 'black',
                padding: '10px', 
                borderRadius: '8px' 
              }}>
                {msg.text}
              </Typography>
            </Box>
          ))}
          <div ref={endOfMessagesRef} />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <TextField
            fullWidth
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter your prompt here"
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={sendPrompt}
                  disabled={loading}
                  edge="end"
                  sx={{ padding: '10px' }}
                >
                  {loading ? <CircularProgress size={24} /> : <SendIcon />}
                </IconButton>
              ),
            }}
            sx={{ backgroundColor: 'white', width: '100%' }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Column3;
