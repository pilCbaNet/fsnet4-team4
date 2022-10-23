import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { LandingComponent } from './pages/landing/landing.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { HeaderComponent } from './layout/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingComponent,
    FooterComponent,
    ServiciosComponent,
    HeaderComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
