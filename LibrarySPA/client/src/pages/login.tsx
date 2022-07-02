import {
  Box,
  Link,
  Container,
  InputAdornment,
  Input,
  Button,
  Typography
} from '@mui/material';

import './login.css';

import { FormEvent, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import ForwardIcon from '@mui/icons-material/Forward';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { authService } from '../services/authService';

export function Login() {
  let navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [logginError, setLogginError] = useState<string>('');

  async function submit(event: FormEvent) {
    event.preventDefault();

    if (username && password) {
      try {
        const user = await authService.login({ username, password });
        navigate(`/books/`);
      } catch (error: any) {
        setLogginError(error?.message);
      }
    }
  }

  return (
    <Container className='login' maxWidth='md'>
      <form onSubmit={submit}>
        <Box className='container'>
            <Input 
              className='input'
              name='username'
              id='input-email/username'
              placeholder='Name/Email'
              type='username'
              value={username}
              startAdornment={
                <InputAdornment position='start'>
                  <AccountCircleIcon />
                </InputAdornment>
              }
              inputProps={{ 'variant': 'outlined' }}
              onChange={event => setUsername(event.target.value)}
            />
            <Input
              className='input'
              name='password'
              id='input-password'
              placeholder='Password'
              type='password'
              value={password}
              startAdornment={
                <InputAdornment position='start'>
                  <VpnKeyOutlinedIcon />
                </InputAdornment>
              }
              inputProps={{ 'variant': 'outlined' }}
              onChange={event => setPassword(event.target.value)}
            />
            <Typography className='logginError'>{logginError}</Typography>
            <Button
              className='submitButton'
              type='submit'
              variant='contained'
              color="primary"
              startIcon={<ForwardIcon />}
            > Log in </Button>
        </Box>
      </form>
      <Typography className='registration'>
        Doesn't have a registration?
        <Link component={RouterLink} to="/register" underline="none" color="primary">
          Sign up
        </Link>
      </Typography>
    </Container>
  )
}
