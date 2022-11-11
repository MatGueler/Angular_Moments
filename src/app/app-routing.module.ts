//  * Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// * Components
import { AboutComponent } from './components/pages/about/about.component';
import { AddMomentComponent } from './components/pages/add-moment/add-moment.component';
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
