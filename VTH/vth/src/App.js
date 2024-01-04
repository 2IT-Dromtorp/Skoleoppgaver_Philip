import "./App.css"
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Mytickets from "./components/Mytickets";
import Ticket from "./components/Ticket";

const App = () => {
  // Lokal state for billettene
  const [tickets, setTickets] = useState([]);

  // Effekthåndterer for å hente lagrede billetter ved lasting av applikasjonen
  useEffect(() => {
    const storedTickets = JSON.parse(localStorage.getItem('tickets')) || [];
    setTickets(storedTickets);
  }, []);

  // Legger til en ny billett
  const addTicket = (ticket) => {
    setTickets((prevTickets) => {
      const updatedTickets = [...prevTickets, ticket];
      localStorage.setItem('tickets', JSON.stringify(updatedTickets));
      return updatedTickets;
    });
  };

  // Sletter en billett basert på indeksen
  const onDeleteTicket = (index) => {
    setTickets((prevTickets) => {
      const updatedTickets = prevTickets.filter((_, i) => i !== index);
      localStorage.setItem('tickets', JSON.stringify(updatedTickets));
      return updatedTickets;
    });
  };

  return (
    <div className="App">
      {/* Setter opp BrowserRouter for navigasjon */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<Home />} />
            {/* Route for å opprette en ny billett */}
            <Route
              path="/ticket"
              element={<Ticket addTicket={addTicket} />}
            />
            {/* Route for å vise eksisterende billetter */}
            <Route
              path="/mytickets"
              element={<Mytickets tickets={tickets} onDeleteTicket={onDeleteTicket} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;