import { useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../hooks/useCurrentUser';
import './appHeader.css';

import {
  Box,
  Menu,
  MenuItem,
  IconButton,
  Button,
  Typography,
  Link,
  Toolbar,
  AppBar
} from '@mui/material';

import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { authService } from '../services/authService';

export function AppHeader() {
  let location = useLocation();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const user = useCurrentUser();

  function logout() {
    setAnchorEl(null);
    authService.logout();
    navigate('/login');
  }

  return (
    <AppBar className='position'>
      <Toolbar>
        <MenuBookRoundedIcon />
        <Typography variant="h5" className='title'>
          <Link component={RouterLink} to={`/books`} underline="none" color="inherit">GreatReads</Link>
        </Typography>
        <Box className='user'>
          {user ? (
            <Typography>Hello, {user.name}! </Typography>
          ) : (
            <Typography>You should login!</Typography>
          )}
        </Box>
        {user && (
          <>
            <IconButton
              onClick={event => setAnchorEl(event.currentTarget)}
              color="inherit"
            >
              <AccountCircleOutlinedIcon />
            </IconButton>
            <Menu
              className='userMenu'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={!!anchorEl}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem className='userMenuItem' component={RouterLink} to='/profile' onClick={() => { setAnchorEl(null) }}>
                <PersonOutlineOutlinedIcon />
                My profile
              </MenuItem>
              <MenuItem className='userMenuItem' onClick={logout}>
                <ExitToAppIcon />
                Log out
              </MenuItem>
            </Menu>
          </>
        )}
        {!user && location.pathname !== '/login' && (
          <Button color="inherit" component={RouterLink} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
