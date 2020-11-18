import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListeComponent } from './liste/liste.component';
import { AccueilComponent } from './accueil/accueil.component';

const routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'liste', component: ListeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
