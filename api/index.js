const express = require('express');
require(`dotenv`).config();
const app = express();
const port = process.env.EXPRESS_PORT || 9000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// routes
require('./routes/auth')(app);
require('./routes/users')(app);
require('./routes/posts')(app);
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
