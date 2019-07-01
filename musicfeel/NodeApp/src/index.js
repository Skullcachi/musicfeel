<<<<<<< HEAD
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
=======
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const cors = require('cors');


const app = express();
var cors = require('cors');

//Importando Rutas

const userRuotes = require('./routes/usuario');


app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'musicFeelLocal'
}, 'single'));

app.use(cors());

app.use(express.urlencoded({extended: false}));

//Rutas 
app.use('/', userRuotes);

//staticFiles
app.use(express.static(path.join(__dirname, 'public')));


app.listen(app.get('port'), () => {
    console.log('Server Working! on Port 3000');
});
>>>>>>> master
