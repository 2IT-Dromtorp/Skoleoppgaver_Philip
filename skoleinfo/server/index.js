const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const path = require("node:path")

app.use(express.static("build"));

app.get("/buss", (req, res) => {
    res.sendFile(path.resolve("./build/index.html"));
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  })

//gub hueuaddas