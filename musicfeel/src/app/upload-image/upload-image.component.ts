import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PhotoService } from 'src/services/photo.service';
import { Router } from '@angular/router';

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
    private route:Router) { }

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
  onSubmit()
  {
    this.photoService.upload(this.selectedFile2).subscribe((res)=>{
      console.log(res);
      console.log("image uploaded succesfully.");
      /* this.route.navigate(["/rekognition"]); */
      console.log("Obteniendo emociones");
      this.photoService.rekognition(res).subscribe((res)=>{
          console.log(res["emotion"]);
      }, (err) => {
        console.log(err);
      });
    }, (err) => {
      console.log(err);
    });
  }
}
