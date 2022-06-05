import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import CreateBook from './dashboard/createBook';
import UpdateBook from './dashboard/updateBook';
import Cart from './pages/needAuth/cart';
import Checkout from './pages/needAuth/checkout';
import OrderDetails from './pages/needAuth/orderDetails';
import Order from './pages/needAuth/orders';
import Profile from './pages/needAuth/profile';
import Wishlist from './pages/needAuth/wishlist';
import PageNotFound from './pages/noAuth/404';
import AboutUs from './pages/noAuth/about-us';
import AuthorDetails from './pages/noAuth/authorDetails';
import Author from './pages/noAuth/authors';
import BooksDetails from './pages/noAuth/bookDetails';
import Books from './pages/noAuth/books';
import Category from './pages/noAuth/category';
import CategoryDetails from './pages/noAuth/categoryDetails';
import ContactUs from './pages/noAuth/contact-us';
import EventsDetails from './pages/noAuth/eventDetails';
import Events from './pages/noAuth/events';
import Homepage from './pages/noAuth/homepage';
import Login from './pages/noAuth/login';
import Register from './pages/noAuth/register';

function PaperCutsRoutes() {
	const { token } = useSelector((state) => state['auth']);

	const auth_routes = () => {
		if (token) {
			return (
				<>
					<Route path="/profile" element={<Profile />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/wishlist" element={<Wishlist />} />
					<Route path="/checkout" element={<Checkout />} />
					<Route path="/orders" element={<Order />} />
					<Route path="/orders/:id" element={<OrderDetails />} />
					<Route path="/create/book" element={<CreateBook />} />
					<Route path="/update/book/:slug" element={<UpdateBook />} />
				</>
			);
		}
	};
	return (
		<>
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="*" element={<PageNotFound />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/about-us" element={<AboutUs />} />
				<Route path="/contact-us" element={<ContactUs />} />
				{auth_routes()}
				<Route path="/books" element={<Books />} />
				<Route path="/books/:slug" element={<BooksDetails />} />
				<Route path="/category" element={<Category />} />
				<Route path="/category/:slug" element={<CategoryDetails />} />
				<Route path="/events/" element={<Events />} />
				<Route path="/events/:slug" element={<EventsDetails />} />
				<Route path="/authors" element={<Author />} />
				<Route path="/authors/:username" element={<AuthorDetails />} />
			</Routes>
		</>
	);
}

export default PaperCutsRoutes;
