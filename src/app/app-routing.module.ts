import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro-nombre',
    loadChildren: () => import('./pages/registro_usuario/registro-nombre/registro-nombre.module').then( m => m.RegistroNombrePageModule)
  },
  {
    path: 'registro-contacto',
    loadChildren: () => import('./pages/registro_usuario/registro-contacto/registro-contacto.module').then( m => m.RegistroContactoPageModule)
  },
  {
    path: 'registro-password',
    loadChildren: () => import('./pages/registro_usuario/registro-password/registro-password.module').then( m => m.RegistroPasswordPageModule)
  },
  {
    path: 'registro-foto-perfil',
    loadChildren: () => import('./pages/registro_usuario/registro-foto-perfil/registro-foto-perfil.module').then( m => m.RegistroFotoPerfilPageModule)
  },
  {
    path: 'autocuidado/menu-principal',
    loadChildren: () => import('./pages/autocuidado/menu-principal/menu-principal.module').then( m => m.MenuPrincipalPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
