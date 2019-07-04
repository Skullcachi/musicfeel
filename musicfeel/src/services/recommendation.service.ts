import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  apiURL: string = 'http://localhost:3000/';
	httpOptions: any;
  constructor(private httpClient: HttpClient) { }

  public getHistory(user_id)
  {
    console.log(user_id)
    this.httpOptions = {
			headers: new HttpHeaders({
			'Accept':  'application/json',
			'Content-Type': 'application/json'
			})
		};
    return this.httpClient.get(this.apiURL + 'getRecommendations/' + user_id, this.httpOptions)
    .pipe( catchError(this.handleError));
  }

  public storeRecommendation(recommendations)
  {
    this.httpOptions = {
			headers: new HttpHeaders({
			'Accept':  'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
			})
		};
    return this.httpClient.post(this.apiURL + 'insertRecommendation',
    {
      album : recommendations.album,
      external_url : recommendations.external_url,
      href : recommendations.href,
      name : recommendations.name,
      userid : recommendations.userid
    }, this.httpOptions)
    .pipe( catchError(this.handleError));
  }


  public getRecommendations(emotion, weather, access_token)
  {
    console.log(emotion);
    console.log(weather);
    console.log(access_token);
    let bearer = "Bearer " + access_token;
    this.httpOptions = {
			headers: new HttpHeaders({
        'Authorization' : bearer,
        'Accept':  'application/json',
        'Content-Type': 'application/json',
			})
    };
    
    let targets = this.calcularValor(emotion, weather);
    let targetsJson = {
      target_acousticness : targets[0],
      target_danceability : targets[1],
      target_instrumentalness : targets[2],
      target_tempo : targets[3],
      target_valence : targets[4]
    }
    let params = new HttpParams().set("target_acousticness",targets[0].toString())
    .set("target_danceability", targets[1].toString()) //Create new HttpParams
    .set("target_instrumentalness", targets[2].toString()) //Create new HttpParams
    .set("target_tempo", targets[3].toString()) //Create new HttpParams
    .set("target_valence", targets[4].toString()); //Create new HttpParams

    return this.httpClient.get("https://api.spotify.com/v1/recommendations?"
    + "target_acousticness="  + targetsJson.target_acousticness + "&"
    + "target_danceability="  + targetsJson.target_danceability + "&"
    + "target_instrumentalness="  + targetsJson.target_instrumentalness + "&"
    + "target_tempo="  + targetsJson.target_tempo + "&"
    + "target_valence="  + targetsJson.target_valence + "&"
    + "seed_artists=4NHQUGzhtTLFvgF5SZesLK" + "&"
    + "seed_genres=None" + "&"
    + "seed_tracks=0c6xIDDpzE81m2q797ordA"
    , this.httpOptions      
    )
    .pipe( catchError(this.handleError));
  }

  private generateRandomString(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
  
  private handleError(error: HttpErrorResponse) 
  {
    console.log(error);
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(error.error.error);
  };

  


 calcularValor(emotionP, weatherP){
  const emotionMatrix = 
  [[0, 90, 1, 0.1, 0],
  [0.2, 120, 0.7, 0.2, 0.1],
  [0.3, 120, 0, 0.3, 0.1],
  [0.1, 90, 0.6, 1, 0],
  [0.7, 150, 0.1, 1, 0.5],
  [0.5, 120, 0.9, 0.2, 0.7],
  [1, 150, 0.2, 1, 1]];
  
  
  const weatherMatrix = 
  [[0.2, 120, 0.9, 0.3, 0.3],
  [0, 150, 1, 0.5, 0.4],
  [0, 150, 1, 0.8, 0.1],
  [0.5, 90, 1, 0.4, 0.5],
  [0.3, 120, 0.6, 0.2, 0.3],
  [0.1, 90, 0.6, 0.2, 0.3],
  [0, 90, 0.6, 0.2, 0.3],
  [0.1, 90, 1, 0.2, 0.2],
  [0.2, 90, 0.8, 0.4, 0.2],
  [0.1, 90, 0.8, 0.3, 0.1],
  [0.2, 90, 0.8, 0.3, 0.2],
  [0.2, 90, 0.8, 0.2, 0.3],
  [0.6, 150, 0.8, 1, 0.7],
  [0, 120, 0.3, 1, 0.8],
  [1, 150, 0.2, 0, 0.9]];
  
  const emotion = {
      "SAD":0,
      "CONFUSED":1,
      "DISGUSTED":2,
      "ANGRY":3,
      "SURPRISED":4,
      "CALM":5,
      "HAPPY":6,
  };
  
  const weather = {
      "CLOUDS":0,
      "RAIN":1,
      "THUNDERSTORM":2,
      "SNOW":3,
      "DRIZZLE":4,
      "MIST":5,
      "SMOKE":6,
      "HAZE":7,
      "DUST":8,
      "FOG":9,
      "SAND":10,
      "ASH":11,
      "SQUALL":12,
      "TORNADO":13,
      "CLEAR":14
  };
    var Factores = [5];
    for(var i = 0; i<5;i++){
        Factores[i]=(emotionMatrix[emotion[emotionP.toUpperCase()]][i]+weatherMatrix[weather[weatherP.toUpperCase()]][i])/2;
    }
    return Factores;
}
}
