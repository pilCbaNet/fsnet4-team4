import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { LandingComponent } from './pages/landing/landing.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { HeaderComponent } from './layout/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CotizacionesComponent } from './layout/cotizaciones/cotizaciones.component';
import { UltimosMovimientosComponent } from './pages/ultimos-movimientos/ultimos-movimientos.component';
import { DepositoComponent } from './pages/deposito/deposito.component';
import { TransferirComponent } from './pages/transferir/transferir.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingComponent,
    FooterComponent,
    ServiciosComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    CotizacionesComponent,
    UltimosMovimientosComponent,
    DepositoComponent,
    TransferirComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
    
    

  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})

export class AppModule { }