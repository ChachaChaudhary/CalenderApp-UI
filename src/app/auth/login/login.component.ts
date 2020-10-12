
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService, CustomTokenService } from 'src/app/_helpers';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private authService:AuthService, private route:ActivatedRoute, 
              private notify:NotificationService, private tokenService: CustomTokenService, 
              private router:Router) {

    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

   


  }

  submit() {
    this.authService.login(this.form.value).subscribe((result: any) => {
      console.log(result);
      if(result && result.token) {
        this.tokenService.setToken(result.token);        
        this.notify.success('successfully logged in');
        this.router.navigate(['/home']);
      }
    }, err=> {
      console.log(err);
    })
  }
}
