import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterielsComponent } from './materiels/materiels.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { DetailsMaterialComponent } from './details-material/details-material.component';
import { KonvaModule } from "ng2-konva";
import { SchemaViewKonvaComponent } from './schema-view-konva/schema-view-konva.component';

@NgModule({
  declarations: [
    AppComponent,
    MaterielsComponent,
    DetailsMaterialComponent,
    SchemaViewKonvaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFontAwesomeModule,
    KonvaModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
