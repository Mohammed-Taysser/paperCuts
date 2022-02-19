import React, { useState, useEffect } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

function QuantityControlButton(props) {
  const [quantityNumber, setQuantityNumber] = useState(1);

  useEffect(() => {
    props.onQuantityChange(quantityNumber);
  }, [quantityNumber]);

  const onQuantityAdd = (evt) => {
    evt.preventDefault();
    if (quantityNumber >= 1) {
      setQuantityNumber(quantityNumber + 1);
    }
  };

  const onQuantityMinus = (evt) => {
    evt.preventDefault();
    if (quantityNumber > 1) {
      setQuantityNumber(quantityNumber - 1);
    }
  };

  const onQuantityChange = (evt) => {
    setQuantityNumber(parseInt(evt.target.value, 10));
    props.onQuantityChange(quantityNumber);
    console.log(evt.target.value);
  };

  return (
    <div className='d-flex align-items-center qty-container'>
      <button className='btn-qty btn-qty-down' onClick={onQuantityAdd}>
        <FaPlus />
      </button>
      <input
        className='form-qty'
        type='number'
        name='quantity'
        value={quantityNumber}
        onChange={onQuantityChange}
      />
      <button className='btn-qty btn-qty-up' onClick={onQuantityMinus}>
        <FaMinus />
      </button>
    </div>
  );
}

QuantityControlButton.defaultProps = {
  onQuantityChange: (data) => {
    console.log(data);
  },
};

export default QuantityControlButton;
