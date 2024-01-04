import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

function Mytickets({ tickets, onDeleteTicket }) {
  // Lokal state for rendrede billetter
  const [renderedTickets, setRenderedTickets] = useState([]);

  // Effekthåndterer for å oppdatere billettstatusene basert på lagrede verdier
  useEffect(() => {
    const storedStatuses = JSON.parse(localStorage.getItem('ticketStatuses')) || {};

    const updatedTickets = tickets.map((ticket) => ({
      ...ticket,
      status: storedStatuses[ticket.emailTitle] || 'Pending',
    }));

    setRenderedTickets(updatedTickets);
  }, [tickets]);

  // Håndterer endring av billettstatus
  const handleStatusChange = (index, newStatus) => {
    const updatedStatusTickets = renderedTickets.map((ticket, i) => {
      if (i === index) {
        const updatedTicket = {
          ...ticket,
          status: newStatus,
        };

        const updatedStatuses = {
          ...JSON.parse(localStorage.getItem('ticketStatuses')) || {},
          [ticket.emailTitle]: newStatus,
        };

        localStorage.setItem('ticketStatuses', JSON.stringify(updatedStatuses));

        return updatedTicket;
      }

      return ticket;
    });

    setRenderedTickets(updatedStatusTickets);
  };

  // Rendrer billettene
  const renderTickets = () => {
    return renderedTickets.map((ticket, index) => (
      <div key={index} id='ticketbox'>
        <div id='ticket-content'>
          <p>{ticket.emailTitle}</p>
          <span>{ticket.problem}</span>
          {/* Viser billettstatus */}
          <span id='status' className={`status-${ticket.status.toLowerCase()}`}>
            {ticket.status}
          </span>
        </div>
        <div id='ticketbox-footer'>
          <div>
            {/* Dropdown for å endre billettstatus */}
            <select
              id={`statusDropdown-${index}`}
              value={ticket.status}
              onChange={(e) => handleStatusChange(index, e.target.value)}
            >
              <option value='Pending'>Pending</option>
              <option value='Open'>Open</option>
              <option value='Solved'>Solved</option>
            </select>
          </div>
          {/* Knapp for å slette billetten */}
          <button onClick={() => onDeleteTicket(index)}>Delete</button>
        </div>
      </div>
    ));
  };

  return (
    <>
      <div id='mytickets-container'>
        {/* Lenke for å opprette ny billett */}
        <Link to='/ticket'>Create Ticket</Link>
        <div id='mytickets-grid'>{renderTickets()}</div>
      </div>
    </>
  );
}

export default Mytickets;