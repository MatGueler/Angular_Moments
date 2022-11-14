//  * Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// * Components
import { AddMomentComponent } from './components/add-moment/add-moment.component';
import { AboutComponent } from './components/pages/about/about.component';
import { HomeComponent } from './components/pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'new', component: AddMomentComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
