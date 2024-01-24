// Delete.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Delete() {
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

  const handleDelete = (elevID) => {
    axios
      .delete(`http://localhost:3001/api/deleteuser/${elevID}`)
      .then((response) => {
        console.log(response.data);
        getElevData();
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="table-container">
        <table className="styled-table">
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
            {elevData.map((elev) => (
              <tr key={elev.ElevID}>
                <td>{elev.ElevID}</td>
                <td>{elev.Fornavn}</td>
                <td>{elev.Etternavn}</td>
                <td>{elev.DatamaskinID}</td>
                <td>{elev.Hobby}</td>
                <td>{elev.Klasse}</td>
                <td>{elev.Kjonn}</td>
                <td>
                  <button onClick={() => handleDelete(elev.ElevID)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}