const express = require("express");
const cors = require('cors');
const app = express();
const http = require('http');

const { uploadRouter } = require('./uploadService/uploadRouter.js');

app.use(cors());
app.use(express.json());

app.use('/api/upload', uploadRouter);

app.use(errorHandler);

const server = http.createServer(app);

const PORT = 5000;

const start = async () => {
	try {
		server.listen(PORT, () => {
            console.log(`server started on port ${PORT}`);
        });
	} catch (err) {
		console.error(`Error on server startup: ${err.message}`);
	}
}


start();

function errorHandler(err, req, res, next) {
  console.error(err);
  if(err != null)
  {
    res.status(400).send({ message: err.message });
  }
  else
  {
    res.status(500).send({ message: 'Server error' });
  }
}
