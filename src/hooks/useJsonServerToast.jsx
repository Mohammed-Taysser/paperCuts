import React, { useState, useEffect } from 'react';
import Toast from '../components/bootstrap-component/Toast';
import useAxios from './useAxios';

function useJsonServerToast(initValue = true) {
  const [isDown, setIsDown] = useState(initValue);
  const { response } = useAxios();

  useEffect(() => {
    if (response !== null) {
      setIsDown(false);
    } else {
      setIsDown(true);
    }
  }, [response]);

  const toast = (
    <Toast>
      json-server is down, please make sure it's work.
      <span className='bg-aurora text-light'> any data are static </span>. You
      can't create, edit or delete unless it work. learn how to work with
      <a
        href='https://github.com/Mohammed-Taysser/react-learn-projects#json-server'
        className='mx-2'
      >
        Json-Server
      </a>
    </Toast>
  );

  return [isDown, toast];
}

export default useJsonServerToast;
