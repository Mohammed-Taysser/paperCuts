import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { OrderAPI, ORDERS } from '../api/Localhost';
import Banner from '../components/Banner';
import { monthNames } from '../components/ManipulateData';
import Alert from '../components/bootstrap/Alert';
import Spinner from '../components/bootstrap/Spinner';
import OrdersImage from '../assets/images/background/orders.jpg';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api_get_category();
  }, []);

  const api_get_category = async () => {
    await OrderAPI.get('/')
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        setOrders(ORDERS);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const date_details = (date) => {
    let current_date = new Date(date);

    return `${current_date.getDay()} ${
      monthNames[current_date.getMonth()]
    } ${current_date.getFullYear()}`;
  };

  const time_details = (date) => {
    let current_date = new Date(date),
      hours = current_date.getHours(),
      minutes = current_date.getMinutes(),
      mid = 'am';

    if (hours === 0) {
      hours = 12;
    } else if (hours > 12) {
      hours = hours % 12;
      mid = 'pm';
    }

    return `${hours}:${minutes} ${mid}`;
  };

  const OrdersList = () => {
    if (orders.length > 0) {
      let orders_items = orders.map((order) => {
        return (
          <li key={order.id}>
            <span className='line'></span>
            <Link className='info text-white h5' to={`/orders/${order.id}`}>
              order#{order.id} with {order.total.toFixed(2)}$
            </Link>
            <div className='time'>
              <span>{date_details(order.date)}</span>
              <span>{time_details(order.date)}</span>
            </div>
          </li>
        );
      });
      return <ul>{orders_items}</ul>;
    }

    return <Alert> nor orders yet </Alert>;
  };

  return (
    <>
      <Banner title='orders' subtitle='your choices' />
      <section
        className='bg-aurora bg-with-overlay order-page'
        style={{ backgroundImage: `url(${OrdersImage})` }}
      >
        <div className='container py-5'>
          <div className='timeline-container my-5 py-5 mx-3 mx-md-0'>
            {loading ? <Spinner /> : <OrdersList />}
          </div>
        </div>
      </section>
    </>
  );
}

export default Orders;
