import {
  Box,
  Card,
  Avatar,
  CardHeader,
  CardContent,
  Typography
} from "@mui/material";

import { useState, useEffect } from "react";

import { NationalityDTO } from "../models/Common/nationality.model";
import { formService } from "../services/formService";
import { ComponentState } from "../models/Components/componentState.interface";

import './userProfileInfo.css';

export function UserProfileInfo({ user }: any) {
  const [componentState, setComponentState] = useState<ComponentState<NationalityDTO, undefined>>({
    data: undefined,
    availableEntities: [],
    loading: true,
    error: undefined
  });

  const getNationalities = async () => {
    try {
      const nationalities = await formService.takeNationalities();

      setComponentState({ error: undefined, loading: false, data: undefined, availableEntities: nationalities });
    } catch (exception) {
      setComponentState({ ...componentState, loading: false, error: exception });
    }
  }

  useEffect(() => { getNationalities() }, []);

  return (
    <Box className='container'>
      <Card className='card'>
        <Box display='flex' flexDirection='row' alignItems='center' justifyItems='space-between'>
          <Avatar className='avatar' aria-label="recipe">
            {(user.name ? user.name : user.email).slice(0, 1).toLocaleUpperCase()}
          </Avatar>
          <CardHeader
            title={user.name}
            subheader={user.email}
          />
        </Box>
        <CardContent>
          <Typography aria-label="nationality">
            Nationality: {
            componentState.availableEntities
              .find(natioanlity => natioanlity.id === Number(user.nationality))?.name || 'unknown' }
          </Typography>
          <Typography aria-label="genre">
            Genre: {user.sex || 'unknown'}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}