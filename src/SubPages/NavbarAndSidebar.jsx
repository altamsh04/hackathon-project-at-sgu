import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, TextField, Menu, MenuItem, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon, AccountCircle } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NavbarAndSidebar = ({ searchText, handleSearchChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [username, setUsername] = useState('');
  const isMenuOpen = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${userId}`);
        setUsername(response.data.username);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <>
      <AppBar position="static" color="primary" sx={{ width: '100%', background: '#611f69' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" sx={{ marginLeft: '16px' }}>
              Dashboard
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              variant="outlined"
              placeholder="Search"
              size="small"
              value={searchText}
              onChange={handleSearchChange}
              sx={{
                marginRight: '16px',
                backgroundColor: 'white',
                borderRadius: '4px',
              }}
              InputProps={{
                startAdornment: (
                  <SearchIcon position="start" />
                ),
              }}
            />

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton edge="end" color="inherit" onClick={handleMenuOpen} sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountCircle />
                <Typography variant="body1" sx={{ marginLeft: '8px' }}>
                  {username}
                </Typography>
              </IconButton>
              <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose}>
                <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={() => { handleMenuClose(); navigate('/signin'); }}>Logout</MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250, padding: '16px' }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '16px' }}>
            <Typography variant="h6">RemoteSync</Typography>
          </Box>

          <List>
            <ListItem button component={Link} to="/home">
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={Link} to="/createproject">
              <ListItemText primary="New Projects" />
            </ListItem>            
            <ListItem button component={Link} to="/myprojects">
              <ListItemText primary="My Projects" />
            </ListItem>
            <ListItem button component={Link} to="/profile">
              <ListItemText primary="Profile" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default NavbarAndSidebar;
