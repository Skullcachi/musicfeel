import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.css']
})
export class SpotifyComponent implements OnInit {

  constructor( 
    private route: Router,
		private router: ActivatedRoute) { }

  ngOnInit() {
    // http://localhost:4200/spotify#access_token=BQBwtQ9T2TIYR1zk1fI...&token_type=Bearer&expires_in=3600
    this.router.fragment.subscribe((hashString)=>{
      const spotParams = new URLSearchParams(hashString);
      console.log("Access Token: "+spotParams.get("access_token"));
      localStorage.setItem("access_token", spotParams.get("access_token"));
    });
  }

  uploadPhoto()
  {
    this.route.navigate(['uploadImage'])
  }
}
