import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  // Pretend this comes from an API
  date = new Date();

  onDateChanged(newDate: Date) {
    // Here you would need to trigger a save
    this.fakeApiCall(newDate)
        .subscribe(response => this.date = response);
  }

  fakeApiCall(newDate: Date): Observable<Date> {
    return of(newDate);
  }
}
