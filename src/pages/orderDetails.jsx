import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { get_order_by_id, OrderAPI } from '../api/Localhost';
import Banner from '../components/Banner';
import { monthNames } from '../components/ManipulateData';
import useJsonServerToast from '../context/IsJsonServerDown';

function OrderDetails() {
  const { id } = useParams();
  const is_jsonServer_down = useContext(useJsonServerToast);
  const [currentOrder, setCurrentOrder] = useState(get_order_by_id(id));

  useEffect(() => {
    if (is_jsonServer_down) {
      setCurrentOrder(get_order_by_id(id));
    } else {
      api_get_order();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [is_jsonServer_down]);

  const api_get_order = async () => {
    await OrderAPI.get(`/${id}`)
      .then((response) => {
        setCurrentOrder(response.data);
      })
      .catch((error) => {
        setCurrentOrder(get_order_by_id(id));
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
    let cartItems = currentOrder.cartItems.map((item) => {
      return (
        <tr key={item.id}>
          <td className='text-center'>
            <span className='text-aurora'>{item.quantity}</span>
          </td>
          <td>{item.title}</td>
          <td> {`$${(item.quantity * item.price).toFixed(2)}`}</td>
        </tr>
      );
    });
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
                <span className='text-aurora'>
                  ${currentOrder.total.toFixed(2)}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const personal_table = () => {
    return (
      <div className='table-responsive'>
        <table className='table'>
          <tbody>
            <tr>
              <td>first name</td>
              <td>
                <span className=''>{currentOrder.firstName}</span>
              </td>
            </tr>
            <tr>
              <td>last name</td>
              <td>
                <span className=''>{currentOrder.lastName}</span>
              </td>
            </tr>
            <tr>
              <td>company name</td>
              <td>
                {currentOrder.companyName ? (
                  <span>{currentOrder.companyName}</span>
                ) : (
                  <span className='text-muted'>not provided</span>
                )}
              </td>
            </tr>
            <tr>
              <td>country</td>
              <td>
                <span className=''>{currentOrder.country}</span>
              </td>
            </tr>
            <tr>
              <td>address</td>
              <td>
                <span className=''>{currentOrder.address}</span>
              </td>
            </tr>

            <tr>
              <td>town</td>
              <td>
                {currentOrder.town ? (
                  <span>{currentOrder.town}</span>
                ) : (
                  <span className='text-muted'>not provided</span>
                )}
              </td>
            </tr>
            <tr>
              <td>state</td>
              <td>
                {currentOrder.state ? (
                  <span>{currentOrder.state}</span>
                ) : (
                  <span className='text-muted'>not provided</span>
                )}
              </td>
            </tr>
            <tr>
              <td>zip</td>
              <td>
                {currentOrder.zip ? (
                  <span>{currentOrder.zip}</span>
                ) : (
                  <span className='text-muted'>not provided</span>
                )}
              </td>
            </tr>
            <tr>
              <td>phone</td>
              <td>
                <span className=''>{currentOrder.phone}</span>
              </td>
            </tr>
            <tr>
              <td>email</td>
              <td>
                <span className=''>{currentOrder.email}</span>
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
            <tr>
              <td>payment method</td>
              <td>
                <span className=''>{currentOrder.paymentMethod}</span>
              </td>
            </tr>
            <tr>
              <td>order date</td>
              <td>
                <span className=''>{formatDate(currentOrder.date)}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
      <Banner title={`order#${currentOrder.id}`} subtitle='order details' />
      <section className='my-5 py-5'>
        <div className='container'>
          <OrderTable />
          <div className='my-3'>{personal_table()}</div>
        </div>
      </section>
    </>
  );
}

export default OrderDetails;
