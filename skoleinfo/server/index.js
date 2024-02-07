const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static("build"));

app.get("/klubber.json", (req, res) => {
    res.sendFile(__dirname + "/build/klubber.js");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


//skibididididid dop yes yes