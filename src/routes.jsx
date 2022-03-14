import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Context as AuthContext } from './context/auth';

import Homepage from './pages/homepage';
import PageNotFound from './pages/404';
import AboutUs from './pages/about-us';
import ContactUs from './pages/contact-us';
import Login from './pages/login';
import Register from './pages/register';
import ForgetPassword from './pages/forget-password';
import Profile from './pages/profile';
import Cart from './pages/cart';
import Checkout from './pages/checkout';
import Books from './pages/books';
import BooksDetails from './pages/booksDetails';
import Category from './pages/category';
import CategoryDetails from './pages/categoryDetails';
import Events from './pages/events';
import EventsDetails from './pages/eventDetails';
import Author from './pages/authors';
import AuthorDetails from './pages/authorDetails';
import Order from './pages/orders';
import OrderDetails from './pages/orderDetails';
import Test from './pages/Test';

function PaperCutsRoutes() {
  const auth_context = useContext(AuthContext);
  const auth_routes = () => {
    if (auth_context.isAuth) {
      return (
        <>
          <Route path='/profile' element={<Profile />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/orders' element={<Order />} />
          <Route path='/orders/:id' element={<OrderDetails />} />
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
        <Route path='/books/:slug' element={<BooksDetails />} />
        <Route path='/category' element={<Category />} />
        <Route path='/category/:slug' element={<CategoryDetails />} />
        <Route path='/events/' element={<Events />} />
        <Route path='/events/:slug' element={<EventsDetails />} />
        <Route path='/authors' element={<Author />} />
        <Route path='/authors/:username' element={<AuthorDetails />} />
        <Route path='/forget-password' element={<ForgetPassword />} />
        <Route path='/test' element={<Test />} />
      </Routes>
    </>
  );
}

export default PaperCutsRoutes;
