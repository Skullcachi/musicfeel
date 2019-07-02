const express = require("express");
const router = express.Router();

const upload = require('../services/file-upload');

const singleUpload = upload.single('image');

router.post('/', function(req, res) {

  singleUpload(req, res, function(err) {

    if (err) {
      return res.status(422).send({errors: [{title: 'File Upload Error', detail: err.message}] });
    }

    return res.json({'imageUrl': req.file.key});
  });
});

module.exports = router;
