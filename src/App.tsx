import React, { useState } from 'react';
// import { Routes, Route } from 'react-router-dom';
import MainRouter from '@/router/main';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='App'>
      <MainRouter />
    </div>
  );
}

export default App;
