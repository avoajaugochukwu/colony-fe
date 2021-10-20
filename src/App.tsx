import React, { useState, useEffect } from "react";
import { getAllEvents } from "./api";
import "./App.css";

import { AllEventType } from "./types";

import EventsList from "./components/EventsList/EventsList";

function App() {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<AllEventType[]>([] as AllEventType[]);

  useEffect(() => {
    setLoading(true);
    getAllEvents()
      .then((data) => setEvents(data))
      .then(() => setLoading(false));
  }, []);

  return (
    <div className="App">
      <div className="App-header" />

      {loading && <h1 className="Loading">Loading...</h1>}
      {!loading && (
        <div>
          <EventsList eventList={events} />
        </div>
      )}
      
      <div className="App-header" />
    </div>
  );
}

export default App;
