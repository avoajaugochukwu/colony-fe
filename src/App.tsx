import React, { useState, useEffect } from 'react';
import { getPayoutClaimed, getAllEvents } from './api'
import './App.css';

import {  AllEventsType } from "./types";

function App() {
  const [ loading, setLoading ] = useState(false)
  const [ events, setEvents ] = useState<AllEventsType | undefined>()

  
  useEffect(() => {
    setLoading(true)
    getAllEvents().then(data => setEvents(data)).then(() => setLoading(false))
  }, [])

  
  return (
    <div className="App">
      {loading && <h1>Loading</h1>}
      {!loading && <h1>Not Loading</h1>}
    </div>
  );
}

export default App;
