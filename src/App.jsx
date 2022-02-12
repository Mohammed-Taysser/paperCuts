import React, { useEffect } from 'react';
import logo from './assets/img/favicon.png';

function App() {
  useEffect(() => {
    window.onload = function () {
      document.body.classList.remove('load');
    };
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
        <button className='btn btn-success'>add</button>
        <button className='btn btn-aurora'>add</button>
        <button className='btn btn-primary'>add</button>
        <button className='btn btn-warning'>add</button>
      </header>
    </div>
  );
}

export default App;
