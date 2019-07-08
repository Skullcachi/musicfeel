import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from 'src/services/weather.service';
import { RecommendationService } from 'src/services/recommendation.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  getWeatherFunc;

  SpotifyAPIEndpoint = environment.SpotifyAPIEndpoint;
  constructor(
    private weatherService:WeatherService,
    private recommendationService:RecommendationService,
		private route: Router
  ) { }

  ngOnInit() {
    this.getWeather();
    this.getHistory();
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
      localStorage.setItem("weather", res["weather"]);
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
      let response = res["recomendaciones"];
      console.log(res['recomendaciones']);
      if (response.length > 0)
      {
        let recommended = res['recomendaciones'];
        this.rows = recommended;
      }
      else
      {
        this.rows = [];
      }
    }, (err) => {
      console.log(err);
    });
  }

  uploadPhoto()
  {
    this.route.navigate(['uploadImage'])
  }

  rows = [];
  getRecommendations()
  {
    this.recommendationService.getHistory(localStorage.getItem("user_id")).subscribe((res)=> {
      console.log(res);
      let recommended = res[0];
      let cells = [];
      for(var i =0; i <= recommended.length - 1 ; i++){
        cells.push(recommended.id);
        cells.push(recommended.name);
        cells.push(recommended.emotion);
        cells.push(recommended.weather);
        cells.push(recommended.href);
        cells.push(recommended.external_url);
      }
      
      console.log("alskdfjl");
      this.rows.push(cells);
      console.log(this.rows);
    })
  }

  requestPermission()
  {
    window.open(`https://accounts.spotify.com/authorize?response_type=token&client_id=7c2e7bd93be84d6abd457e43f2152860&scope=user-read-private%20user-read-email&redirect_uri=${encodeURI(this.SpotifyAPIEndpoint)}spotify&state=${this.generateRandomString(16)}`, "_blank");

    /* this.recommendationService.getPermission().subscribe((res)=> {
      console.log(res);
    }, (err)=> {}); */
    /* var scopes = 'user-read-private user-read-email';
    window.location.replace('https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' + "7c2e7bd93be84d6abd457e43f2152860" +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' + encodeURIComponent("http://localhost:3000/spotify")); */
  }

  private generateRandomString(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  logOut()
  {
    localStorage.clear();    
    this.route.navigate(['login'])
  }
}
