import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import MainRoute from './routes';
import AuthContext from './context/auth';
import IsJsonServerDownContext from './context/IsJsonServerDown';
import useJsonServerToast from './hooks/useJsonServerToast';
import useAuthContext from './hooks/useAuthContext';

function App() {
  const [isDown, jsonServerToast] = useJsonServerToast();
  const auth_context_data = useAuthContext();

  useEffect(() => {
    window.onload = function () {
      document.body.classList.remove('load');
    };
  }, []);

  return (
    <AuthContext.Provider value={auth_context_data}>
      <BrowserRouter>
        <Navbar />
        {isDown && jsonServerToast}
        <IsJsonServerDownContext.Provider value={isDown}>
          <MainRoute />
        </IsJsonServerDownContext.Provider>
        <Footer />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
