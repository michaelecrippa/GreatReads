import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppHeader } from './components/appHeader';
import { AppFooter} from './components/appFooter';

import './App.css';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { Home } from './pages/home';

function App() {
  return (
    <BrowserRouter>
      <AppHeader/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
      </Routes>
      <AppFooter/>
    </BrowserRouter> 
  );
}

export default App;
