const express = require("express");
require("dotenv").config();
const routerArtiste = require("./routes/routeArtist.js");
const routerMouvement = require("./routes/routeMouvement.js");
const routerOeuvre = require("./routes/routeOeuvre.js");
const app = express();
const port = 3000;
// Middleware pour parser les requêtes JSON
app.use(express.json());
app.use("/artiste", routerArtiste);
app.use("/mouvement", routerMouvement);

app.use("/oeuvre", routerOeuvre);
//execution de server:
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
