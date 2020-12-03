import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PresentComponent } from './present/present.component';

const routes: Routes = [
  {
    path: '',
    component: PresentComponent,
    data: { title: 'anms.menu.present' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PresentRoutingModule {}
