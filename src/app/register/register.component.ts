import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../shared/auth.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  email:string =''
  password:string= ''

  constructor(private auth : AuthService){}

  register(){
    if(this.email ==''){
      alert('please enter email')
    }
    if(this.password ==''){
      alert('please enter password')
    }

    this.auth.register(this.email,this.password)
    this.email=''
    this.password=''
  }

}
