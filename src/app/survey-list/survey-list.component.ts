// Group Members:
// Simran Bayas (G01351582), 
// Abhishek Verma(G01358661)

// GET, Update, Delete API call to service
import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../survey.service'; // Update the path
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit {
  surveys: any[] = [];

  constructor(private surveyService: SurveyService, private router: Router) { }

  ngOnInit(): void {
    this.loadSurveys();
  }

  // Function to load surveys
  private loadSurveys(): void {
    this.surveyService.getAllSurveys().subscribe(data => {
      this.surveys = data;
    });
  }

  // Function to update a survey
  updateSurvey(id: number): void {
    // You can navigate to an update component or open a modal
    this.router.navigate(['/survey'], { queryParams: { id: id } });
  }

  // Function to delete a survey
  deleteSurvey(id: number): void {
    this.surveyService.deleteSurvey(id).subscribe(() => {
      // Reload surveys after deletion
      this.loadSurveys();
    });
  }
}