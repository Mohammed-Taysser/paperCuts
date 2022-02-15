import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import AuthContext from '../context/auth';

import Homepage from '../pages/homepage';
import PageNotFound from '../pages/404';
import AboutUs from '../pages/about-us';
import Login from '../pages/login';
import Register from '../pages/register';
import ForgetPassword from '../pages/forget-password';
import Profile from '../pages/profile';
import Books from '../pages/books';
import Search from '../pages/search';
import BooksDetails from '../pages/booksDetails';
import Category from '../pages/category';
import CategoryDetails from '../pages/categoryDetails';

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
        <Route path='/search' element={<Search />} />
        <Route path='/register' element={<Register />} />
        <Route path='/about-us' element={<AboutUs />} />
        {auth_routes()}
        <Route path='/books' element={<Books />} />
        <Route path='/books/:id' element={<BooksDetails />} />
        <Route path='/category' element={<Category />} />
        <Route path='/category/:id' element={<CategoryDetails />} />
      </Routes>
    </>
  );
}

export default PaperCutsRoutes;
