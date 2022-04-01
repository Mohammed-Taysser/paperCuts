import React, { useLayoutEffect, useState } from 'react';
import { CartAPI, get_cart_by_userId } from '../api/Localhost';
import { FiCheckCircle } from 'react-icons/fi';
import { BiEdit } from 'react-icons/bi';
import { BsCartPlus, BsCartDash } from 'react-icons/bs';
import { RiErrorWarningFill } from 'react-icons/ri';
import { SelectField } from './bootstrap/Form';
import Spinner from './bootstrap/Spinner';
import Quantity from './Quantity';

function AddToCart(props) {
  const { currentBook, userData } = props;
  const [loading, setLoading] = useState(true);
  const [bookType, setBookType] = useState('');
  const [bookQuantity, setBookQuantity] = useState(1);
  const [message, setMessage] = useState(null);
  const [userCart, setUserCart] = useState(null);
  const [currentCartBook, setCurrentCartBook] = useState(null);

  useLayoutEffect(() => {
    api_get_cart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const api_get_cart = () => {
    CartAPI.get(`?userId=${userData.id}`)
      .then((response) => {
        if (response.data.length === 1) {
          onCartItemsLoad(response.data[0]);
        }
      })
      .catch((error) => {
        let cart_items = get_cart_by_userId(userData.id);
        if (cart_items) {
          onCartItemsLoad(cart_items);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onCartItemsLoad = (response_data) => {
    setUserCart(response_data);
    if (response_data.items) {
      if (response_data.items[currentBook.id]) {
        setBookQuantity(response_data.items[currentBook.id].quantity);
        setBookType(response_data.items[currentBook.id].type);
        setCurrentCartBook(response_data.items[currentBook.id]);
        set_message_by_type('success', '  In cart');
      }
    }
  };

  const api_set_cart_item = (items) => {
    setLoading(true);

    CartAPI.patch(`/${userData.id}`, { items })
      .then((response) => {
        onCartItemsLoad(response.data);
      })
      .catch((error) => {
        set_message_by_type('error');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const set_message_by_type = (messageType, messageLabel = '') => {
    switch (messageType) {
      case 'success':
        setMessage({
          type: 'success',
          label: (
            <>
              <FiCheckCircle />
              {messageLabel ? messageLabel : ' Success: Quantity Updated.'}
            </>
          ),
        });
        break;
      case 'error':
        setMessage({
          type: 'danger',
          label: (
            <>
              <RiErrorWarningFill />
              {messageLabel ? messageLabel : ' Error: Something Goes Wrong.'}
            </>
          ),
        });
        break;

      case 'warn':
        setMessage({
          type: 'warning',
          label: (
            <>
              <RiErrorWarningFill />
              {messageLabel ? messageLabel : ' warning: Nothing Change.'}
            </>
          ),
        });
        break;

      default:
        break;
    }
  };

  const onAddToCartClick = () => {
    let item_data = {
        slug: currentBook.slug,
        quantity: bookQuantity,
        title: currentBook.title,
        price: currentBook.price,
        image: currentBook.image,
        type: bookType === '' ? currentBook.types[0] : bookType,
      },
      newCartItems = {
        ...userCart.items,
        [currentBook.id]: item_data,
      };

    api_set_cart_item(newCartItems);
  };

  const onUpdateCartBook = () => {
    if (
      bookQuantity !== currentCartBook.quantity ||
      bookType !== currentCartBook.type
    ) {
      let item_data = {
          ...currentCartBook,
          quantity: bookQuantity,
          type: bookType === '' ? currentBook.types[0] : bookType,
        },
        newCartItems = {
          ...userCart.items,
          [currentBook.id]: item_data,
        };
      api_set_cart_item(newCartItems);
    } else {
      set_message_by_type('warn');
    }
  };

  const onRemoveBtnClick = () => {
    setLoading(true);

    let newCartItems = { ...userCart.items };

    delete newCartItems[currentBook.id];

    CartAPI.patch(`/${userData.id}`, { items: newCartItems })
      .then((response) => {
        set_message_by_type('success', 'Success: Removed From Cart');
      })
      .catch((error) => {
        console.log(error);
        set_message_by_type('error');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const RenderMessageBox = () => {
    if (message) {
      return (
        <div
          className={`alert alert-${message.type} alert-dismissible fade show p-1 small`}
          role='alert'
        >
          {message.label}
          <button
            type='button'
            className='btn-close p-2 css-tooltip'
            data-tooltip='dismiss'
            data-bs-dismiss='alert'
            aria-label='Close'
            onClick={() => setMessage(null)}
          ></button>
        </div>
      );
    }
    return <></>;
  };

  const RenderAddToCartButton = () => {
    if (currentCartBook) {
      return (
        <>
          <button className='btn btn-aurora mx-4' onClick={onUpdateCartBook}>
            <BiEdit className='h5 m-0' /> Save
          </button>
          <button
            className='btn btn-outline-danger'
            type='button'
            onClick={onRemoveBtnClick}
          >
            <BsCartDash className='h5 m-0' /> Remove
          </button>
        </>
      );
    } else {
      return (
        <button className='btn btn-aurora mx-4' onClick={onAddToCartClick}>
          <BsCartPlus className='h5 m-0' /> Add To Cart
        </button>
      );
    }
  };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <form onSubmit={(evt) => evt.preventDefault()}>
        <RenderMessageBox />
        <SelectField
          className='w-auto'
          value={bookType}
          onChange={(evt) => setBookType(evt.target.value)}
          options={currentBook.types.map((option) => {
            return { value: option, label: option };
          })}
        />
        <div className='d-flex my-3'>
          <Quantity
            onQuantityChange={setBookQuantity}
            initQuantity={bookQuantity}
          />
          <RenderAddToCartButton />
        </div>
      </form>
    );
  }
}

export default AddToCart;
