import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/services/register.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private registerService:RegisterService,
    private formBuilder: FormBuilder,
		private route: Router,
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      username: ['',[Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit()
  {
    if(this.registerForm.valid){
      let formData = this.registerForm.value;
      console.log(formData);
      this.registerService.createUser(formData.username, formData.password, formData.name).subscribe((res)=>{
        console.log("User create succesfully.");
        this.route.navigate(["/login"]);
      }, (err) => {
        console.log(err);
      });
    } else {
      alert('User form is not valid!!')
    }
  }
}
