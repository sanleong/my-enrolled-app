import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { Element } from './element-interface'
import { DatePipe } from '@angular/common';
import {ThemePalette} from '@angular/material/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  displayedColumns = ['id', 'name', 'active', 'dateOfBirth'];
  dataSource;
  enrolles;
  color: ThemePalette = 'primary';
  constructor(private apiService: ApiService, public datepipe: DatePipe) {

  }

  ngOnInit() {
    this.apiService.getEnrolles().subscribe((data)=>{
      console.log(data);
      this.enrolles = data;
      //this.dataSource = new ExampleDataSource(this.enrolles);
      this.dataSource = this.enrolles;
    });
  }

  update(el: Element, name: string) {
    if (name == null) { return; }
    // Update name
    el.name = name;
    this.apiService.putEnrolled(el)
  }

  updateStatus(el: Element, event: MatSlideToggleChange) {
    console.log(el.active);
    el.active = event.checked;
    // Update name
    this.apiService.putEnrolled(el)
  }

  formattedDate(dob) {
    const formattedDob = this.datepipe.transform(dob, 'dd/MM/yyyy');
    if (formattedDob)
      return formattedDob;

    return dob
  }
}
