import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { ConfiguracionUsuarioComponent } from './components/cuenta/configuracion-usuario/configuracion-usuario.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: 'signup', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cuenta/configuracion', component: ConfiguracionUsuarioComponent },
  { path: '**', redirectTo: "home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
