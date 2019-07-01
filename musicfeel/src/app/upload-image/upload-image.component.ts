import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

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
  constructor(private cdRef:ChangeDetectorRef) { }

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
      
      console.log(this.selectedFile.src);
      this.cdRef.detectChanges();
      console.log(document.getElementById("userImage"));
      document.getElementById("userImage").style.width = "800px";
      (document.getElementById("userImage") as HTMLImageElement).src = this.selectedFile.src;
      this.onSuccess();

      /* this.imageService.uploadImage(this.selectedFile.file).subscribe(
        (res) => {
        
        },
        (err) => {
        
        }) */
    });

    reader.readAsDataURL(file);
  }
  /* onSubmit()
  {
    const formData = new FormData();
    formData.append('file', this.fileData);
    var image = document.getElementById("userImage")
    query
    /* this.http.post('url/to/your/api', formData)
      .subscribe(res => {
        console.log(res);
        alert('SUCCESS !!');
      }) 
  } */
}
