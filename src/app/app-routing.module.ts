import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CotizacionesComponent } from './layout/cotizaciones/cotizaciones.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { UltimosMovimientosComponent } from './pages/ultimos-movimientos/ultimos-movimientos.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'Inicio',
    pathMatch: 'full'
  },
  { 
    path: 'inicio',
    component: LandingComponent
  },
  {path:'servicios', component: ServiciosComponent},
  {path:'ultimos-movimientos', component: UltimosMovimientosComponent},
  {path:'cotizaciones', component: CotizacionesComponent},
  {path: '', redirectTo: '/inicio', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
