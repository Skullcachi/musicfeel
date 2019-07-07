const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

//Importando Rutas

const fileRoute = require('./routes/file-upload');


app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Rutas 
app.use('/file-upload/', fileRoute);

//staticFiles
app.use(express.static(path.join(__dirname, 'public')));


app.listen(app.get('port'), () => {
    console.log('Server Working! on Port 3000');
});
