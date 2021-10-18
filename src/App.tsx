import React, { useState, useEffect } from "react";
import { getPayoutClaimed, getAllEvents } from "./api";
import "./App.css";

import { AllEventType } from "./types";

import EventList from "./components/EventList/EventList";

function App() {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<AllEventType[]>();

  useEffect(() => {
    setLoading(true);
    getAllEvents()
      .then((data) => setEvents(data as AllEventType[]))
      .then(() => setLoading(false));
  }, []);

  return (
    <div className="App">
      {loading && <h1>Loading</h1>}
      {!loading && (
        <div>
          <EventList eventList={events as AllEventType[]} />
          <h1>Not Loading</h1>
        </div>
      )}
    </div>
  );
}

export default App;
