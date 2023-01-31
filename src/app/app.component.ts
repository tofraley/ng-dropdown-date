import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

const apiClientGet = () => {
    return "2020-01-01T00:00:00";
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  date: Date;

  constructor() {
    this.date = new Date();
  }

  ngOnInit() {
    // Pretend this comes from an API
    // It is a string, so we have to create a new date object with it first
    this.date = new Date(apiClientGet());
    console.log(this.date);
  }

  onDateChanged(newDate: Date) {
    console.log("Date changed");
    console.log(newDate);
    this.date = newDate;
  }

  setToToday() {
    console.log("Set to Today");
    this.date = new Date("2023-01-30");
  }

  fakeApiCall(newDate: Date): Observable<Date> {
    return of(newDate);
  }
}
