const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const cors = require('cors');

const app = express();

//Importando Rutas

const userRuotes = require('./routes/usuario');
const rekognitionRoute = require('./routes/rekognition');
const fileRoute = require('./routes/file-upload');


app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'dbapitestinstance.ckfmsq2mab92.us-east-2.rds.amazonaws.com',
    user: 'root',
    password: 'rootroot',
    port: 3306,
    database: 'musicFeelLocal'
    /* host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'musicFeelLocal' */
}, 'single'));

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Rutas 

const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);
app.use('/', userRuotes);
app.use('/rekognition/', rekognitionRoute);
app.use('/file-upload/', fileRoute);

//staticFiles
app.use(express.static(path.join(__dirname, 'public')));


app.listen(app.get('port'), () => {
    console.log('Server Working! on Port 3000');
});
