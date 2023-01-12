import React from 'react';

// public routes
export const Homepage = React.lazy(() => import('../pages/noAuth/homepage'));
export const PageNotFound = React.lazy(() => import('../pages/noAuth/404'));
export const AboutUs = React.lazy(() => import('../pages/noAuth/about-us'));
export const AuthorDetails = React.lazy(() =>
	import('../pages/noAuth/authorDetails')
);
export const Author = React.lazy(() => import('../pages/noAuth/authors'));
export const BooksDetails = React.lazy(() =>
	import('../pages/noAuth/bookDetails')
);
export const Books = React.lazy(() => import('../pages/noAuth/books'));
export const Category = React.lazy(() => import('../pages/noAuth/category'));
export const CategoryDetails = React.lazy(() =>
	import('../pages/noAuth/categoryDetails')
);
export const EventsDetails = React.lazy(() =>
	import('../pages/noAuth/eventDetails')
);
export const ContactUs = React.lazy(() => import('../pages/noAuth/contact-us'));
export const Events = React.lazy(() => import('../pages/noAuth/events'));
export const Login = React.lazy(() => import('../pages/noAuth/login'));
export const Register = React.lazy(() => import('../pages/noAuth/register'));

// auth Routes
export const Cart = React.lazy(() => import('../pages/needAuth/cart'));
export const Checkout = React.lazy(() => import('../pages/needAuth/checkout'));
export const OrderDetails = React.lazy(() =>
	import('../pages/needAuth/orderDetails')
);
export const Orders = React.lazy(() => import('../pages/needAuth/orders'));
export const Profile = React.lazy(() => import('../pages/needAuth/profile'));
export const Wishlist = React.lazy(() => import('../pages/needAuth/wishlist'));

export const PUBLIC_ROUTES = [
	{
		path: '*',
		component: PageNotFound,
	},
	{
		path: '/',
		component: Homepage,
	},
	{
		path: '/about-us',
		component: AboutUs,
	},
	{
		path: '/contact-us',
		component: ContactUs,
	},
	{
		path: '/login',
		component: Login,
	},
	{
		path: '/register',
		component: Register,
	},
	{
		path: '/books',
		component: Books,
	},
	{
		path: '/books/:slug',
		component: BooksDetails,
	},
	{
		path: '/category',
		component: Category,
	},
	{
		path: '/category/:slug',
		component: CategoryDetails,
	},
	{
		path: '/events',
		component: Events,
	},
	{
		path: '/events/:slug',
		component: EventsDetails,
	},
	{
		path: '/authors',
		component: Author,
	},
	{
		path: '/authors/:username',
		component: AuthorDetails,
	},
];

export const AUTH_ROUTES = [
	{
		path: '/profile',
		component: Profile,
	},
	{
		path: '/cart',
		component: Cart,
	},
	{
		path: '/wishlist',
		component: Wishlist,
	},
	{
		path: '/checkout',
		component: Checkout,
	},
	{
		path: '/orders',
		component: Orders,
	},
	{
		path: '/orders/:id',
		component: OrderDetails,
	},
];
