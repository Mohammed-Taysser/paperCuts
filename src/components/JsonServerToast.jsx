import React from 'react';
import Toast from '../components/bootstrap-component/Toast';

function JsonServerToast() {
  return (
    <Toast>
      json-server is down, please insure it's work. learn how to work with
      <a href='#github'> json-server </a>
    </Toast>
  );
}

export default JsonServerToast;
