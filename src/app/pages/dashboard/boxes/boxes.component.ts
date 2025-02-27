import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-boxes',
  templateUrl: './boxes.component.html',
  styleUrls: ['./boxes.component.scss']
})
export class BoxesComponent implements OnInit {
  @Input() public icon = '';
  @Input() public englishText = '';
  @Input() public arabicText = '';
  @Input() public link = '';

  constructor() { }

  ngOnInit() {
  }

}
