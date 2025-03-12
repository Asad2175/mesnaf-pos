import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-boxes',
  templateUrl: './boxes.component.html',
  styleUrls: ['./boxes.component.scss']
})
export class BoxesComponent {
  @Input() public icon = '';
  @Input() public englishText = '';
  @Input() public arabicText = '';
  @Input() public link = '';
}
