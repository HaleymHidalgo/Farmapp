import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
    path: 'autocuidado/perfil',
    loadChildren: () => import('./pages/autocuidado/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'autocuidado/menu-principal',
    loadChildren: () => import('./pages/autocuidado/menu-principal/menu-principal.module').then( m => m.MenuPrincipalPageModule)
  },
  {
    path: 'autocuidado/agregar-alarma',
    loadChildren: () => import('./pages/autocuidado/agregar-alarma/agregar-alarma.module').then( m => m.AgregarAlarmaPageModule)
  },
  {
    path: 'autocuidado/alarma-recipe',
    loadChildren: () => import('./pages/autocuidado/alarma-recipe/alarma-recipe.module').then( m => m.AlarmaRecipePageModule)
  },
  {
    path: 'autocuidado/alarma-recipe-contacto',
    loadChildren: () => import('./pages/autocuidado/alarma-recipe-contacto/alarma-recipe-contacto.module').then( m => m.AlarmaRecipeContactoPageModule)
  },
  {
    path: 'autocuidado/alarma-medicamento',
    loadChildren: () => import('./pages/autocuidado/alarma-medicamento/alarma-medicamento.module').then( m => m.AlarmaMedicamentoPageModule)
  },
  {
    path: 'autocuidado/alarma-confirmar',
    loadChildren: () => import('./pages/autocuidado/alarma-confirmar/alarma-confirmar.module').then( m => m.AlarmaConfirmarPageModule)
  },
  {
    path: 'autocuidado/perfil-emergencia',
    loadChildren: () => import('./pages/autocuidado/perfil-emergencia/perfil-emergencia.module').then( m => m.PerfilEmergenciaPageModule)
  },
  {
    path: 'autocuidado/buscar-farmacia',
    loadChildren: () => import('./pages/autocuidado/buscar-farmacia/buscar-farmacia.module').then( m => m.BuscarFarmaciaPageModule)
  },
  {
    path: 'autocuidado/mapa',
    loadChildren: () => import('./pages/autocuidado/mapa/mapa.module').then( m => m.MapaPageModule)
  },
  {
    path: 'soporte/menu-principal',
    loadChildren: () => import('./pages/soporte/menu-principal/menu-principal.module').then( m => m.MenuPrincipalPageModule)
  },
  {
    path: 'soporte/pregunta-seguridad',
    loadChildren: () => import('./pages/soporte/pregunta-seguridad/pregunta-seguridad.module').then( m => m.PreguntaSeguridadPageModule)
  },
  {
    path: 'soporte/opciones-cliente',
    loadChildren: () => import('./pages/soporte/opciones-cliente/opciones-cliente.module').then( m => m.OpcionesClientePageModule)
  },
  {
    path: 'soporte/cambiar-password',
    loadChildren: () => import('./pages/soporte/cambiar-password/cambiar-password.module').then( m => m.CambiarPasswordPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/not-found/not-found.module').then( m => m.NotFoundPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }