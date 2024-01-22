// Group Members:
// Simran Bayas (G01351582), 
// Abhishek Verma(G01358661)

// It contains two links: "Student Survey" and "List All Surveys. with the cookie and greeting methods"
import { Component ,OnInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'student-survey-form';
  greetingMessage!: string;
  hyperlink!: string;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.setGreetingMessage();
  }

  isHomeRoute(): boolean {
    return this.router.url === '/';
  }

  private getGreeting(): string {
    const now = new Date();
    const hour = now.getHours();

    if (hour < 12) {
      return 'Good Morning';
    } else {
      const convertedHour = hour - 12;
      return convertedHour < 6 ? 'Good Afternoon' : 'Good Evening';
    }
  }

  private setGreetingMessage(): void {
    const name = this.getCookie('name') || prompt('Please enter your name', 'Abhishek Verma');
    if(name!=null)
    {
      document.cookie = 'name=' + escape(name);

      this.greetingMessage = `${this.getGreeting()}, ${name} welcome to SWE642 Survey`;
      this.hyperlink = `Click here if you are not ${name}`;
    }

  }

  private getCookie(name: string): string | null {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? unescape(cookieValue.pop()!) : null;
  }

  wrongPerson(): void {
    document.cookie = 'name=null; expires=Thu, 06-Oct-23 00:00:01 GMT';
    location.reload();
  }
}
