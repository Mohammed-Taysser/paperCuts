import React, { useState, createContext } from 'react';

const Context = createContext({
  coupons: null,
  setCoupons: (data) => console.log(data),
});

const CouponContext = (props) => {
  const [coupons, setCoupons] = useState(null);

  return (
    <Context.Provider value={{ coupons, setCoupons }}>
      {props.children}
    </Context.Provider>
  );
};

export default CouponContext;
export { Context };
