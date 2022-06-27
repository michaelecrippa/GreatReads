import { Link as RouterLink } from 'react-router-dom';

import { Link, Typography, Box, Breadcrumbs } from '@mui/material';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddIcon from '@mui/icons-material/Add';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CopyrightIcon from '@mui/icons-material/Copyright';

import { useCurrentUser } from '../hooks/useCurrentUser';

export function AppFooter() {
  const user = useCurrentUser();

  return (
    <Box>
      <Box>
        <CopyrightIcon />
        <Typography>LibrarySPA</Typography>
      </Box>
      {user &&
        <Box>
          <Breadcrumbs aria-label="breadcrumb">
            <Link component={RouterLink} to="/addBook" underline="none" color="inherit">
              <AddIcon />
              New book
            </Link>
            <Link component={RouterLink} to="/" underline="none" color="inherit">
              <HomeOutlinedIcon />
              Home
            </Link>
            <Link component={RouterLink} to="/profile" underline="none" color="inherit">
              <PersonOutlineOutlinedIcon />
              Profile
            </Link>
          </Breadcrumbs>
        </Box>
      }
    </Box>
  );
}
