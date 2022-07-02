import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { AppHeader } from './components/appHeader';
import { AppFooter } from './components/appFooter';
import { useUserPreferences } from './hooks/useUserPreferences';
import { CurrentUserProvider } from './hooks/useCurrentUser';

import { ThemeProvider, createTheme, Box } from '@mui/material';

import './App.css';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { Book } from './pages/exploreBook';
import { UserProfile } from './pages/userProfile';
import { BookLibrary } from './pages/bookLibrary';
import { CreateBook } from './pages/createBook';

import { PrivateRoute } from './auth/privateRoute';
import { PublicRoute } from './auth/publicRoute';

const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#8bc34a',
      contrastText: '#000000',
    },
    secondary: {
      main: '#f2dc94',
    },
  },
  components: {
    MuiSvgIcon: {
      defaultProps: {
        color: 'action',
      }
    },
  }
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#09630c',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#b26500',
    },
  },
  components: {
    MuiSvgIcon: {
      defaultProps: {
        color: 'action',
      }
    },
  }
});


function App() {
  //TODO use theme
  // const { prefersDarkTheme } = useUserPreferences();

  return (
    <Box className='window'>
      <BrowserRouter>
        <CurrentUserProvider>
          {/*<ThemeProvider theme={ prefersDarkTheme ? darkTheme : lightTheme}>    */}
          <AppHeader />
          <Routes>
            <Route path='/' element={<PrivateRoute />} >
              <Route path='/book/:id' element={<Book />} />
              <Route path='/profile' element={<UserProfile />} />
              <Route path='/books' element={<BookLibrary />} />
              <Route path='/addBook' element={<CreateBook />} />
              <Route path="*" element={<Navigate to="/books" replace />} />
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
    </Box>
  );
}

export default App;
