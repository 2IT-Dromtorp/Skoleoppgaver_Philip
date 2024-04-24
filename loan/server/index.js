const express = require('express')

const app = express()
const port = process.env.PORT || 8080

app.use(express.static("build"));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 'passord123';
const someOtherPlaintextPassword = 'somerandompassword';

app.get('/testbcrypt', (request, response) => {

    bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
    });

    response.send('Vi tester bcrypt');
})

app.get('/checkpassword', (request, response) => {
    bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
        if (result) {
            // passwords match
            response.send('Passwords match');
        } else {
            // passwords do not match
            response.send('Passwords do not match');
        }
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})