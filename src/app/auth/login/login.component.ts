import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationHelperService } from '../../services/navigation-helper/navigation-helper.service';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginForm } from './login.form';
import { AuthService } from '../../services/auth/auth.service';
import { Login } from './login.interface';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { LoaderService } from '../../services/loader/loader.service';
import { AssertionUtils } from '../../helper/assertion-utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm!: LoginForm;
  public error = '';
  public rememberMe: boolean = false;

  constructor(private readonly navigationHelperService: NavigationHelperService, 
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly localstorage: LocalStorageService,
    private readonly loaderService: LoaderService,
    private readonly cdr: ChangeDetectorRef) {}

  public ngOnInit() {
    this.init();
    this.checkRememberMe();
  }

  public login(): void {
    this.error = '';
    if (this.loginForm.invalid) {
      return;
    }
    this.loaderService.start();
    this.authService.login(this.loginForm).subscribe({
      next: (res: Login) => {
        this.localstorage.add('rememberMe', this.rememberMe);
        this.localstorage.add('username', this.loginForm.controls.username.value);
        this.localstorage.add('access_token', res.access_token);
        this.localstorage.add('refresh_token', res.refresh_token);
        this.loaderService.end();
        this.navigationHelperService.navigateTo('/otp');
      },
      error: (err) => {
        this.error = err.error.message; 
        this.loaderService.end();
      },
    });
  }

  public getCheckbox(value: boolean) {
    this.rememberMe = value;
  }

  private checkRememberMe() {
    const rememberMe = this.localstorage.get('rememberMe');
    if (!AssertionUtils.isNullOrUndefined(rememberMe)) {
      const username = this.localstorage.get('username') || '';
      this.rememberMe = true;
      this.loginForm.patchValue({
        username: username
      });
      this.cdr.detectChanges();
    }
  }

  private init(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      grant_type: ['password']
    }) as LoginForm;
  }

}
