const express = require('express');
const multer = require('multer');
require('dotenv').config();
const app = express();
const port = process.env.EXPRESS_PORT || 9000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const cors = require('cors'); //midleware rest api backend to frontend
app.use(cors());

// upload file (image, video, etc..)
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
app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});
