import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { ConnectComponent } from './connect/connect.component';
import { ConnectRoutingModule } from './connect-routing.module';

@NgModule({
  declarations: [ConnectComponent],
  imports: [CommonModule, SharedModule, ConnectRoutingModule]
})
export class ConnectModule {}
