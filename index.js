//déclaration des modules
const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const config = require("./config");
const passportJWT = require("./middlewares/passportJWT")();
const errorHandler = require("./middlewares/errorHandler");
const app = express();
//déclaration des routes
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const followRoutes = require("./routes/follow");

app.use(cors());

/* app.enable("trust proxy");
const limiter = rateLimit({
  windowMs: 10 * 1000, // 10 secondes
  max: 5 // limit each IP to 5 requests per windowMs
});
 
//  apply to all requests
app.use(limiter); */

mongoose.Promise = global.Promise;

//connexion à la BD
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//Utilisation des routes et des autres modules
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(passportJWT.initialize());
app.use(errorHandler);

app.use("/api/post", passportJWT.authenticate(), postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/follow", passportJWT.authenticate(), followRoutes);

//configuration du serveur
app.listen(config.port, () => {
  console.log("Le serveur est démarré");
});
