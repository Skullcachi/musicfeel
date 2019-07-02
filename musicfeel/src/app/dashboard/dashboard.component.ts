import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from 'src/services/weather.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  getWeatherFunc;

  constructor(
    private weatherService:WeatherService,
		private route: Router
  ) { }

  ngOnInit() {
    this.getWeather();
  }

  ngAfterViewInit()
  {
    this.getWeatherFunc = setInterval(() => { this.getWeather(); }, 3000);
  }

  ngOnDestroy()
  {
    clearInterval(this.getWeatherFunc);
  }

  getWeather()
  {
    this.weatherService.getCurrentWeather().subscribe((res)=>{
      console.log(res["weather"]);
      let currentWeather = document.getElementById("weather-value");
      currentWeather.innerHTML = res["weather"];
    }, (err) => {
      console.log(err);
    });
  }

  uploadPhoto()
  {
    this.route.navigate(['uploadImage'])
  }
}
