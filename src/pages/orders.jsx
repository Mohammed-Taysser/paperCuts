import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { OrderAPI, ORDERS } from '../api/Localhost';
import Banner from '../components/Banner';
import { monthNames } from '../components/ManipulateData';
import useJsonServerToast from '../context/IsJsonServerDown';
import OrdersImage from '../assets/img/background/orders.jpg';

function Orders() {
  const is_jsonServer_down = useContext(useJsonServerToast);
  const [orders, setOrders] = useState(ORDERS);

  useEffect(() => {
    if (is_jsonServer_down) {
      setOrders(ORDERS);
    } else {
      api_get_category();
    }
  }, [is_jsonServer_down]);

  const api_get_category = async () => {
    await OrderAPI.get('/')
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        setOrders(ORDERS);
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

  const orders_items = () => {
    if (orders.length === 0) {
      return <> nor orders yet </>;
    }
    return orders.map((order) => {
      return (
        <li key={order.id}>
          <span className='line'></span>
          <Link className='info text-white' to={`/orders/${order.id}`}>
            order#{order.id} with {order.total}$
          </Link>
          <div className='time'>
            <span>{date_details(order.date)}</span>
            <span>{time_details(order.date)}</span>
          </div>
        </li>
      );
    });
  };

  return (
    <>
      <Banner title='orders' subtitle='your choices' />
      <section
        className='bg-aurora bg-with-overlay order-page'
        style={{ backgroundImage: `url(${OrdersImage})` }}
      >
        <div className='container py-5 my-5'>
          <div className='timeline-container my-5 py-5 mx-3 mx-md-0'>
            <ul>{orders_items()}</ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default Orders;
