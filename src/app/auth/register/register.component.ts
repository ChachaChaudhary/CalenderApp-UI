
import { ChangeDetectionStrategy,ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import {  NotificationService } from 'src/app/_helpers';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  signupform: FormGroup;
  constructor(private fb: FormBuilder, private authService:AuthService,
              private router:Router,
              private notify:NotificationService) {

  }

  submit() {
    if(this.signupform.valid){
      this.authService.register({...this.signupform.value}).subscribe((result: any) => {                
        if(result) {          
          this.notify.success(result.message);
          this.router.navigate(['/auth/login']);
        }
      }, err=> {
        console.log(err);
      });
    }
  }

  ngOnInit(){
    this.signupform = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9,.]*')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(5)]]
    });
  }

}
