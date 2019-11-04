import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {CdkTableModule} from '@angular/cdk/table';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatDividerModule,
  MatMenuModule,
  MatCardModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatTableModule,
  MatInputModule,
  MatSortModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatTabsModule,
} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    CdkTableModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatDividerModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    FormsModule,
    FlexLayoutModule,
  ],
  exports: [
    BrowserAnimationsModule,
    CdkTableModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatDividerModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    FormsModule,
    FlexLayoutModule,
  ]
})
export class MaterialModule { }
