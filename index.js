const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8000;

app.use(cors());

var apiTFT = require("./src/routers/rt.api.tft");

apiTFT(app);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
