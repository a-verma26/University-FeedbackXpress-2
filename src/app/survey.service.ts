// survey.service.ts
// Group Members:
// Simran Bayas (G01351582), 
// Abhishek Verma(G01358661)

// Handles communication with the backend Survey API.
// Contains methods for GET, POST, PUT, and DELETE operations.
// Utilizes Angular's HttpClient for making HTTP requests.
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  private apiUrl = 'http://localhost:8080/api/survey'; // Update with your Spring Boot API endpoint


  constructor(private http: HttpClient) {}

 getAllSurveys(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/surveysRecord`);
  }

  createSurvey(surveyData: any): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<string>(`${this.apiUrl}/submit`, surveyData, httpOptions)
    .pipe(
      tap(response => console.log('Survey submitted successfully:', response)),
      catchError(error => {
        console.error('Error submitting survey:', error);

        // Re-throw the error to propagate it to the subscriber
        return throwError(error);
      })
    );
}

deleteSurvey(id: number): Observable<any> {
  const deleteUrl = `${this.apiUrl}/delete/${id}`; // Update with your actual delete API endpoint
  return this.http.delete<any>(deleteUrl);
}
updateSurvey(id: number, updatedSurvey: any): Observable<any> {
  const updateUrl = `${this.apiUrl}/update/${id}`;
  return this.http.put<any>(updateUrl, updatedSurvey);
}
}