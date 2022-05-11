import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import MainRoute from './routes';
import AuthContext from './context/auth';
import CouponContext from './context/coupon';
import BackToTop from './components/standalone/BackToTop';

function App() {
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
          <BackToTop />
          <MainRoute />
          <Footer />
        </BrowserRouter>
      </CouponContext>
    </AuthContext>
  );
}

export default App;
