import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import {ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { NshopConfigService } from './services/nshop-config.service';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

import { MatCardModule } from '@angular/material/card';
// import {MatFormFieldModule} from '@angular/material/form-field';
import {MatFormFieldModule, MatOptionModule, MatSelectModule, MatInputModule} from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductEditComponent } from './product-edit/product-edit.component';

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
    ProductEditComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      {path: 'product', component: ProductComponent},
      {path: 'product/:id', component: ProductDetailsComponent},
      {path: 'productedit/:id', component: ProductEditComponent},
      {path: 'productedit', component: ProductEditComponent}
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
    NshopConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [NshopConfigService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
