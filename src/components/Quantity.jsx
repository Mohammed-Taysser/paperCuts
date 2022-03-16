import React, { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

function QuantityControlButton(props) {
  const [quantityNumber, setQuantityNumber] = useState(props.initQuantity);

  const onQuantityAdd = (evt) => {
    evt.preventDefault();
    if (quantityNumber >= 1) {
      let new_value = quantityNumber + 1;
      setQuantityNumber(new_value);
      props.onQuantityChange(new_value);
    }
  };

  const onQuantityMinus = (evt) => {
    evt.preventDefault();
    if (quantityNumber > 1) {
      let new_value = quantityNumber - 1;
      setQuantityNumber(new_value);
      props.onQuantityChange(new_value);
    }
  };

  return (
    <div className='d-flex align-items-center qty-container'>
      <button
        className='btn-qty btn-qty-down'
        onClick={onQuantityAdd}
        disabled={props.disabled}
      >
        <FaPlus />
      </button>
      <input
        className='form-qty'
        type='number'
        name='quantity'
        value={quantityNumber}
        readOnly
      />
      <button
        className='btn-qty btn-qty-up'
        onClick={onQuantityMinus}
        disabled={props.disabled}
      >
        <FaMinus />
      </button>
    </div>
  );
}

QuantityControlButton.defaultProps = {
  initQuantity: 1,
  disabled: false,
  onQuantityChange: (data) => {
    console.log(data);
  },
};

export default QuantityControlButton;
