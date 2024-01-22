// src/app/app.module.ts
// Group Members:
// Simran Bayas (G01351582), 
// Abhishek Verma(G01358661)

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SurveyFormComponent } from './survey-form/survey-form.component';
import { SurveyListComponent } from './survey-list/survey-list.component';
import { SurveyService } from './survey.service';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'survey', component: SurveyFormComponent },
  { path: 'get-surveys', component: SurveyListComponent },
  // { path: '', redirectTo: '/survey', pathMatch: 'full' },
];

@NgModule({
  declarations: [AppComponent, SurveyFormComponent, SurveyListComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule,ReactiveFormsModule,RouterModule.forRoot(routes)],
  providers: [SurveyService],
  bootstrap: [AppComponent],
})
export class AppModule {}
