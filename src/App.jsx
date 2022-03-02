import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import MainRoute from './routes';
import AuthContext from './context/auth';
import CouponContext from './context/coupon';
import IsJsonServerDownContext from './context/IsJsonServerDown';
import useJsonServerToast from './hooks/useJsonServerToast';

function App() {
  const [isDown, jsonServerToast] = useJsonServerToast();

  useEffect(() => {
    window.onload = function () {
      document.body.classList.remove('load');
    };
  }, []);

  return (
    <AuthContext>
      <CouponContext>
        <BrowserRouter>
          <Navbar />
          {isDown && jsonServerToast}
          <IsJsonServerDownContext.Provider value={isDown}>
            <MainRoute />
          </IsJsonServerDownContext.Provider>
          <Footer />
        </BrowserRouter>
      </CouponContext>
    </AuthContext>
  );
}

export default App;
