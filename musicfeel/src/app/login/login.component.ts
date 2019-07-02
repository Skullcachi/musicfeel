import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/services/login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(
    private loginService: LoginService,
		private route: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['',[Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit()
  {
    if(this.loginForm.valid){
      let formData = this.loginForm.value;
      console.log(formData);
      this.loginService.login(formData.username, formData.password).subscribe((res)=>{
        console.log(res);
        console.log("User logged in succesfully.");
        this.route.navigate(["/dashboard"]);
      }, (err) => {
        console.log(err);
      });
    } else {
      alert('User form is not valid!!')
    }
  }
}
