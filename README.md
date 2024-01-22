# University-FeedbackXpress-2
This provides an overview of the full-stack application development assignment. The goal is to implement a robust application with Angular for the frontend and Spring Boot for the backend, incorporating RESTful Web Services, and JDBC or JPA.

Introduction
This document provides an overview of the full-stack application development assignment. The goal is to implement a robust application with Angular for the frontend and Spring Boot for the backend, incorporating RESTful Web Services, and JDBC or JPA.
Assignment Description
The assignment involves creating a comprehensive application that allows prospective students to fill out a survey form and provides functionality to view all recorded surveys. Here are the key components of the assignment:
Technologies Used
● Frontend: Angular 16.2
● Backend: Spring Boot
● Backend Tools: RESTful Web Services, JDBC or JPA
● Database: Integration with a database MySQL

Survey API Documentation
This API allows you to perform CRUD operations for survey data. Below are the available endpoints and their descriptions.
Base URL: The base URL for the Survey API is http://localhost:8080/api/survey.
1. GET All Surveys
Endpoint: /surveysRecord
Method: GET
Description: Get a list of all surveys recorded to date. Example Request:
curl -X GET http://localhost:8080/api/survey/surveysRecord
-Simran Bayas and Abhishek Verma
       
 2. Submit a Survey
Endpoint: /submit
Method: POST
Description: Submit a new survey. Example Request:
curl -X POST -H "Content-Type: application/json" -d '{"firstName":"John","lastName":"Doe", ...}' http://localhost:8080/api/survey/submit
3. Update a Survey
Endpoint: /update/{id}
Method: PUT
Description: Update an existing survey by ID. Example Request:
curl -X PUT -H "Content-Type: application/json" -d '{"firstName":"UpdatedJohn","lastName":"UpdatedDoe", ...}' http://localhost:8080/api/survey/update/1
-Simran Bayas and Abhishek Verma
      
4. Delete a Survey
Endpoint: /delete/{id}
Method: DELETE
Description: Delete an existing survey by ID. Example Request:
curl -X DELETE http://localhost:8080/api/survey/delete/1


Implementation Details
Angular Components:
1. AppComponent:
● Main component serving as the entry point for the application.
● Contains navigation links and possibly a welcome page.
2. SurveyListComponent:
● Responsible for displaying a list of surveys.
● Uses a service to fetch survey data from the backend.
● Includes buttons to update and delete surveys.
3. SurveyFormComponent:
● Represents the form for users to submit a new survey.
● Includes form controls for first name, last name, address, etc.
● Provides checkboxes, radio buttons, dropdowns, and a text area for additional
comments.
● Submits the form data to the backend using a service.
 
 Services(Survey.service.ts) :
● Handles communication with the backend Survey API.
● Contains methods for GET, POST, PUT, and DELETE operations.
● Utilizes Angular's HttpClient for making HTTP requests.
Routing:
1. AppRoutingModule:
● Defines routes for different components.
● Maps URLs to corresponding Angular components.
Assets Folder : It contains background images and zipcodes.json file
Backend (Spring Boot)
UserController
Description:
The UserController is a Spring MVC controller class responsible for handling HTTP requests related to survey records submitted by users. It interacts with the UserRepository for database operations and manages CRUD (Create, Read, Update, Delete) functionalities.
Endpoints:
1. GET /api/survey/surveysRecord:
● Method: GET
● Description: Retrieves a list of all survey records stored in the database.
● Response: Returns a list of UserDtls objects in the response body.
2. POST /api/survey/submit:
● Method: POST
● Description: Handles the submission of a new survey record.
● Request Body: Expects a JSON payload representing a UserDtls object with survey
information.
● Response: Returns a 200 OK status upon successful submission.
3. PUT /api/survey/update/{id}:
● Method: PUT
● Description: Updates an existing survey record identified by the provided {id}
parameter.
● Path Variable: {id} represents the ID of the survey record to be updated.
● Request Body: Expects a JSON payload representing an updated UserDtls object.
● Response: Returns a 200 OK status upon successful update, or a 404 Not Found if
the specified survey record is not found.
-Simran Bayas and Abhishek Verma
    
 4. DELETE /api/survey/delete/{id}:
● Method: DELETE
● Description: Deletes a survey record identified by the provided {id} parameter.
● Path Variable: {id} represents the ID of the survey record to be deleted.
● Response: Returns a 200 OK status upon successful deletion, or a 404 Not Found if
the specified survey record is not found.
Additional Notes:
Cross-Origin Resource Sharing (CORS):
The @CrossOrigin(origins = "http://localhost:4200") annotation allows requests from http://localhost:4200 to access the API.
Dependency Injection:
The UserRepository is injected into the controller using the @Autowired annotation. Data Transfer Object (DTO):
The controller uses the UserDtls entity as a Data Transfer Object (DTO) to transfer survey data between the client and the server.
USERDTLS.JAVA
UserDtls class is a Java entity class representing the structure of the survey_data table in your database. It uses JPA annotations for mapping to the database. Below is a brief breakdown and description of the class:
Key Points:
● @Entity: Marks the class as a JPA entity, allowing it to be mapped to a database table.
● @Table(name = "survey_data"): Specifies the name of the database table to which this entity is mapped.
● @Id, @GeneratedValue: Denote the primary key field and its generation strategy (in this case, IDENTITY).
● Getters and Setters: Provide access to the private fields encapsulated in the class.
● @Override toString(): Overrides the toString() method to return a human-readable
string representation of the object.
UserRepository.java:
The UserRepository interface is part of the Spring Data JPA framework and extends the JpaRepository interface.
JpaRepository<UserDtls, Long>:
● UserDtls: Represents the entity type managed by the repository. In this case, it's the UserDtls entity class.
-Simran Bayas and Abhishek Verma
    
● Long: Represents the type of the entity's primary key. Here, Long is used as the primary key type for the UserDtls entity. This implies that the id field in the UserDtls class is of type Long and serves as the primary key for database operations.
Application.properties:
The application.properties file contains configuration settings for a Spring Boot application. It includes details such as the data source connection information, Hibernate ORM settings, and logging configurations. These settings define how the application interacts with the database, handles entity persistence, and logs relevant information during runtime.
DATABASE: MYSQL
We have used MYSQL as a main datasource for our application.
