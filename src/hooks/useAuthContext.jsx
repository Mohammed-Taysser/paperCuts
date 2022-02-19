import { useState } from 'react';

function useAuthContext() {
  let is_auth_default = false,
    user_id_default = null;

  if (localStorage.getItem('auth') !== null) {
    const auth_localStorage = JSON.parse(localStorage.getItem('auth'));
    is_auth_default = auth_localStorage.isAuth;
    user_id_default = auth_localStorage.userId;
  }

  const [isAuth, setIsAuth] = useState(is_auth_default);
  const [userId, setUserId] = useState(user_id_default);

  return { isAuth, userId, setIsAuth, setUserId };
}

export default useAuthContext;
