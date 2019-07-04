import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from 'src/services/weather.service';
import { RecommendationService } from 'src/services/recommendation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  getWeatherFunc;

  constructor(
    private weatherService:WeatherService,
    private recommendationService:RecommendationService,
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
  getHistory()
  {
    let user_id = localStorage.getItem("user_id");
    this.recommendationService.getHistory(user_id).subscribe((res)=>{
      
    }, (err) => {
      console.log(err);
    });
  }

  uploadPhoto()
  {
    this.route.navigate(['uploadImage'])
  }

  requestPermission()
  {
    var scopes = 'user-read-private user-read-email';
    window.location.replace('https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' + "7c2e7bd93be84d6abd457e43f2152860" +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' + encodeURIComponent("http://localhost:3000/spotify"));
  }
}
