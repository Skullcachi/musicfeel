const express = require("express");
const router = express.Router();
const upload = require('../services/file-upload');

var IncomingForm = require('formidable').IncomingForm
const singleUpload = upload.single('image');

router.post('/', function(req, res) {
  console.log("photo service");
  singleUpload(req, res, function(err) {
        
    if (err) {
      return res.status(422).send({errors: [{title: 'File Upload Error', detail: err.message}] });
    }
    console.log("Response: " + res);
    return res.json(req.file.key);
  });
  



  
});

module.exports = router;
