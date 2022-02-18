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
import Cart from '../pages/cart';
import Checkout from '../pages/checkout';
import Books from '../pages/books';
import BooksDetails from '../pages/booksDetails';
import Category from '../pages/category';
import CategoryDetails from '../pages/categoryDetails';
import Events from '../pages/events';
import EventsDetails from '../pages/eventDetails';
import Author from '../pages/authors';
import AuthorDetails from '../pages/authorDetails';

function PaperCutsRoutes() {
  const auth_context = useContext(AuthContext);
  const auth_routes = () => {
    if (auth_context.isAuth) {
      return (
        <>
          <Route path='/profile' element={<Profile />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
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
        <Route path='/category/:title' element={<CategoryDetails />} />
        <Route path='/events/' element={<Events />} />
        <Route path='/events/:id' element={<EventsDetails />} />
        <Route path='/authors' element={<Author />} />
        <Route path='/authors/:id' element={<AuthorDetails />} />
      </Routes>
    </>
  );
}

export default PaperCutsRoutes;
