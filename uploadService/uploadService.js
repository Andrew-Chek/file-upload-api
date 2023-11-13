const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
})
  
const upload = multer({ storage: storage })

const uploadFile = (req, res) => {
    const timeoutValue = parseInt(req.query.timeout, 10) || 5000; // Default timeout is 5000 milliseconds
    req.socket.server.timeout = timeoutValue;
    console.log(`Timeout value: ${timeoutValue}, ${req.socket.server.timeout}`);

    upload.array("files")(req, res, function (err) {
        if (err) {
            res.status(400).json({ message: 'Error uploading files' });
        }

        res.status(200).json({ message: 'Files uploaded successfully' });
    });
};

const deleteFile = (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.fileName);
    try {
        fs.unlinkSync(filePath);
        res.status(200).json({ message: 'File deleted successfully' });
    } catch(err) {
        res.status(400).json({ message: 'Error deleting file' });
    }
}

const getFileNames = (req, res) => {
    const path = __dirname + '/uploads/';
    try {
        const fileNames = fs.readdirSync(path);
        res.status(200).json({ fileNames: fileNames });
    } catch(err) {
        res.status(400).json({ message: 'Error getting file names' });
    }
}

module.exports = {
    uploadFile,
    deleteFile,
    getFileNames
}
