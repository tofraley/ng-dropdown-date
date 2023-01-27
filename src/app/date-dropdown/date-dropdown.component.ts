import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
 
const months = [
  { name: "Jan", value: 0 },
  { name: "Feb", value: 1 },
  { name: "Mar", value: 2 },
  { name: "Apr", value: 3 },
  { name: "May", value: 4 },
  { name: "Jun", value: 5 },
  { name: "Jul", value: 6 },
  { name: "Aug", value: 7 },
  { name: "Sep", value: 8 },
  { name: "Oct", value: 9 },
  { name: "Nov", value: 10 },
  { name: "Dec", value: 11 }
]

@Component({
  selector: 'app-date-dropdown',
  templateUrl: './date-dropdown.component.html',
  styleUrls: ['./date-dropdown.component.scss']
})
export class DateDropdownComponent implements OnInit {

  // This lets you set the date from the Parent component
  private _date: Date = new Date();
  @Input() set date(inputDate: Date) {
    this._date = inputDate;
  }

  // This lets you output a new date to the Parent component
  @Output() dateChangedEvent = new EventEmitter<Date>();

  availableMonths = months;
  selectedMonth = this._date.getMonth();

  availableYears = [this._date.getFullYear()];
  selectedYear = this._date.getFullYear();


  selDate = () => new Date(this.selectedYear, this.selectedMonth);

  ngOnInit() {
    this.initOptions()
  }

  initOptions() {
    this.initMonths();
    this.initYears();
  }

  initMonths() {
    const currentDate = new Date();
    const hasSelectedThisYear = this.selectedYear 
      && this.selectedYear == currentDate.getFullYear();
    let availableMonths = months;

    if (hasSelectedThisYear) {
      availableMonths = months.filter(m => m.value <= currentDate.getMonth());
    }

    this.availableMonths = availableMonths;
  }

  initYears() {
    const currentDate = new Date();
    let latestAllowedYear = currentDate.getFullYear()

    if (this.selectedMonth) {
      if (this.selectedMonth > currentDate.getMonth()) {
        latestAllowedYear -= 1;
      }
    }

    this.availableYears = Array.from(
      Array(400).keys())
      .map(x => latestAllowedYear - x);
  }

  onMonthChange = (event: Event) => {
    const eventVal = (event.target as HTMLInputElement).value;
    this.selectedMonth = parseInt(eventVal);
    this.initOptions();
    this.dateChangedEvent.emit(this.selDate());
  }

  onYearChange = (event: Event) => {
    const eventVal = (event.target as HTMLInputElement).value;
    this.selectedYear = parseInt(eventVal);
    this.initOptions();
    this.dateChangedEvent.emit(this.selDate());
  }
}
