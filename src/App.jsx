import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainRoute from './routes';
import AuthContext from './context/auth';

function App() {
  useEffect(() => {
    window.onload = function () {
      document.body.classList.remove('load');
    };
  }, []);

  let is_auth_default = false,
    user_id_default = null;

  if (localStorage.getItem('auth') !== null) {
    const auth_localStorage = JSON.parse(localStorage.getItem('auth'));
    is_auth_default = auth_localStorage.isAuth;
    user_id_default = auth_localStorage.userId;
  }

  const [isAuth, setIsAuth] = useState(is_auth_default);
  const [userId, setUserId] = useState(user_id_default);
  const auth_context_data = { isAuth, userId, setIsAuth, setUserId };

  return (
    <AuthContext.Provider value={auth_context_data}>
      <BrowserRouter>
        <Navbar />
        <MainRoute />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
