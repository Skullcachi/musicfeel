import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PhotoService } from 'src/services/photo.service';
import { Router } from '@angular/router';
import { RecommendationService } from 'src/services/recommendation.service';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init'
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {

  selectedFile: ImageSnippet;
  selectedFile2: File;
  constructor(
    private cdRef:ChangeDetectorRef,
    private photoService:PhotoService,
    private route:Router,
    private recommendations:RecommendationService) { }

  ngOnInit() {
  }

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.selectedFile.pending = true;
      
      this.selectedFile2 = file;
      this.cdRef.detectChanges();
      console.log(document.getElementById("userImage"));
      document.getElementById("userImage").style.width = "800px";
      (document.getElementById("userImage") as HTMLImageElement).src = this.selectedFile.src;
      this.onSuccess();

    });

    reader.readAsDataURL(file);
  }
  isLoading = false;
  onSubmit()
  {
    this.isLoading = true;
    this.photoService.upload(this.selectedFile2).subscribe((res)=>{
      console.log(res);
      console.log("image uploaded succesfully.");
      /* this.route.navigate(["/rekognition"]); */
      console.log("Obteniendo emociones");
      this.photoService.rekognition(res).subscribe((res)=>{
          console.log(res["emotion"]);
          localStorage.setItem("emotion", res["emotion"]);
          console.log("Obteniendo recomendaciones");
          this.recommendations.getRecommendations(localStorage.getItem("emotion"), localStorage.getItem("weather"), localStorage.getItem("access_token")).subscribe((res) => {
            console.log("Recomendaciones" + res);
            let recommended = 
            {
              "name": res["tracks"]["0"].name,
              "external_url": res["tracks"]["0"].external_urls.spotify,
              "album": res["tracks"]["0"].album.album_type,
              "href": res["tracks"]["0"].href,
              "userid": localStorage.getItem("user_id")
            }
            console.log(recommended);
            this.recommendations.storeRecommendation(recommended).subscribe((res)=>{
              
            this.isLoading = true;
            this.route.navigate(["/dashboard"]);
            }, (err)=>{
              
                this.isLoading = false;
            })
          },
          (err) => {
            
            this.isLoading = false;
          });
      }, (err) => {
        this.isLoading = false;
        console.log(err);
      });
    }, (err) => {
      this.isLoading = false;
      console.log(err);
    });
  }

  
  back()
  {   
    this.route.navigate(['dashboard'])
  }
}
