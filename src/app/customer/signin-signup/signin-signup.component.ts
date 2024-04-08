import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { user } from '../../core/Model/object-model';
import { LoginSignupService } from '../../shared/services/login-signup.service';
import { zip } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signin-signup',
  standalone: true,
  imports: [CommonModule,RouterLink,HttpClientModule,ReactiveFormsModule,FormsModule],
  templateUrl: './signin-signup.component.html',
  styleUrl: './signin-signup.component.css'
})
export class SigninSignupComponent {
  regForm:boolean = false;
  signUpfrom!:FormGroup;
  signInfrom!:FormGroup;
  signUpSubmitted = false;
  href:string='';
  user_data:any;
  user_dto!:user;
  user_reg_data:any;
  signInFormValue:any={};




  constructor(private formBuilder:FormBuilder, private router:Router, 
    private logInService:LoginSignupService)
    {

    }

    ngOnInit():void{
      this.href=this.router.url;
      if(this.href=='/sign-up')
      {
        this.regForm=true;
      }
      if(this.href=='/sign-in')
      {
        this.regForm=false;
      }

      //grouping the signup form...
      this.signUpfrom = this.formBuilder.group({
        name:['',Validators.required],
        mobNumber:['',Validators.required],
        age:['',Validators.required],
        dob:['',Validators.required],
        email:['',Validators.required],
        password:['',Validators.required],
        addLine1:['',Validators.required],
        addLine2:['',Validators.required],
        city:['',Validators.required],
        state:['',Validators.required],
        zipcode:['',Validators.required],
        //language:['',Validators.required],
        //gender:['',Validators.required],
        aboutYou:['',Validators.required],
        agreetc:['',Validators.required],
        role:['',Validators.required],
      });
    }

    //here we returning controls of form
    get rf(){
      return this.signUpfrom.controls;
    }

    onSubmitSignUp(){
      this.signUpSubmitted=true;
      if(this.signUpfrom.invalid)
      {
        return ;
      }
      //if form is valid then all the data is stored in user_reg_data variable.. its any type..storing as object..
      this.user_reg_data=this.signUpfrom.value;
      this.user_dto = {

        // name: this.signUpfrom.value.name,
        // password: this.signUpfrom.value.password,
        // role: this.signUpfrom.value.role,
        // mobNumber: this.signUpfrom.value.mobNumber,
        // address: {
        //   id: 0,
        //   addLine1: this.signUpfrom.value.addLine1,
        //   addLine2: this.signUpfrom.value.addLine2,
        //   city: this.signUpfrom.value.city,
        //   state: this.signUpfrom.value.state,
        //   zipcode: this.signUpfrom.value.zipcode
        // },
        // email: this.signUpfrom.value.email,
        // dob: this.signUpfrom.value.dob,
        // agreetc: this.signUpfrom.value.agreetc,
        // age: this.signUpfrom.value.age,
        // aboutYou: this.signUpfrom.value.aboutYou
        // //gender:this.user_data.gender,
        // //language:this.user_data.language,



        aboutYou:this.user_reg_data.aboutYou,
        age:this.user_reg_data.age,
        agreetc:this.user_reg_data.agreetc,
        dob:this.user_reg_data.dob,
        email:this.user_reg_data.email,
        //gender:this.user_reg_data.gender,
        address:{
          id: 0,
          addLine1: this.user_reg_data.addLine1,
          addLine2: this.user_reg_data.addLine2,
          city: this.user_reg_data.city,
          state: this.user_reg_data.state,
          zipcode: this.user_reg_data.zipcode,
        },
        //language:this.user_reg_data.language,
        mobNumber:this.user_reg_data.mobNumber,
        name:this.user_reg_data.name,
        password:this.user_reg_data.password,
        role:this.user_reg_data.role
        
      }


      //after creating object firing Api
      console.log(this.user_dto);
      this.logInService.userRegister(this.user_dto).subscribe(
        data=>{
        alert("User Register Sucessful 0");
        //redirecting to login...
        console.log(data);
        this.router.navigateByUrl('/sign-in');
      }
      // error => {
      //   // Handle error (e.g., display error message)
      //   console.error('User registration failed:', error);
      // }
    )

    }

    onSubmitSignIn(){
      this.logInService.authLogin(this.signInFormValue.userEmail, this.signInFormValue.userPassword).subscribe(data=>{
        this.user_data = data;
        if(this.user_data.length ==1){
          if(this.user_data[0].role =="seller"){
            sessionStorage.setItem("user_session_id", this.user_data[0].id);
            sessionStorage.setItem("role", this.user_data[0].role);
            this.router.navigateByUrl('/seller-dashboard');
          }else if(this.user_data[0].role =="buyer"){
            sessionStorage.setItem("user_session_id", this.user_data[0].id);
            sessionStorage.setItem("role", this.user_data[0].role);
            this.router.navigateByUrl('/buyer-dashboard');
          }else{
            alert("Invalid login details");
          }
        }else{
          alert("Invalid")
        }
        console.log(this.user_data)
      }, error=>{
        console.log("My error", error)
      })
    }
}
