// Group Members:
// Simran Bayas (G01351582), 
// Abhishek Verma(G01358661)

// methods to handle zip, setup form which setups Angular form fields and all the methods that are require for validation. Handling query param for POST and PUT API 
// POST and PUT API call to service
import { Component, OnInit, ElementRef, Renderer2} from '@angular/core';
import { SurveyService } from '../survey.service'; // Update the path
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.css']
})
export class SurveyFormComponent implements OnInit {
  isUpdate: boolean = false;
  surveyId: number | undefined;
  studentForm!: FormGroup;
  likeaboutOptions = ['students', 'location', 'campus', 'atmosphere', 'dormRooms', 'sports'];
  zipcodes: any[] = [];
  isZipValid: boolean = true;
  constructor(private surveyService: SurveyService,private fb: FormBuilder, private el: ElementRef, private renderer: Renderer2,    private route: ActivatedRoute,
    private router: Router,private http: HttpClient) { }

    onZipBlur(): void {
    const zipValue = this.studentForm.get('zip')?.value;
    this.isZipValid =this.validateZip(zipValue);
    }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.isUpdate = true;
        this.surveyId = id;
      }
    });
    this.setupForm();
    this.setFocusOnFirstInput();
    this.http.get('../../assets/zipcodes.json').subscribe((data: any) => {
      this.zipcodes = data.zipcodes;
    });
  }
  setupForm() {
    this.studentForm = this.fb.group({
      username: ['', [Validators.required]],
      street_address: ['', [Validators.required]],
      zip: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      city:['', [Validators.required]],
      state:['', [Validators.required]],
      telephone_number: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      url: ['', [Validators.required, Validators.pattern(/^(ftp|http|https):\/\/[^ "]+$/)]],
      date_of_survey: ['', [Validators.required]],
      likedMostDummy: this.fb.group({
        students: [false],
        location: [false],
        campus: [false],
        atmosphere: [false],
        dormRooms: [false],
        sports: [false],
      }),  
      interest_source: [''],
      comments: [''],
      graduation_month: [''],
      graduation_year: ['', [Validators.pattern(/^\d{4}$/)]],
      recommendation: [''],
      data_range: ['', [Validators.required]],
      average_output: [''],
      maximum_output: ['']
    });

  }  

  setFocusOnFirstInput(): void {
    const firstTextInput = this.el.nativeElement.querySelector('input[type="text"]');
    if (firstTextInput) {
      this.renderer.selectRootElement(firstTextInput).focus();   
     }
  }

 
  calculateAverageAndMaximum(): void {
    // Get the input data from the "Data" field
    const data_range = this.studentForm.get('data_range')!.value;  
    // Split the input into an array of numbers
    const numbers = data_range.split(',').map(Number);
  
    // Check if there are at least ten values between 1 and 100
    if (numbers.length !== 10 || !numbers.every((num: number) => num >= 1 && num <= 100)) {
      alert('Please enter ten comma-separated numbers between 1 and 100.');
      this.resetOutputFields();
      return;
    }
  
    // Calculate average
    const average = numbers.reduce((sum: any, num: any) => sum + num, 0) / numbers.length;
  
    // Calculate maximum
    const maximum = Math.max(...numbers);
  
    // Display the results in the output fields
    this.studentForm.get('average_output')!.setValue(average.toFixed(2));
    this.studentForm.get('maximum_output')!.setValue(maximum.toString());
  }
  
  resetOutputFields(): void {
    // Clear the output fields
    this.studentForm.get('average_output')!.setValue('');
    this.studentForm.get('maximum_output')!.setValue('');
  }
  
 
  getLikedMostString(): string {
    const likedMostDummy = this.studentForm.value.likedMostDummy;
    return Object.keys(likedMostDummy).filter(key => likedMostDummy[key]).join(',');
  }

  validateForm(): boolean {
    const nameInput = (<HTMLInputElement>document.getElementById('username')).value;
    const addressInput = (<HTMLInputElement>document.getElementById('street_address')).value;
    const emailInput = (<HTMLInputElement>document.getElementById('email')).value;
    const validationErrors: string[] = [];
  
    // Check if the name contains only alphabets
    if (!/^[A-Za-z]+$/.test(nameInput)) {
      validationErrors.push('Please enter a valid username with only letters.');
      (<HTMLInputElement>document.getElementById('username')).value = ''; // Clear the field
    }
  
    // Check if the address contains only appropriate characters
    if (!/^[A-Za-z0-9\s]+$/.test(addressInput)) {
      validationErrors.push('Please enter a valid address with alphanumeric characters.');
      (<HTMLInputElement>document.getElementById('street_address')).value = ''; // Clear the field
    }
  
    // Check if at least two checkboxes are checked
    const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]:checked');
    if (checkboxes.length < 2) {
      validationErrors.push('Please check at least two checkboxes.');
    }
  
    // Check if a radio button option is selected
    const radioButtons = document.querySelectorAll<HTMLInputElement>('input[type="radio"]:checked');
    if (radioButtons.length === 0) {
      validationErrors.push('Please select a radio button option.');
    }
  
    // Check if the email address format is valid
    if (!/^\S+@\S+\.\S+$/.test(emailInput)) {
      validationErrors.push('Please enter a valid email address.');
      (<HTMLInputElement>document.getElementById('email')).value = ''; // Clear the field
    }
  
    const data_range = this.studentForm.get('data_range')!.value;  
    const numbers = data_range.split(',').map(Number);
  
    // Check if there are exactly ten values
    if (numbers.length !== 10 || !numbers.every((num: number) => num >= 1 && num <= 100)) {
      validationErrors.push('Please enter exactly ten comma-separated numbers between 1 and 100');
    }
  
    if (validationErrors.length > 0) {
      alert(validationErrors.join('\n'));
      return false;
    }
  
    // If all validations pass, allow the form to be submitted
    if (this.studentForm.valid) {
      const formData = { ...this.studentForm.value, liked_most: this.getLikedMostString() };
      delete formData.likedMostDummy;



      if (this.isUpdate) {
        this.surveyService.updateSurvey(this.surveyId!, formData)
        .subscribe(response => {
          // Handle success, e.g., show a success message
          console.log('Survey Updated successfully:', response);
          alert("Survey Updated successfully");
        }, error => {
          // Handle error, e.g., show an error message
          console.error('Error submitting survey:', error);
          alert("Error submitting survey");
        });
            return true;
        
      }
      else{
      this.surveyService.createSurvey(formData)
      .subscribe(response => {
        // Handle success, e.g., show a success message
        console.log('Survey submitted successfully:', response);
        alert("Survey submitted successfully");
      }, error => {
        // Handle error, e.g., show an error message
        console.error('Error submitting survey:', error);
        alert("Error submitting survey");
      });
          return true;
  }
}
return false;
  }

  validateZip(control: string) {
    const enteredZip = control;
    const isValidZip = this.zipcodes.some(zip => zip.zip === enteredZip);

    if (isValidZip) {
      const matchingZip = this.zipcodes.find(zip => zip.zip === enteredZip);
      this.studentForm.patchValue({
        city: matchingZip.city,
        state: matchingZip.state
      });
    } else {
      this.studentForm.patchValue({
        city: '',
        state: ''
      });
    }

    return isValidZip ? true:false;
  }

}
