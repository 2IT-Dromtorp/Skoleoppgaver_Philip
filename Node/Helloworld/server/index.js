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

app.post('/api/addhobby', (req, res) => {
    let sql = "select Hobby from elev where ElevID = ? and Hobby = ?";
    let values = [req.body.email, req.body.course_id];
    POOL.query(sql, values, function (err, result) {
        if (err) 
            throw err;
        else if (!result[0]) {
            res.status(200).send({status: "S", is_registered: false, message: "Ikke påmeldt"});
        } else {
            res.status(200).json({status: "S", is_registered: true, message: "Påmeldt"});
        }
    })
});

app.get('/updateuser/:newhobby', (request, response, results) => {

    let newhobby = request.params.newhobby;
    console.log('Ny hobby ' + (newhobby));
    response.send('Ny hobby ' + (newhobby))
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});