import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConnectComponent } from './connect/connect.component';

const routes: Routes = [
  {
    path: '',
    component: ConnectComponent,
    data: { title: 'anms.menu.connect' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnectRoutingModule {}
