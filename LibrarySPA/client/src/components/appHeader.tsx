import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { useCurrentUser } from '../hooks/useCurrentUser';

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
  let history = createBrowserHistory();

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const user = useCurrentUser();

  function logout() {
    setAnchorEl(null);
    authService.logout();
  }

  return (
    <AppBar>
      <Toolbar>
        <MenuBookRoundedIcon />
        <Typography variant="h5" >
          <Link component={RouterLink} to="/" underline="none" color="inherit">GreatReads</Link>
        </Typography>
        <Box >
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
              <MenuItem component={RouterLink} to='/profile' onClick={() => { setAnchorEl(null) }}>
                <PersonOutlineOutlinedIcon />
                My profile
              </MenuItem>
              <MenuItem onClick={logout}>
                <ExitToAppIcon />
                Log out
              </MenuItem>
            </Menu>
          </>
        )}
        {!user && history.location.pathname !== '/login' && (
          <Button color="inherit" component={RouterLink} to="/login">Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
