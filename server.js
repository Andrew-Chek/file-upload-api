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

app.post("/uploads", upload.array("files"), (req, res) => {

    console.log(req.body);
    console.log(req.files);
    res.json({ message: "File(s) uploaded successfully" });

});

app.listen(5000, function(){
    console.log("Server running on port 5000");
});
