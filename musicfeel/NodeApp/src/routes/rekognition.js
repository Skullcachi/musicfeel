const AWS = require('aws-sdk');
const express = require('express');
const router = express.Router();
const jmespath = require('jmespath');

router.post('/', function(req, res, next) {

  var params = {
    Attributes: ["ALL"],
    Image: {
      S3Object: {
      Bucket: "musicfeel", 
      Name: req.body.name
      }
    }
  
  
  };
    AWS.config.update({region:'us-east-1'});
    var rekognition = new AWS.Rekognition();
    rekognition.detectFaces(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else{
      //console.log(data);           // successful response

      query = "FaceDetails[0].max_by(Emotions,&Confidence).Type"
      emotion = { emotion: jmespath.search(data, query)};

      res.send(emotion);}
  });

});


module.exports = router ;