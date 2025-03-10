import express from "express";
import "dotenv/config";
import "./script.js";
import cookieParser from "cookie-parser";

import routerUser from "./routes/routeUser.js";
import routerArtiste from "./routes/routeArtist.js";
import routerMouvement from "./routes/routeMouvement.js";
import routerOeuvre from "./routes/routeOeuvre.js";

const app = express();
const PORT = 3000;

// Middleware pour parser les requêtes JSON
app.use(express.json());
app.use(cookieParser());

app.use("/user", routerUser);
app.use("/artiste", routerArtiste);
app.use("/mouvement", routerMouvement);
app.use("/oeuvre", routerOeuvre);

//execution de server:
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
