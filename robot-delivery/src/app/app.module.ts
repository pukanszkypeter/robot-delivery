import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatIconModule} from "@angular/material/icon";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSliderModule} from "@angular/material/slider";
import { TreeConfigurationComponent } from './components/home/tree-configuration/tree-configuration.component';
import { RobotConfigurationComponent } from './components/home/robot-configuration/robot-configuration.component';
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { BfsConfigurationComponent } from './components/home/bfs-configuration/bfs-configuration.component';
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    PageNotFoundComponent,
    TreeConfigurationComponent,
    RobotConfigurationComponent,
    BfsConfigurationComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        MatIconModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatButtonModule,
        MatTooltipModule,
        MatSliderModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatSelectModule,
        MatOptionModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
