import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  registerUser(obj:any){
    return this.http.post('http://localhost:5000/users/register',obj);
  }

  loginUser(obj:any){
    return this.http.post('http://localhost:5000/users/login',obj);
  }

  getAllusers(){
    return this.http.get('http://localhost:5000/users/get');
  }


}
