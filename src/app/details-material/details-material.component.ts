import { Component, OnInit, Input } from '@angular/core';
import { Robinet } from '../materiels/robinet';

@Component({
  selector: 'app-details-material',
  templateUrl: './details-material.component.html',
  styleUrls: ['./details-material.component.scss']
})
export class DetailsMaterialComponent implements OnInit {

  @Input() robinet: Robinet;

  constructor() { }

  ngOnInit() {
  }

}