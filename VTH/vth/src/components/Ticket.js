import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Ticket({ addTicket }) {
  // Henter navigasjonsfunksjon fra React Router
  const navigate = useNavigate();
  // Setter opp lokal state for skjemadata
  const [formData, setFormData] = useState({
    emailTitle: '',
    title: '',
    problem: '',
  });

  // Håndterer endringer i skjemafeltene
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Håndterer innsending av skjemaet
  const handleSubmit = () => {
    // Validerer skjemadata før innsending
    if (!formData.emailTitle.trim() || !formData.problem.trim()) {
      alert("Feltene kan ikke være tomme");
      return;
    }

    // Sjekker om e-posttittelen inneholder gyldig e-postdomene
    const emailDomains = ['@gmail', '@yahoo', '@hotmail'];
    const includesValidEmailDomain = emailDomains.some((domain) =>
      formData.emailTitle.includes(domain)
    );

    if (!includesValidEmailDomain) {
      alert(
        "E-posttittelen må inkludere et gyldig e-postdomene (for eksempel @gmail.com, @yahoo.com, @hotmail.com)"
      );
      return;
    }

    // Legger til billetten i staten og tømmer skjemaet
    addTicket({
      emailTitle: formData.emailTitle,
      problem: formData.problem,
      status: 'Pending',
    });

    // setFormData({
    //   emailTitle: '',
    //   title: '',
    //   problem: '',
    // });

    // Navigerer til '/mytickets' etter en forsinkelse
    setTimeout(() => {
      navigate('/mytickets');
    }, 1000);
  };

  return (
    <>
      <div id='ticketcreation-container'>
        <div id='header'>
          <h1>Create a Ticket</h1>
        </div>
        <div id='form-container'>
          <div id='form'>
            {/* Skjemafelt for e-posttittel */}
            <textarea
              type='text'
              placeholder='Email Title'
              name='emailTitle'
              value={formData.emailTitle}
              onChange={handleInputChange}
            />
            {/* Skjemafelt for billettittel (ubrukt i koden) */}
            <textarea
              type='text'
              placeholder='Ticket Title'
              name='title'
              value={formData.title}
              onChange={handleInputChange}
            />
            {/* Skjemafelt for problembeskrivelse */}
            <textarea
              id='problem'
              type='text'
              placeholder='Explain the problem in detail'
              name='problem'
              value={formData.problem}
              onChange={handleInputChange}
            ></textarea>
            {/* Knapp for å sende inn billetten */}
            <button onClick={handleSubmit}>Send Ticket</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Ticket;