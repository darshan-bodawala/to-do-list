import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { TaskService } from './service/task.service';
import { ConfirmationService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {Http, HttpModule} from '@angular/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TableModule,
    DialogModule,
    HttpClientModule,
    HttpModule,
    ConfirmDialogModule,
    FormsModule
  ],
  providers: [
    TaskService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
