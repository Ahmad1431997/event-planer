const express = require("express");

//Routes
const eventsRoutes = require("./routes/eventsRoutes");
//Creat App Instence
const app = express();

app.use(express.json());
//routes
app.use("/events", eventsRoutes);

const db = require("./db/models");
db.sequelize.sync({ alter: true });

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`The application is running on localhost: ${PORT}`);
});
