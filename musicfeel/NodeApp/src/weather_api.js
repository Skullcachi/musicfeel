const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const cors = require('cors');

const app = express();
let request = require('request');

//importando rutas

const apiRoutes = require('./routes/api');

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());
app.use(morgan('dev'));

//Rutas 
app.use('/', apiRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
  console.log('Server Working! on Port 3000');
});

/* let apiKey = '6156de6beb632dd9b55d2c4896990445';
let city = 'La Reforma';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    let weather = JSON.parse(body)
  //  let main = JSON.parse(weather.main)
    let message = `La temperatura es ${weather.main.temp} en ${weather.name} con clima ${weather.weather[0].main}!`;
    console.log(message);
  }
}); */
 