const express = require('express');
const multer = require('multer');
require('dotenv').config();
const app = express();
const port = process.env.EXPRESS_PORT || 5000;
const bodyParser = require('body-parser');
const path = require('path');
app.use(bodyParser.json());
const cors = require('cors'); //midleware using rest api backend to frontend
app.use(cors());
app.use('/images', express.static(path.join(__dirname, '/images')));
app.use('/backup', express.static(path.join(__dirname, '/backup')));

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'images');
	},
	filename: (req, file, cb) => {
		cb(null, req.body.name);
	},
});

const upload = multer({storage: storage});
app.post('/api/upload', upload.single('file'), (req, res) => {
	res.status(200).json('File has been uploaded');
});

// routes
require('./routes/auth')(app);
require('./routes/tags')(app);
require('./routes/categories')(app);
require('./routes/users')(app);
require('./routes/posts')(app);
require('./routes/comments')(app);
require('./routes/database')(app);

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});
