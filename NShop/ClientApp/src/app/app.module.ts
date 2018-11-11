import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { NshopConfigService } from './services/nshop-config.service';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

import { MatCardModule } from '@angular/material/card';
// import {MatFormFieldModule} from '@angular/material/form-field';
import { MatFormFieldModule, MatOptionModule, MatSelectModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { GoogleComponent } from './login/google/google.component';
import { AuthService } from './auth/auth.service';
import { AppMaterialModule } from './app-material/app-material.module';
import { LoginService } from './login/login.service';
import { GoogleService } from './login/google/google.service';
import { AuthInterceptor } from './common/auth-interceptor.service';
import { FakeInterceptorProviders } from './fake-services/fake-interceptor-provider';

const appInitializerFn = (appConfig: NshopConfigService) => {
  return () => {
    return appConfig.loadAppConfig();
  };
};

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ProductComponent,
    ProductDetailsComponent,
    ProductEditComponent,
    LoginComponent,
    GoogleComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppMaterialModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'product', component: ProductComponent, canActivate: [AuthGuard] },
      { path: 'product/:id', component: ProductDetailsComponent, canActivate: [AuthGuard] },
      { path: 'productedit/:id', component: ProductEditComponent, canActivate: [AuthGuard] },
      { path: 'productedit', component: ProductEditComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent },
    ]),
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [
    LoginService, AuthService, AuthGuard,
    GoogleService,
    NshopConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [NshopConfigService]
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    FakeInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
