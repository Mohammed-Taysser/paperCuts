import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { get_order_by_id, OrderAPI } from '../../api/Localhost';
import { monthNames } from '../../components/ManipulateData';
import { Context as AuthContext } from '../../context/auth';
import Banner from '../../components/standalone/Banner';
import Spinner from '../../components/bootstrap/Spinner';
import Alert from '../../components/bootstrap/Alert';
import OrdersImage from '../../assets/images/background/orders.jpg';
import usePageTitle from '../../hooks/usePageTitle';

function OrderDetails() {
  const { id } = useParams();
  usePageTitle('Order #' + id);
  const auth_context = useContext(AuthContext);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api_get_order();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const api_get_order = async () => {
    await OrderAPI.get(`/${id}?userId=${auth_context.userData.id}`)
      .then((response) => {
        setCurrentOrder(response.data);
      })
      .catch((error) => {
        setCurrentOrder(get_order_by_id(id));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const time_details = (current_date) => {
    let hours = current_date.getHours(),
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

  const formatDate = (date) => {
    let current_date = new Date(date);

    return `${current_date.getDay()} ${
      monthNames[current_date.getMonth()]
    } ${current_date.getFullYear()} , ${time_details(current_date)}`;
  };

  const CartItemsRows = () => {
    let cartItems = [];

    for (const book in currentOrder.cartItems) {
      if (Object.hasOwnProperty.call(currentOrder.cartItems, book)) {
        let currentBook = currentOrder.cartItems[book];
        cartItems.push(
          <tr key={book}>
            <td className='text-center'>
              <span className='text-aurora'>{currentBook.quantity}</span>
            </td>
            <td>{currentBook.title}</td>
            <td>
              {`$${(currentBook.quantity * currentBook.price).toFixed(2)}`}
            </td>
          </tr>
        );
      }
    }

    return <>{cartItems}</>;
  };

  const OrderTable = () => {
    return (
      <div className='table-responsive'>
        <table className='table'>
          <thead>
            <tr>
              <td className='text-center'>quantity</td>
              <th scope='col'>Product</th>
              <th scope='col'>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <CartItemsRows />
            <tr>
              <td colSpan={2}>Total</td>
              <td>
                <span className='text-aurora'>${currentOrder.total}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const PersonalTable = () => {
    return (
      <div className='table-responsive my-3'>
        <table className='table'>
          <tbody>
            <tr>
              <td>first name</td>
              <td>
                <span>{currentOrder.firstName}</span>
              </td>
            </tr>
            <tr>
              <td>last name</td>
              <td>
                <span>{currentOrder.lastName}</span>
              </td>
            </tr>
            <tr>
              <td>country</td>
              <td>
                <span>{currentOrder.country}</span>
              </td>
            </tr>
            <tr>
              <td>address</td>
              <td>
                <span>{currentOrder.address}</span>
              </td>
            </tr>
            <tr>
              <td>phone</td>
              <td>
                <span>{currentOrder.phone}</span>
              </td>
            </tr>
            <tr>
              <td>email</td>
              <td>
                <span>{currentOrder.email}</span>
              </td>
            </tr>
            <tr>
              <td style={{ minWidth: '180px' }}>payment method</td>
              <td>
                <span>{currentOrder.paymentMethod}</span>
              </td>
            </tr>
            <tr>
              <td>order date</td>
              <td>
                <span className=''>{formatDate(currentOrder.date)}</span>
              </td>
            </tr>
            <tr>
              <td>additional notes</td>
              <td>
                {currentOrder.additionalNote ? (
                  <span>{currentOrder.additionalNote}</span>
                ) : (
                  <span className='text-muted'>not provided</span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const Render = () => {
    if (currentOrder) {
      return (
        <>
          <PersonalTable />
          <OrderTable />
        </>
      );
    } else {
      return <Alert>no order found</Alert>;
    }
  };

  return (
    <>
      <Banner
        title={currentOrder ? `order#${currentOrder.id}` : 'order details'}
        subtitle='order details'
        img={OrdersImage}
      />
      <section className='my-5 py-5'>
        <div className='container'>{loading ? <Spinner /> : <Render />}</div>
      </section>
    </>
  );
}

export default OrderDetails;
