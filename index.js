const express = require("express");
const app = express();
const PORT = 3027;

app.use(express.json());

app.listen(PORT, console.log(`Listening on port ${PORT}`));
