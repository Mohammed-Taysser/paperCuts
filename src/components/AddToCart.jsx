import React, { useEffect, useState } from 'react';
import { CartAPI, get_cart_by_id } from '../api/Localhost';
import { FiCheckCircle } from 'react-icons/fi';
import { RiErrorWarningFill } from 'react-icons/ri';
import Spinner from './bootstrap/Spinner';
import Quantity from './Quantity';

function AddToCart(props) {
  const { currentBook } = props;
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [cartItem, setCartItem] = useState(null);
  const [type, setType] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    init_get_cart_api();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const init_get_cart_api = () => {
    CartAPI.get(`/${currentBook.id}`)
      .then((response) => {
        if (response.data) {
          setQuantity(response.data.quantity);
          setType(response.data.type);
          setCartItem(response.data);
          set_message_by_type('success', '  In cart');
        }
      })
      .catch((error) => {
        let cart_item = get_cart_by_id(currentBook.id);
        if (cart_item) {
          setQuantity(cart_item.quantity);
          setCartItem(cart_item);
          set_message_by_type('success', '  In cart');
        } else {
          setCartItem(null);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const create_cart_item = () => {
    let item_data = {
      id: currentBook.id,
      quantity: quantity,
      title: currentBook.title,
      price: currentBook.price,
      image: currentBook.image,
      type: type === '' ? currentBook.types[0] : type,
    };

    setLoading(true);

    CartAPI.post(`/`, item_data)
      .then((response) => {
        setCartItem(response.data);
        set_message_by_type('success', 'Success: Added To Cart');
      })
      .catch((error) => {
        console.log(error);
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

  const set_quantity_api = () => {
    setLoading(true);
    CartAPI.patch(`/${currentBook.id}`, { quantity })
      .then((response) => {
        set_message_by_type('success');
      })
      .catch((error) => {
        console.log(error);
        set_message_by_type('error');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const set_type_api = () => {
    setLoading(true);
    CartAPI.patch(`/${currentBook.id}`, { type })
      .then((response) => {
        set_message_by_type('success', 'Success: Updated Type');
        setType(type);
      })
      .catch((error) => {
        console.log(error);
        set_message_by_type('error');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    if (cartItem) {
      if (quantity !== cartItem.quantity) {
        set_quantity_api();
      } else if (type !== cartItem.type && type !== '') {
        set_type_api();
      }
    } else {
      create_cart_item();
    }
    set_message_by_type('warn');
  };

  const onRemoveBtnClick = () => {
    setLoading(true);
    CartAPI.delete(`/${currentBook.id}`)
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

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <form onSubmit={onFormSubmit}>
        {message && (
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
        )}
        <select
          className='form-select w-auto'
          aria-label='choose book type'
          value={type}
          onChange={(evt) => setType(evt.target.value)}
        >
          {currentBook.types.map((option, index) => {
            return (
              <option value={option} key={index}>
                {option}
              </option>
            );
          })}
        </select>
        <div className='d-flex my-3'>
          <Quantity onQuantityChange={setQuantity} initQuantity={quantity} />
          <button className='btn btn-aurora mx-4'>
            {cartItem !== null ? 'Update' : 'Add To Cart'}
          </button>
          {cartItem && (
            <button
              className='btn btn-outline-danger'
              type='button'
              onClick={onRemoveBtnClick}
            >
              Remove
            </button>
          )}
        </div>
      </form>
    );
  }
}

export default AddToCart;
