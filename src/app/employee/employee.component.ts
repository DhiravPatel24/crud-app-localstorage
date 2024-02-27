import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { AuthService } from '../shared/auth.service';



@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [NgIf,NgFor,MatToolbarModule, MatIconModule, MatButtonModule, MatInputModule, MatDialogModule, MatFormFieldModule , MatDatepickerModule, MatNativeDateModule , MatRadioModule, MatSelectModule, ReactiveFormsModule,MatTableModule], 
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit{

  empForm:FormGroup;

  empDetails:any[]=[];

  emp:any={
    firstName:'',
    lastName:"",
    email:'',
    dob:'',
    gender:'',
    education:'',
    company:'',
    experience:'',
    package:'',
  }
 
  localresult : string|null =''

  empresult : any[] = []

  showForm:boolean = false

  id=0

  isUpdateMode: boolean = false;

  education:string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate'
  ]

  displayedColumns: any[] = ['firstName', 'lastName', 'email', 'dob','gender', 'education', 'company', 'experience','package','Operations'];
  dataSource = this.empDetails;
  
  constructor(private _fb:FormBuilder, private auth:AuthService){
    this.empForm = this._fb.group({
      // id:this.id,
      firstName:'',
      lastName:"",
      email:'',
      dob:'',
      gender:'',
      education:'',
      company:'',
      experience:'',
      package:'',
    })
  }
  ngOnInit(){
    this.localresult = localStorage.getItem('empresult')
    if(this.localresult!==null)
      this.empDetails= JSON.parse(this.localresult)
  }

  onFormSubmit(){
    if(this.empForm.valid  ){
      // console.log(this.empForm.value)

      const newEmpData = { id: this.getNextId(), ...this.empForm.value };
      this.empDetails.push(newEmpData);

      // this.empDetails.push(this.empForm.value)
      localStorage.setItem('empresult', JSON.stringify(this.empDetails))
      // console.log(this.empDetails.values)  

      this.showForm=false
      this.empForm.reset()
    }
  }

  private getNextId(): number {
    return this.empDetails.length > 0 ? this.empDetails[this.empDetails.length - 1].id + 1 : 1;
  }

  openAddEditEmpForm(){
    this.showForm=true
  }
  closeAddEditEmpForm(){
    this.showForm=false
    this.empForm.reset()
    this.isUpdateMode=false
  }

  onedit(empDetails: any): void {
    this.emp = empDetails;
    this.empForm.patchValue(empDetails);
    this.showForm = true;
    this.isUpdateMode = true;  
}
  
onSave(){
  // console.log("hello")

   if(this.isUpdateMode){
  const updatedEmpData = { ...this.emp, ...this.empForm.value };
  const index = this.empDetails.findIndex(emp => emp.id === this.emp.id);
  if(index !== -1){
    this.empDetails[index] = updatedEmpData;
    localStorage.setItem('empresult', JSON.stringify(this.empDetails));
    this.showForm = false;
    this.isUpdateMode = false;
    this.empForm.reset();
  }
}
}

delete_emp(empId: any): void {
    if (this.empDetails && this.empDetails.length > 0) {
      this.empDetails = this.empDetails.filter(emp => emp && emp.id !== undefined && emp.id !== empId);
      localStorage.setItem('empresult', JSON.stringify(this.empDetails));
    }
  }


register(){
  this.auth.logout()
}

}




 


