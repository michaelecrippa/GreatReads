import { 
  Box, 
  Card, 
  Avatar, 
  CardHeader, 
  CardMedia, 
  CardContent, 
  Typography 
} from "@mui/material"

export function UserProfileInfo({ user } : any) {
  return (
    <Box>
      <Card>
        <Box display='flex' flexDirection='row' alignItems='center' justifyItems='space-between'>
          <Avatar aria-label="recipe">
            {(user.name ? user.name : user.email).slice(0, 1).toLocaleUpperCase()}
          </Avatar>
          <CardHeader
            title={user.name}
            subheader={user.email}
          />
        </Box>
        <CardMedia/>
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