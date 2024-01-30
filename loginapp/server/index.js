const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static("build"));

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})

app.get('/:name', (req, res) => {
    let name = req.params.name;
    res.send(name)

    if (name === 'andreas') {
        res.redirect('https://pornhub.com')
    } else if (name === 'mattis') {
        res.redirect('https://github.com')
    }
  })