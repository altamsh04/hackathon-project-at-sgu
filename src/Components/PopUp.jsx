import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  IconButton,
  DialogActions,
  Box
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Close, CalendarToday, AttachFile } from '@mui/icons-material';

const PopUp = ({ open, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [file, setFile] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false); // State to control calendar visibility

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSave = () => {
    console.log({
      title,
      description,
      selectedDate,
      file
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Add New Task
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          style={{ position: 'absolute', right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          fullWidth
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Task Description"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            color="primary"
            onClick={() => setShowCalendar((prev) => !prev)}
            aria-label="calendar"
          >
            <CalendarToday />
          </IconButton>
          {showCalendar && (
            <Box sx={{ ml: 2 }}>
              <DatePicker
                label="Select Due Date"
                value={selectedDate}
                onChange={(newDate) => setSelectedDate(newDate)}
                renderInput={(params) => (
                  <TextField {...params} fullWidth margin="dense" variant="outlined" />
                )}
              />
            </Box>
          )}
          <IconButton
            color="primary"
            aria-label="upload file"
            component="label"
          >
            <AttachFile />
            <input
              type="file"
              hidden
              onChange={handleFileChange}
            />
          </IconButton>
          {file && <p>{file.name}</p>}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopUp;