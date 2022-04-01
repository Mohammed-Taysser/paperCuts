import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Context as AuthContext } from './context/auth';

import Homepage from './pages/noAuth/homepage';
import PageNotFound from './pages/noAuth/404';
import AboutUs from './pages/noAuth/about-us';
import ContactUs from './pages/noAuth/contact-us';
import Login from './pages/noAuth/login';
import Register from './pages/noAuth/register';
import ForgetPassword from './pages/noAuth/forget-password';
import Profile from './pages/needAuth/profile';
import Wishlist from './pages/needAuth/wishlist';
import Cart from './pages/needAuth/cart';
import Checkout from './pages/needAuth/checkout';
import Books from './pages/noAuth/books';
import BooksDetails from './pages/noAuth/bookDetails';
import Category from './pages/noAuth/category';
import CategoryDetails from './pages/noAuth/categoryDetails';
import Events from './pages/noAuth/events';
import EventsDetails from './pages/noAuth/eventDetails';
import Author from './pages/noAuth/authors';
import AuthorDetails from './pages/noAuth/authorDetails';
import Order from './pages/needAuth/orders';
import OrderDetails from './pages/needAuth/orderDetails';
import WebsitePages from './pages/noAuth/pages';

function PaperCutsRoutes() {
  const auth_context = useContext(AuthContext);
  const auth_routes = () => {
    if (auth_context.isAuth) {
      return (
        <>
          <Route path='/profile' element={<Profile />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/wishlist' element={<Wishlist />} />
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
        <Route path='/pages' element={<WebsitePages />} />
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
      </Routes>
    </>
  );
}

export default PaperCutsRoutes;
