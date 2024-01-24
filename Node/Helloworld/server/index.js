const cors = require('cors');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const port = 3001;

app.use(cors());

app.use(express.json());

const POOL = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'dromtorp'
});

app.get('/', (request, response) => {
    POOL.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting database connection: ' + err.stack);
            response.status(500).send('Internal Server Error');
            return;
        }

        console.log('Connected to database as id ' + connection.threadId);

        connection.query('SELECT * FROM elev', function (error, results, fields) {
            if (error) {
                console.error('Error executing query: ' + error.stack);
                connection.release();
                response.status(500).send('Error executing query');
                return;
            }

            response.send(results);

            connection.release();
        });
    });
});

app.put('/api/updateuser/:elevID', (request, response) => {
    const elevID = request.params.elevID;
    let sql = "UPDATE elev SET Fornavn = ?, Etternavn = ?, DatamaskinID = ?, Klasse = ?, Hobby = ?, Kjonn = ? WHERE ElevID = ?";
    let values = [
        request.body.Fornavn,
        request.body.Etternavn,
        request.body.DatamaskinID,
        request.body.Klasse,
        request.body.Hobby,
        request.body.Kjonn,
        elevID
    ];

    POOL.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error updating user:", err);
            return response.status(500).json({ status: "E", message: "Error updating user", error: err.message });
        }

        console.log("User updated successfully!");
        response.status(200).json({ status: "S", message: "User updated successfully" });
    });
});