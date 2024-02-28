import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { addAuthorizationHeaderInterceptorProvider } from './core/providers/add-authorization-header-interceptor.provider';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [HttpClientModule, BrowserModule, AppRoutingModule, BrowserAnimationsModule, MatSnackBarModule],
  providers: [addAuthorizationHeaderInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
