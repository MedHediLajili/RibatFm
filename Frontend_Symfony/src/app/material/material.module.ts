import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from '@angular/material'
import {TextFieldModule} from '@angular/cdk/text-field';


const MaterialComponents = [
  Material.MatToolbarModule,
  Material.MatGridListModule,
  Material.MatInputModule,
  Material.MatFormFieldModule,
  Material.MatDatepickerModule,
  Material.MatNativeDateModule,
  Material.MatSliderModule,
  TextFieldModule,
  Material.MatButtonModule,
  Material.MatIconModule,
  Material.MatSnackBarModule,
  Material.MatTableModule,
  Material.MatCardModule,
  Material.MatPaginatorModule,
  Material.MatSortModule,
  Material.MatDialogModule,
  Material.MatSelectModule,
  Material.MatListModule,
  Material.MatMenuModule,
  Material.MatSidenavModule,
  Material.MatOptionModule,
  Material.MatTabsModule,
  Material.MatDividerModule,
  Material.MatExpansionModule,
  Material.MatRadioModule,
  Material.MatStepperModule,
  Material.MatBadgeModule
];

@NgModule({
  imports: [
    CommonModule,
    MaterialComponents
  ],
  exports: [
    MaterialComponents
  ]
})
export class MaterialModule { }
