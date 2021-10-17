import React, { useState, useEffect } from 'react';
import { getPayoutClaimed } from './api'
import './App.css';

function App() {
  useEffect(() => {
    getPayoutClaimed()
  })
  return (
    <div className="App">

    </div>
  );
}

export default App;
