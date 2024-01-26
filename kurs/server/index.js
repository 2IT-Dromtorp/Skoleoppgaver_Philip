const mysql = require('mysql2');
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
const POOL = mysql.createPool({
    host: 'localhost',
    user: 'kurs_admin',
    password: 'kurskurs',
    database: 'kurs_db'
});

app.post('/api/adduser', (req, res) => {
    let sql = "INSERT INTO users(email, password) VALUES(?, ?)";
    let values = [req.body.email, req.body.password];
    console.log("Adding new user");
    POOL.query(sql, values, function (err, result){
        if (err) throw err;
        else{
            console.log("User added successfully!");
            res.status(200).json({status: "S", message: "Ny bruker er opprettet"});
        }
    });
});

app.post('/api/login', (req, res) => {
    let sql = "select password from users where email = ?";
    POOL.query(sql, [req.body.email], function (err, result) {
        if (err) 
            throw err;
        else if (!result[0]) {
            console.log("No such user found");
            res.status(404).send({status: "E", message: "Finner ingen bruker med denne e-mailen"});
        } else {
            if (result[0].password === req.body.password){
                console.log("Login successful for "+req.body.email);
                res.status(200).json({status: "S", message: "Innlogging vellykket!"})
            }
        }
    })
});

app.post('/api/is_registered', (req, res) => {
    let sql = "select course_id from registrations where email = ? and course_id = ?";
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

app.post('/api/register', (req, res) => {
    let sql = "INSERT INTO registrations(email, course_id) VALUES(?, ?)";
    let values = [req.body.email, req.body.course_id];
    console.log("Påmelding");
    POOL.query(sql, values, function (err, result){
        if (err) throw err;
        else{
            console.log("Påmeldt!");
            res.status(200).json({status: "S", message: "Du er påmeldt kurset"});
        }
    });
});

app.post('/api/unregister', (req, res) => {
    let sql = "delete from registrations where email = ? and course_id = ?";
    let values = [req.body.email, req.body.course_id];
    console.log("Avmelding");
    POOL.query(sql, values, function (err, result){
        if (err) throw err;
        else{
            console.log("Avmeldt!");
            res.status(200).json({status: "S", message: "Du er avmeldt kurset"});
        }
    });
});



app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

app.use(express.static("build"));