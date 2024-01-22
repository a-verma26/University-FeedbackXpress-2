[YouTube Private Link](https://youtu.be/tA7Rh4kdgO0)


# StudentSurveyForm (Angular Version)

Introduction
This document provides an overview of the full-stack application development assignment. The goal is to implement a robust application with Angular for the frontend and Spring Boot for the backend, incorporating RESTful Web Services, and JDBC or JPA.
Assignment Description
The assignment involves creating a comprehensive application that allows prospective students to fill out a survey form and provides functionality to view all recorded surveys. Here are the key components of the assignment:
Technologies Used
- Frontend: Angular 16.2
- Backend: Spring Boot
- Backend Tools: RESTful Web Services, JDBC or JPA
- Database: Integration with a database MySQL

mplementation Details
Angular Components:
1. AppComponent:
- Main component serving as the entry point for the application.
- Contains navigation links and possibly a welcome page.
2. SurveyListComponent:
- Responsible for displaying a list of surveys.
- Uses a service to fetch survey data from the backend.
- Includes buttons to update and delete surveys.
3. SurveyFormComponent:
- Represents the form for users to submit a new survey.
- Includes form controls for first name, last name, address, etc.
- Provides checkboxes, radio buttons, dropdowns, and a text area for additional
comments.
- Submits the form data to the backend using a service.
 
Services(Survey.service.ts) :
- Handles communication with the backend Survey API.
- Contains methods for GET, POST, PUT, and DELETE operations.
- Utilizes Angular's HttpClient for making HTTP requests.
Routing:
1. AppRoutingModule:
- Defines routes for different components.
- Maps URLs to corresponding Angular components.
Assets Folder : It contains background images and zipcodes.json file
