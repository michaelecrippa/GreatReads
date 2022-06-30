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

import { NationalityDTO } from '../models/Common/nationality.model';
import { ComponentState } from '../models/Components/componentState.interface';
import { useFormInput } from '../hooks/useInput';
import { useAsyncAction } from '../hooks/useAsyncAction';

export function Register() {
  let navigate = useNavigate();

  let [componentState, setComponentState] = useState<ComponentState<NationalityDTO>>({
    data: undefined,
    availableEntities: [] as NationalityDTO[],
    loading: true,
    error: undefined
  });

  const getNationalities = async () => {
    try {
      const nationalities = await formService.takeNationalities();

      setComponentState({ availableEntities: nationalities, loading: false, error: undefined, data: undefined });
    } catch (exception) {
      setComponentState({ availableEntities: [], loading: false, error: exception, data: undefined });
    }
  }

  useEffect(() => { getNationalities() }, [])

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

  const { perform: submitUser, error, loading } = useAsyncAction(async () => {
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

    navigate("/");
  }, [input]);

  async function submit(event: FormEvent) {
    event.preventDefault();

    submitUser();
  }

  const globalError = globalErrorMessage(error);

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
          required
          label="Name"
          value={input.name}
          error={hasError('name', error)}
          helperText={errorMessageFor('name', error)}
          onChange={onChange('name')} />

        <TextField
          required
          label="Email"
          type='email'
          value={input.email}
          error={hasError('email', error)}
          helperText={errorMessageFor('email', error)}
          onChange={onChange('email')} />

        <TextField
          required
          label="Password"
          value={input.password}
          type='password'
          error={hasError('password', error)}
          helperText={errorMessageFor('password', error)}
          onChange={onChange('password')} />

        <TextField
          required
          label="Confirm password"
          value={input.confirmPassword}
          type='password'
          error={hasError('confirmPassword', error)}
          helperText={errorMessageFor('confirmPassword', error)}
          onChange={onChange('confirmPassword')} />

        <TextField
          label="Gender"
          value={input.sex}
          select
          error={hasError('sex', error)}
          helperText={errorMessageFor('sex', error)}
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
          error={hasError('nationality', error)}
          helperText={errorMessageFor('nationality', error)}
          onChange={onChange('nationality')}>
          {componentState.availableEntities &&
            componentState.availableEntities.map((nationalityOptions: NationalityDTO) => (
              <MenuItem value={nationalityOptions.name} key={nationalityOptions.id}>
                {nationalityOptions.name}
              </MenuItem>
            ))}
        </TextField>

        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? <CircularProgress /> : 'Submit'}
        </Button>

        {globalError && <Typography color="secondary">{globalError}</Typography>}
      </form>
    </Container>
  );
}
