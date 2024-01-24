// Update.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

const Update = () => {
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

  const handleInputChange = (e, elevID, field) => {
    setElevData((prevData) =>
      prevData.map((elev) =>
        elev.ElevID === elevID ? { ...elev, [field]: e.target.value } : elev
      )
    );
  };

  const handleUpdate = (elevID, updatedFields) => {
    axios
      .put(`http://localhost:3001/api/updateuser/${elevID}`, updatedFields)
      .then((response) => {
        console.log(response.data);
        getElevData();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
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
            {elevData.map((elev) => (
              <tr key={elev.ElevID}>
                <td>{elev.ElevID}</td>
                <td>
                  <input
                    type="text"
                    value={elev.Fornavn}
                    onChange={(e) => handleInputChange(e, elev.ElevID, "Fornavn")}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={elev.Etternavn}
                    onChange={(e) => handleInputChange(e, elev.ElevID, "Etternavn")}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={elev.DatamaskinID}
                    onChange={(e) => handleInputChange(e, elev.ElevID, "DatamaskinID")}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={elev.Hobby}
                    onChange={(e) => handleInputChange(e, elev.ElevID, "Hobby")}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={elev.Klasse}
                    onChange={(e) => handleInputChange(e, elev.ElevID, "Klasse")}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={elev.Kjonn}
                    onChange={(e) => handleInputChange(e, elev.ElevID, "Kjonn")}
                  />
                </td>
                <td>
                  <button
                    onClick={() =>
                      handleUpdate(
                        elev.ElevID,
                        {
                          Fornavn: elev.Fornavn,
                          Etternavn: elev.Etternavn,
                          Klasse: elev.Klasse,
                          Hobby: elev.Hobby,
                          Kjonn: elev.Kjonn,
                          DatamaskinID: elev.DatamaskinID
                        }
                      )
                    }
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Update;