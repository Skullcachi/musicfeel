var controller = {};

controller.get = (req, res) => {
    let request = require('request');

    let apiKey = '6156de6beb632dd9b55d2c4896990445';
    let city = 'La Reforma';
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    
    request(url, function (err, response, body) {
      if(err){
        console.log('error:', error);
      } else {
        let weatherBody = JSON.parse(body);
        weather = `${weatherBody.weather[0].main}`;
        console.log(weather);
        return res.status(200).send({weather})  
      }
    });
}

module.exports = controller;