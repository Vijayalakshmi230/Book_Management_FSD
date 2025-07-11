import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';
import { FormsModule } from '@angular/forms';

import { App } from './app';
import { Dashboard } from './dashboard/dashboard';
import { Settings } from './dashboard/settings/settings';
import { ViewBooks } from './dashboard/view-books/view-books';
import { AddBooks } from './dashboard/add-books/add-books';
import { Login } from './login/login';
import { Register } from './register/register';
import { UpdateBooks } from './dashboard/update-books/update-books';
import { DashboardLayout } from './dashboard/dashboard-layout/dashboard-layout';

@NgModule({
  declarations: [
    App,
    Dashboard,
    Settings,
    ViewBooks,
    AddBooks,
    Login,
    Register,
    UpdateBooks,
    DashboardLayout,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
