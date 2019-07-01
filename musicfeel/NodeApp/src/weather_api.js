let request = require('request');

let apiKey = '6156de6beb632dd9b55d2c4896990445';
let city = 'La Reforma';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    let weather = JSON.parse(body)
    let message = `La temperatura es ${weather.main.temp} en ${weather.name}!`;
    console.log(message);
  }
});
 