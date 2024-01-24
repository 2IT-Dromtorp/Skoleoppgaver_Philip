// Insert.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Insert() {
  const [elevData, setElevData] = useState([]);

  useEffect(() => {
    getElevData();
  }, []);

  const getElevData = () => {
    axios
      .get("http://localhost:3001/")
      .then((response) => {
        console.log(response.data);
        setElevData(response.data);
      })
      .catch((error) => console.log(error));
  };

  const addUser = () => {
    const ElevID = document.querySelector('input[placeholder="ElevID"]').value;
    const Fornavn = document.querySelector('input[placeholder="Fornavn"]').value;
    const Etternavn = document.querySelector('input[placeholder="Etternavn"]').value;
    const Klasse = document.querySelector('input[placeholder="Klasse"]').value;
    const Hobby = document.querySelector('input[placeholder="Hobby"]').value;
    const Kjonn = document.querySelector('input[placeholder="Kjønn"]').value;
    const DatamaskinID = document.querySelector('input[placeholder="DatamaskinID"]').value;

    const body = JSON.stringify({
      ElevID: ElevID,
      Fornavn: Fornavn,
      Etternavn: Etternavn,
      Klasse: Klasse,
      Hobby: Hobby,
      Kjonn: Kjonn,
      DatamaskinID: DatamaskinID
    });

    console.log(body);

    fetch("/api/adduser", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        getElevData();
      })
      .catch(error => console.error(error));
  };

  return (
    <>
      <div id="table-container">
        <table id="styled-table">
          <thead>
            <tr>
              <th>ElevID</th>
              <th>Fornavn</th>
              <th>Etternavn</th>
              <th>DatamaskinID</th>
              <th>Hobby</th>
              <th>Klasse</th>
              <th>Kjønn</th>
            </tr>
          </thead>
          <tbody>
            {elevData.map(elev => (
              <tr key={elev.ElevID}>
                <td>{elev.ElevID}</td>
                <td>{elev.Fornavn}</td>
                <td>{elev.Etternavn}</td>
                <td>{elev.DatamaskinID}</td>
                <td>{elev.Hobby}</td>
                <td>{elev.Klasse}</td>
                <td>{elev.Kjonn}</td>
              </tr>
            ))}
            <tr>
              <td><input type="text" placeholder="ElevID" /></td>
              <td><input type="text" placeholder="Fornavn" /></td>
              <td><input type="text" placeholder="Etternavn" /></td>
              <td><input type="text" placeholder="DatamaskinID" /></td>
              <td><input type="text" placeholder="Hobby" /></td>
              <td><input type="text" placeholder="Klasse" /></td>
              <td><input type="text" placeholder="Kjønn" /></td>
            </tr>
          </tbody>
          <button onClick={addUser}>Submit</button>
        </table>
      </div>
    </>
  );
}