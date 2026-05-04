import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SeriesPopulerPageRoutingModule } from './series-populer-routing.module';

import { SeriesPopulerPage } from './series-populer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeriesPopulerPageRoutingModule
  ],
  declarations: [SeriesPopulerPage]
})
export class SeriesPopulerPageModule {}
