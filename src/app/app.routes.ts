import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployeeComponent } from './employee/employee.component';
import { RegisterComponent } from './register/register.component';
// import { AuthGuard } from '@angular/fire/auth-guard';




export const routes: Routes = [

    {
        path:'employee',
        component:EmployeeComponent,
 
    },
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
        
    },
    {
        path:'login',
        component:LoginComponent
    },
    
    {
        path:'register',
        component:RegisterComponent
    },
  
];
