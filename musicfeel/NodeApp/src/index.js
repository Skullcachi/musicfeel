var AWS = require('aws-sdk');
var params = {
    Attributes: ["ALL"],
    Image: {
     S3Object: {
      Bucket: "musicfeel", 
      Name: "happy-girl-field.jpg"
     }
    }
   };
   AWS.config.update({region:'us-east-1'});
   var rekognition = new AWS.Rekognition();
   rekognition.detectFaces(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });