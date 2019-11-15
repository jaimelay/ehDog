import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Header from './components/Header';
import Routes from './routes'

function App() {
  return (
    <>
      <Header />
      <Routes />
    </>
  );
}

export default App;
