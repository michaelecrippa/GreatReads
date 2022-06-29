import { FormEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
  MenuItem
} from '@mui/material';

import { authService } from '../services/authService';
import { userService } from '../services/userService';
import { formService } from '../services/formService';
import { GENDERS } from '../constats/genderConstants';

import { NationalityDTO } from '../models/nationality.model';
import { ComponentState } from '../models/Components/componentState.interface';
import { useFormInput } from '../hooks/useInput';

export function Register() {
  let navigate = useNavigate();
  const [componentState, setComponentState] = useState<ComponentState<NationalityDTO>>({
    availableEntities: [] as NationalityDTO[],
    loading: true,
    error: undefined
  });

  const getNationalities = async () => {
    try {
      const nationalities = await formService.takeNationalities();

      setComponentState({ availableEntities: nationalities, loading: false, error: undefined });
    } catch (exception) {
      setComponentState({ availableEntities: [], loading: false, error: exception });
    }
  }

  useEffect(() => { getNationalities(); }, [])

  const {
    input,
    onChange,
    hasError,
    errorMessageFor,
    globalErrorMessage
  } = useFormInput({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    sex: '',
    nationality: ''
  });

  async function submit(event: FormEvent) {
    event.preventDefault();

    submitUser();
  }

  const submitUser = async () => {
    await userService.createUser({
      name: input.name,
      email: input.email,
      password: input.password,
      confirmPassword: input.confirmPassword,
      sex: input.sex,
      nationality: input.nationality
    });

    await authService.login({
      username: input.name,
      password: input.password
    });
    navigate('/');
  }

  const globalError = globalErrorMessage(componentState.error);
  return (
    <Container maxWidth="sm">
      <Typography
        component="h1"
        variant="h4"
        align="center">
        Sign up
      </Typography>

      <form onSubmit={submit}>
        <TextField
          label="Name"
          value={input.name}
          error={hasError('name', componentState.error)}
          helperText={errorMessageFor('name', componentState.error)}
          onChange={onChange('name')} />

        <TextField
          label="Email"
          value={input.email}
          error={hasError('email', componentState.error)}
          helperText={errorMessageFor('email', componentState.error)}
          onChange={onChange('email')} />

        <TextField
          label="Password"
          value={input.password}
          type='password'
          error={hasError('password', componentState.error)}
          helperText={errorMessageFor('password', componentState.error)}
          onChange={onChange('password')} />

        <TextField
          label="Confirm password"
          value={input.confirmPassword}
          type='password'
          error={hasError('confirmPassword', componentState.error)}
          helperText={errorMessageFor('confirmPassword', componentState.error)}
          onChange={onChange('confirmPassword')} />

        <TextField
          label="Gender"
          value={input.sex}
          select
          error={hasError('sex', componentState.error)}
          helperText={errorMessageFor('sex', componentState.error)}
          onChange={onChange('sex')}>
          {GENDERS.map((genderOption) => (
            <MenuItem value={genderOption.value} key={genderOption.value}>
              {genderOption.value}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Nationality"
          value={input.nationality}
          select
          error={hasError('nationality', componentState.error)}
          helperText={errorMessageFor('nationality', componentState.error)}
          onChange={onChange('nationality')}>
          {componentState.availableEntities &&
            componentState.availableEntities.map((nationalityOptions: NationalityDTO) => (
              <MenuItem value={nationalityOptions.name} key={nationalityOptions.id}>
                {nationalityOptions.name}
              </MenuItem>
            ))}
        </TextField>

        <Button type="submit" variant="contained" disabled={componentState.loading}>
          {componentState.loading ? <CircularProgress /> : 'Submit'}
        </Button>

        {globalError && <Typography color="secondary">{globalError}</Typography>}
      </form>
    </Container>
  )
}
