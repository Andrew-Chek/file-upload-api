const express = require("express");
const multer = require('multer');
const cors = require('cors');

const app = express();
app.use(cors());

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
})
  
const upload = multer({ storage: storage })

app.post("/uploadFiles", upload.array("files"), (req, res) => {

    console.log(req.files);
    res.json({ message: "File(s) uploaded successfully" });

});

app.get("/uploadedFiles", (req, res) => {

    const fs = require('fs');
    const path = require('path');

    const directoryPath = path.join(__dirname, 'uploads');

    fs.readdir(directoryPath, function (err, fileNames) {
        if (err) {
            return res.status(500).send('Unable to scan directory: ' + err);
        } 

        res.json({ fileNames });
    });

});

app.delete('deleteFiles', (req, res) => {
    
        const fs = require('fs');
        const path = require('path');
    
        const directoryPath = path.join(__dirname, 'uploads');
    
        fs.readdir(directoryPath, function (err, files) {
            if (err) {
                return res.status(500).send('Unable to scan directory: ' + err);
            } 
    
            files.forEach(function (file) {
                fs.unlinkSync(directoryPath + '/' + file);
            });
    
            res.json({ message: "Files deleted successfully" });
        });
});

app.listen(5000, function(){
    console.log("Server running on port 5000");
});
