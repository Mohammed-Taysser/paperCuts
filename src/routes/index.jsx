import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import AuthContext from '../context/auth';

import Homepage from '../pages/homepage';
import PageNotFound from '../pages/404';
import AboutUs from '../pages/about-us';
import ContactUs from '../pages/contact-us';
import Login from '../pages/login';
import Register from '../pages/register';
import ForgetPassword from '../pages/forget-password';
import Profile from '../pages/profile';
import Books from '../pages/books';
import BooksDetails from '../pages/booksDetails';
import Category from '../pages/category';
import CategoryDetails from '../pages/categoryDetails';
import Events from '../pages/events';
import EventsDetails from '../pages/eventDetails';

function PaperCutsRoutes() {
  const auth_context = useContext(AuthContext);
  const auth_routes = () => {
    if (auth_context.isAuth) {
      return (
        <>
          <Route path='/profile' element={<Profile />} />
          <Route path='/forget-password' element={<ForgetPassword />} />
        </>
      );
    }
  };
  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='*' element={<PageNotFound />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/contact-us' element={<ContactUs />} />
        {auth_routes()}
        <Route path='/books' element={<Books />} />
        <Route path='/books/:id' element={<BooksDetails />} />
        <Route path='/category' element={<Category />} />
        <Route path='/category/:id' element={<CategoryDetails />} />
        <Route path='/events/' element={<Events />} />
        <Route path='/events/:id' element={<EventsDetails />} />
      </Routes>
    </>
  );
}

export default PaperCutsRoutes;
