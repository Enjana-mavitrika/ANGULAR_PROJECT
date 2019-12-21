import { Component, OnInit } from '@angular/core';
import { Robinet } from './robinet';
import { ROBINETS } from './mock-robinets';

@Component({
  selector: 'app-materiels',
  templateUrl: './materiels.component.html',
  styleUrls: ['./materiels.component.scss']
})
export class MaterielsComponent implements OnInit {

  robinets = ROBINETS;
  selectedRobinet: Robinet;

  constructor() { }

  ngOnInit() {
  }

  onSelect(robinet: Robinet) : void {
    this.selectedRobinet = robinet;
  }

}
