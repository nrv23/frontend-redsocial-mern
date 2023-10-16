import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { routing } from './app.routing';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { SidebarUsuarioComponent } from './components/cuenta/sidebar-usuario/sidebar-usuario.component';
import { ConfiguracionUsuarioComponent } from './components/cuenta/configuracion-usuario/configuracion-usuario.component';
import { AlertComponent } from './components/alert/alert.component';
import { CambiarContrasenaComponent } from './components/cambiar-contrasena/cambiar-contrasena.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ValidarCodigoComponent } from './components/validar-codigo/validar-codigo.component';
import { ReestablecerContrasenaComponent } from './components/reestablecer-contrasena/reestablecer-contrasena.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    RegistroComponent,
    LoginComponent,
    SidebarUsuarioComponent,
    ConfiguracionUsuarioComponent,
    AlertComponent,
    CambiarContrasenaComponent,
    ResetPasswordComponent,
    ValidarCodigoComponent,
    ReestablecerContrasenaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
    //routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
