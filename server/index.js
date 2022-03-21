const express = require('express');
require(`dotenv`).config();
const app = express();
const port = 9000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
// routes
require(`./routes/auth`)(app);
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
