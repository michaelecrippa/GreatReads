import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppHeader } from './components/appHeader';
import { AppFooter } from './components/appFooter';
import { useUserPreferences } from './hooks/useUserPreferences';
import { CurrentUserProvider} from './hooks/useCurrentUser';

import { ThemeProvider } from '@mui/material';

import './App.css';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { Book } from './pages/exporeBook';
import { UserProfile } from './pages/userProfile';
import { BookLibrary } from './pages/bookLibrary';
import { CreateBook } from './pages/createBook';

import { PrivateRoute } from './auth/privateRoute';
import { PublicRoute } from './auth/publicRoute';

function App() {
  //TODO use theme
  //const { prefersDarkTheme } = useUserPreferences();

  return (
    <BrowserRouter>
      <CurrentUserProvider>
        {/* <ThemeProvider theme={outer}>    */}
        <AppHeader />
          <Routes>
            <Route path='/' element={<PrivateRoute />} >
              <Route path='/book/:id' element={<Book />} />
              <Route path='/profile' element={<UserProfile />} />
              <Route path='/book/:id' element={<BookLibrary />} />
              <Route path='/addBook' element={<CreateBook />} />
            </Route>
            <Route element={<PublicRoute />} >
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Route>
          </Routes>
        <AppFooter />
        {/* </ThemeProvider> */}
      </CurrentUserProvider>
    </BrowserRouter>
  );
}

export default App;
