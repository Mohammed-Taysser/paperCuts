import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import MainRoute from './routes';
import AuthContext from './context/auth';
import BackToTop from './components/standalone/BackToTop';

function App() {
  useEffect(() => {
    window.onload = function () {
      document.body.classList.remove('load');
    };
  }, []);

  return (
    <Provider store={store}>
      <AuthContext>
        <BrowserRouter>
          <Navbar />
          <BackToTop />
          <MainRoute />
          <Footer />
        </BrowserRouter>
      </AuthContext>
    </Provider>
  );
}

export default App;
