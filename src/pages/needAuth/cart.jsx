import React, { useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsCheck2Circle } from 'react-icons/bs';
import {
  getAllAuthorCart,
  updateCartQuantity,
  deleteCartItem,
} from '../../api/cart.api';
import { useSelector, useDispatch } from 'react-redux';
import { calculateAmount } from '../../redux/features/cart.slice';
import Banner from '../../components/standalone/Banner';
import Quantity from '../../components/Quantity';
import CartCoupon from '../../components/CartCoupon';
import Alert from '../../components/bootstrap/Alert';
import usePageTitle from '../../hooks/usePageTitle';
import Spinner from '../../components/bootstrap/Spinner';

function Cart() {
  usePageTitle('Cart');
  const dispatch = useDispatch();
  const {
    discount,
    total: totalPay,
    shipping,
  } = useSelector((state) => state['cart']);
  const [isLoading, setIsLoading] = useState({ cart: true });
  const [isSaved, setIsSaved] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [loadingError, setLoadingError] = useState(null);

  useLayoutEffect(() => {
    api_get_cart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const api_get_cart = async () => {
    await getAllAuthorCart()
      .then((response) => {
        setCartItems(response.data);
        dispatch(calculateAmount(response.data));
      })
      .catch((error) => {
        setLoadingError({ cart: error.message });
      })
      .finally(() => {
        setIsLoading((load) => ({ ...load, cart: false }));
      });
  };

  const onQuantityChange = (quantity, cartId) => {
    setIsSaved({ ...isSaved, [cartId]: false });

    setIsLoading((load) => ({ ...load, [cartId]: true }));

    updateCartQuantity(cartId, quantity)
      .then((response) => {
        setIsSaved({ ...isSaved, [cartId]: true });

        const newCartItems = cartItems.map((item) =>
          item._id === cartId ? { ...item, quantity } : item
        );
        setCartItems(newCartItems);
        dispatch(calculateAmount(newCartItems));
      })
      .catch((error) => {
        setLoadingError(error.message);
      })
      .finally(() => {
        setIsLoading((load) => ({ ...load, [cartId]: false }));
      });
  };

  const delete_cart_api = (cartId) => {
    setIsLoading((load) => ({ ...load, [cartId]: true }));

    deleteCartItem(cartId)
      .then(() => {
        setCartItems(cartItems.filter((item) => item._id !== cartId));
      })
      .catch((error) => {
        setLoadingError(error.message);
      })
      .finally(() => {
        setIsLoading((load) => ({ ...load, [cartId]: false }));
      });

    // let items_without_book = { ...userCart.items };
    // delete items_without_book[bookId];
    // set_quantity_api(items_without_book, bookId);
  };

  const BooksTable = () => {
    let cart_items_rows = cartItems.map((item, index) => {
      return (
        <tr key={item._id}>
          <th scope="row">{index + 1}</th>
          <td className="td-title">
            <img
              src={item.image}
              alt={item.title}
              className="img-fluid"
              width={70}
              height={100}
            />
            <Link to={`/books/${item.slug}`} className="mx-2">
              {item.title}
            </Link>
          </td>
          <td className="td-price"> {item.price}$ </td>
          <td className="td-quantity">
            {isSaved[item._id] && (
              <small className="text-muted">
                <BsCheck2Circle className="h6 mb-1" /> updated
              </small>
            )}
            <Quantity
              loading={isLoading[item._id]}
              initQuantity={item.quantity}
              onQuantityChange={(quantity) =>
                onQuantityChange(quantity, item._id)
              }
            />
          </td>
          <td className="td-total">
            {(item.price * item.quantity).toFixed(2)}$
          </td>
          <td className="td-price'">
            <button
              className="btn-close"
              onClick={() => delete_cart_api(item._id)}
              type="button"
            ></button>
          </td>
        </tr>
      );
    });

    return (
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">book</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col" colSpan={2}>
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody>{cart_items_rows}</tbody>
        </table>
      </div>
    );
  };

  const BasketTable = () => {
    const total_to_pay = shipping + totalPay - discount;

    return (
      <div className="table-responsive">
        <table className="table">
          <tbody>
            <tr>
              <td>
                <h6>Subtotal</h6>
              </td>
              <td>
                <span> ${totalPay.toFixed(2)}</span>
              </td>
            </tr>
            <tr>
              <td>
                <h6>Shipping</h6>
              </td>
              <td>
                <span> Shipping Flat rate: ${shipping}</span>
              </td>
            </tr>
            <tr>
              <td>
                <h6>Total</h6>
              </td>
              <td>
                <span className="text-aurora">
                  $
                  {total_to_pay > 0 ? (
                    total_to_pay.toFixed(2)
                  ) : (
                    <>
                      <small className="text-decoration-line-through">
                        {(shipping + totalPay).toFixed(2)}
                      </small>
                      <strong>Free</strong>
                    </>
                  )}
                </span>
                {discount > 0 && (
                  <small className="text-warning ms-2">(-{discount})</small>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const Render = () => {
    if (isLoading.cart) {
      return <Spinner />;
    } else if (loadingError) {
      return <Alert>{loadingError.cart}</Alert>;
    } else if (cartItems && cartItems.length > 0) {
      return (
        <>
          <BooksTable />
          <CartCoupon />
          <div className="row">
            <div className="col-md-6">
              <div className="cart-total">
                <h2 className="my-3">Basket totals</h2>
                <BasketTable />
                <Link to="/checkout" className="btn btn-aurora btn-lg mt-4">
                  process to checkout
                </Link>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <Alert>
          no items added yet. see
          <Link to="/books" className="alert-link mx-1">
            books
          </Link>
          or
          <Link to="/category" className="alert-link mx-1">
            category
          </Link>
        </Alert>
      );
    }
  };

  return (
    <>
      <Banner title="cart" subtitle="info" />
      <section className="cart-page my-5 py-5">
        <div className="container">
          <Render />
        </div>
      </section>
    </>
  );
}

export default Cart;
