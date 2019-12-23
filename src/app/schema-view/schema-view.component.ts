import { Component, OnInit } from '@angular/core';
import { of, Observable } from "rxjs";

@Component({
  selector: 'app-schema-view',
  templateUrl: './schema-view.component.html',
  styleUrls: ['./schema-view.component.scss']
})
export class SchemaViewComponent implements OnInit {

  public configStage: Observable<any> = of({
    width: 500,
    height: 500
  });
  public configCircle: Observable<any> = of({
    x: 100,
    y: 100,
    radius: 20,
    fill: "darkgrey",
    stroke: "black",
    strokeWidth: 1,
    draggable: true,
  });

  public handleClick(component) {
    console.log("Hello Circle", component);
  }

  constructor() { }

  ngOnInit() {
  }

}
