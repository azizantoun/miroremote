import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { PresentComponent } from './present/present.component';
import { PresentRoutingModule } from './present-routing.module';

@NgModule({
  declarations: [PresentComponent],
  imports: [CommonModule, SharedModule, PresentRoutingModule]
})
export class PresentModule {}
