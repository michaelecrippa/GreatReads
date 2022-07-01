import { 
  Box, 
  Card, 
  Avatar, 
  CardHeader, 
  CardContent, 
  Typography 
} from "@mui/material"

import './userProfileInfo.css'

export function UserProfileInfo({ user } : any) {
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
            Nationality: {user.nationality || 'unknown'}
          </Typography>
          <Typography aria-label="genre">
            Genre: {user.sex || 'unknown'}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}