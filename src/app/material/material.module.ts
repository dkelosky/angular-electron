import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatDividerModule,
  MatMenuModule,
  MatCardModule,
  MatPaginatorModule,
  MatTableModule,
} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatTableModule,
    FlexLayoutModule,
  ],
  exports: [
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatTableModule,
    FlexLayoutModule,
  ]
})
export class MaterialModule { }
