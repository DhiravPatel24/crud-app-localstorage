import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import { Router } from '@angular/router';
import {GoogleAuthProvider} from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router:Router) {}

   //login 

   login(email: string, password:string){
    this.fireauth.signInWithEmailAndPassword(email,password).then(()=>{
      localStorage.setItem('token','true');
      this.router.navigate(['employee'])
    }, err=>{
      alert("Please Check Credentials Or Register")
      this.router.navigate(['login'])
    })
  }

  //register 

  register(email:string, password:string){
    this.fireauth.createUserWithEmailAndPassword(email,password).then(()=>{
      alert('Registration Successful')
      this.router.navigate(['login'])
    },err =>{
      alert(err.message)
      this.router.navigate(['register'])
    })
  }


  //signout 
  logout(){
    this.fireauth.signOut().then(()=>{
      localStorage.removeItem('token')
      this.router.navigate(['login'])
    }, err=>{
      alert(err.message)
    })
  }

  //sign in with google

  googleSignIn(){
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then((res)=>{
      this.router.navigate(['dashboard'])
      localStorage.setItem('token', JSON.stringify(res.user?.uid))

    },err=>{
      alert(err.message)
    })
  }




  // canActivate(): boolean {
  //   if (this.authService.canActivate()) { // Check if user is logged in (example method)
  //     return false; // Allow navigation
  //   } else {
  //     this.router.navigate(['login']); // Redirect to login page if not logged in
  //     return true; // Block navigation
  //   }
  // }

}
