import { Link as RouterLink } from 'react-router-dom';

import { Link, Typography, Box, Breadcrumbs } from '@mui/material';
import './appFooter.css';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import FiberManualRecordOutlinedIcon from '@mui/icons-material/FiberManualRecordOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import AddIcon from '@mui/icons-material/Add';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CopyrightIcon from '@mui/icons-material/Copyright';

import { useCurrentUser } from '../hooks/useCurrentUser';

export function AppFooter() {
  const user = useCurrentUser();

  return (
    <Box className='footerContainer'>
      <Box className='leftBox'>
        <CopyrightIcon />
        <Typography className='contrastText'>GreatReads</Typography>
      </Box>
      {user &&
        <Box className='middleBox'>
          <Breadcrumbs aria-label="breadcrumb">
            <Link className='footerLink' component={RouterLink} to="/addBook" underline="none" color="inherit">
              <AddIcon className='icon'/>
              New book
            </Link>
            <Link className='footerLink' component={RouterLink} to={`/books`} underline="none" color="inherit">
              <HomeOutlinedIcon className='icon'/>
              Home        
            </Link>
            <Link className='footerLink' component={RouterLink} to="/profile" underline="none" color="inherit">
              <PersonOutlineOutlinedIcon className='icon' />
              Profile
            </Link>
          </Breadcrumbs>
        </Box>
      }
    </Box>
  );
}

       {/*<Box className='rightBox'>
            <Typography className='switchLabel'>Change theme<ColorLensOutlinedIcon/></Typography>
            <Box component="div" className='themeSwitch'>
                <FiberManualRecordOutlinedIcon htmlColor='black'/>
                <ThemeSwitch checked={prefersDarkTheme} onChange={() => setPreferences({ prefersGenre, prefersDarkTheme: !prefersDarkTheme })} name="themeSwitch" />
                <FiberManualRecordIcon htmlColor='black'/>
            </Box>
          </Box>*/}