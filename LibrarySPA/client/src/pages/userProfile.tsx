import { AppBar, Tabs, Tab } from "@mui/material"; 

import { useState } from "react";
import { TabPanel } from "../components/TabPanel";

import { useCurrentUser } from "../hooks/useCurrentUser";
import { UserProfileInfo} from '../components/userProfileInfo';
import { BookLibrary } from '../pages/bookLibrary';

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export function UserProfile() {
  const [value, setValue] = useState(0);
  const currentUser = useCurrentUser();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static" color='secondary'>
        <Tabs value={value} onChange={handleChange} aria-label="profile-tabs">
          <Tab label="My Profile" {...a11yProps(0)} />
          <Tab label="Liked Books" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {currentUser && <UserProfileInfo user={currentUser} />}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {currentUser?.id && <BookLibrary id={currentUser?.id} />}
      </TabPanel>
    </div>
  );
}
