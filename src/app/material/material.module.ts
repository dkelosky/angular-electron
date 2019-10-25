import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatButtonModule, MatDividerModule, MatCardModule } from '@angular/material';
// import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
  ],
  exports: [
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
  ]
})
export class MaterialModule { }
