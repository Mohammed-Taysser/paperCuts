import React, {useContext} from 'react';
import { Routes, Route } from 'react-router-dom';

import AuthContext from '../context/auth';

import Homepage from '../pages/homepage';
import PageNotFound from '../pages/404';
import Login from '../pages/login';
import Register from '../pages/register';
import Profile from '../pages/profile';
import Books from '../pages/books';
import Search from '../pages/search';
import BooksDetails from '../pages/booksDetails';
import Category from '../pages/category';
import CategoryDetails from '../pages/categoryDetails';

function PaperCutsRoutes() {
  const auth_context = useContext(AuthContext);
  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='*' element={<PageNotFound />} />
        <Route path='/login' element={<Login />} />
        <Route path='/search' element={<Search />} />
        <Route path='/register' element={<Register />} />
        {
          auth_context.isAuth 
            ?  <Route path='/profile' element={<Profile />} />
            : null 
        }
        <Route path='/books' element={<Books />} />
        <Route path='/books/:id' element={<BooksDetails />} />
        <Route path='/category' element={<Category />} />
        <Route path='/category/:id' element={<CategoryDetails />} />
      </Routes>
    </>
  );
}

export default PaperCutsRoutes;
