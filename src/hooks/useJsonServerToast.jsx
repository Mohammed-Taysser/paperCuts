import React, { useState, useEffect } from 'react';
import base_url from '../api/Localhost';
import Toast from '../components/bootstrap/Toast';

function useJsonServerToast(initValue = true) {
  const [isDown, setIsDown] = useState(initValue);

  useEffect(() => {
    api_send_request();
  }, []);

  const api_send_request = async () => {
    await base_url
      .get('/')
      .then((response) => {
        setIsDown(false);
      })
      .catch((error) => {
        setIsDown(true);
      });
  };

  const toast = (
    <Toast>
      json-server is down, please make sure it's work. You can't create, edit or
      delete unless it work. learn how to work with
      <a
        href='https://github.com/Mohammed-Taysser/paperCuts#json-server'
        className='mx-1'
        target='_blank'
        rel='noreferrer'
      >
        Json-Server
      </a>
    </Toast>
  );

  return [isDown, toast];
}

export default useJsonServerToast;
