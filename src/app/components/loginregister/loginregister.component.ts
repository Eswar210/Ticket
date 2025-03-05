import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-loginregister',
  standalone: false,
  templateUrl: './loginregister.component.html',
  styleUrl: './loginregister.component.css'
})
export class LoginregisterComponent {

  userName:any;
  email:any;
  password:any;
  role:any;
  
  constructor(private service:LoginService,private router:Router) { }
  
  registerNow(){
    let obj = {
      userName:this.userName,
      email:this.email,
      password:this.password,
      role:this.role
    }
    // console.log("Selected Role:", this.role); // Debugging - Check if role is updating

    this.service.registerUser(obj).subscribe((res) => {
      console.log(res);
      this.result = res;
      if (this.result['message'] == 'User created successfully') {
        Swal.fire({
          title: 'Success!',
          text: 'User Registered Successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          // Reset form after successful registration
          this.userName = '';
          this.email = '';
          this.password = '';
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: this.result['message'] || 'Something went wrong. Please try again.',
          icon: 'error',
          confirmButtonText: 'Try Again'
        });
      }
    }, (err) => {
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong. Please check your network or try again later.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
  }
result:any;
  loginNow(){
    let obj = {
      userName:this.userName,
      password:this.password
    }
    console.log(obj)
    this.service.loginUser(obj).subscribe((res) => {
      console.log(res);
      this.result = res;
      if (this.result['message'] == 'Login Successful') {
        Swal.fire({
          title: 'Success!',
          text: 'Login Successful!',
          icon: 'success',
          confirmButtonText: 'Proceed'
        }).then(() => {
          console.log(this.result.user.userName);
          if (this.result.user.role == 'EndUser') {
            this.router.navigateByUrl('/emp/home');
          } else if (this.result.user.role == 'Support') {
            this.router.navigateByUrl('/it/home');
          }
          sessionStorage.setItem('loggedin', JSON.stringify({ username: this.result.user.userName, id: this.result.user._id }));
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: this.result['message'] || 'Invalid credentials. Please try again.',
          icon: 'error',
          confirmButtonText: 'Try Again'
        });
      }
    }, (err) => {
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong. Please check your network or try again later.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
  }


}
