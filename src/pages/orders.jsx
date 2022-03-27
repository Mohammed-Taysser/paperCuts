import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { OrderAPI, ORDERS } from '../api/Localhost';
import Banner from '../components/Banner';
import { Context as AuthContext } from '../context/auth';
import { monthNames } from '../components/ManipulateData';
import Alert from '../components/bootstrap/Alert';
import Spinner from '../components/bootstrap/Spinner';
import OrdersImage from '../assets/images/background/orders.jpg';

function Orders() {
  const auth_context = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api_get_orders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const api_get_orders = async () => {
    await OrderAPI.get(`?userId=${auth_context.userData.id}`)
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

  const getDate = (date) => {
    let current_date = new Date(date);

    return `${current_date.getDay()} ${
      monthNames[current_date.getMonth()]
    } ${current_date.getFullYear()}`;
  };

  const getTime = (date) => {
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

  const OrdersTable = () => {
    if (orders && orders.length > 0) {
      return (
        <div className='table-responsive'>
          <table className='table text-center'>
            <thead>
              <tr>
                <td className='text-center'>order id</td>
                <th scope='col'>total</th>
                <th scope='col'>date</th>
                <th scope='col'>items number</th>
              </tr>
            </thead>
            <tbody>
              <OrdersRow />
            </tbody>
          </table>
        </div>
      );
    } else {
      return <Alert> no orders yet </Alert>;
    }
  };

  const OrdersRow = () => {
    let orders_items = orders.map((order) => {
      return (
        <tr key={order.id}>
          <td>
            <Link className='h5' to={`/orders/${order.id}`}>
              #{order.id}
            </Link>
          </td>
          <td>
            <span>{order.total}$</span>
          </td>
          <td>
            <span>{getDate(order.date)}</span>
            <span className='mx-2'>{getTime(order.date)}</span>
          </td>
          <td>{order.cartItems.length}</td>
        </tr>
      );
    });

    return <>{orders_items}</>;
  };

  return (
    <>
      <Banner title='orders' subtitle='your choices' img={OrdersImage} />
      <section className='order-page'>
        <div className='container py-5'>
          <div className='timeline-container my-5 py-5 mx-3 mx-md-0'>
            {loading ? <Spinner /> : <OrdersTable />}
          </div>
        </div>
      </section>
    </>
  );
}

export default Orders;
