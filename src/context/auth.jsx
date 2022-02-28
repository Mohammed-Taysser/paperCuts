import React, { useState, createContext } from 'react';

const Context = createContext({
  isAuth: null,
  userId: null,
  setIsAuth: (data) => console.log(data),
  setUserId: (data) => console.log(data),
});

const AuthContext = (props) => {
  let default_is_auth = false,
    default_user_id = null;

  if (localStorage.getItem('auth') !== null) {
    const auth_localStorage = JSON.parse(localStorage.getItem('auth'));
    default_is_auth = auth_localStorage.isAuth;
    default_user_id = auth_localStorage.userId;
  }

  const [isAuth, setIsAuth] = useState(default_is_auth);
  const [userId, setUserId] = useState(default_user_id);
  const auth_context_data = { isAuth, userId, setIsAuth, setUserId };

  return (
    <Context.Provider value={auth_context_data}>
      {props.children}
    </Context.Provider>
  );
};

export default AuthContext;
export { Context };
