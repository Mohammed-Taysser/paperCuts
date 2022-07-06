import React from 'react'
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Cart from '../pages/needAuth/cart';
import Checkout from '../pages/needAuth/checkout';
import OrderDetails from '../pages/needAuth/orderDetails';
import Order from '../pages/needAuth/orders';
import Profile from '../pages/needAuth/profile';
import Wishlist from '../pages/needAuth/wishlist';

function AuthRoutes() {
	const { isLoggedIn } = useSelector((state) => state['auth']);

	if (isLoggedIn) {
		return (
			<>
					<Route path="profile" element={<Profile />} />
					<Route path="cart" element={<Cart />} />
					<Route path="wishlist" element={<Wishlist />} />
					<Route path="checkout" element={<Checkout />} />
					<Route path="orders" element={<Order />} />
					<Route path="orders/:id" element={<OrderDetails />} />
			</>
		);
	}
}

export default AuthRoutes
