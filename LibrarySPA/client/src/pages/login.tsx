import {
  Box,
  Link,
  Container,
  FormControl,
  InputAdornment,
  Input,
  CircularProgress,
  Button,
  Typography
} from '@mui/material';

import { FormEvent, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import ForwardIcon from '@mui/icons-material/Forward';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';

import { authService } from '../services/authService';

export function Login() {
  let navigate = useNavigate();
  //TODO merge into a single state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [logginError, setLogginError] = useState<string>('');

  async function submit(event: FormEvent) {
    event.preventDefault();

    if (username && password) {
      try {
        await authService.login({ username, password });
        navigate('/');
      } catch (error: any) {
        setLogginError(error?.message);
      }
    }
  }

  return (
    <Container maxWidth='md'>
      <form onSubmit={submit}>
        <Box>
          <FormControl>
            <Input
              name='username'
              id='input-email/username'
              placeholder='Name/Email'
              type='username'
              value={username}
              startAdornment={
                <InputAdornment position='start'>
                  <CircularProgress />
                </InputAdornment>
              }
              inputProps={{ 'variant': 'outlined' }}
              onChange={event => setUsername(event.target.value)}
            />
            <Input
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
            <Button
              type='submit'
              variant='contained'
              color="primary"
              startIcon={<ForwardIcon />}
            > Log in </Button>
            <Typography>{logginError}</Typography>
          </FormControl>
        </Box>
      </form>
      <Typography>
        Doesn't have a registration?
        <Link component={RouterLink} to="/register" underline="none" color="primary">
          Sign up
        </Link>
      </Typography>
    </Container>
  )
}
