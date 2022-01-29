//requires for express/dbconnection/routes
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

//declaring port numbers
const PORT = process.env.PORT || 3001;

//declare app variable for express
const app = express();

//app.use for urlencoded and json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//.use for routes
app.use(routes);

//database connection
db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });