import { Component, OnInit } from '@angular/core';
import Konva from 'konva';
import { ShapeService } from '../shape.service';

@Component({
  selector: 'app-schema-view-konva',
  templateUrl: './schema-view-konva.component.html',
  styleUrls: ['./schema-view-konva.component.scss']
})
export class SchemaViewKonvaComponent implements OnInit {

  shapes: any = [];
  stage: Konva.Stage;
  layer: Konva.Layer;
  transformers: Konva.Transformer[] = [];

  selectedButton: any = {
    'toilette': false,
    'lavabo': false,
  }

  constructor(private shapeService: ShapeService) { }

  ngOnInit() {
    this.stage = new Konva.Stage({
      container: 'schema-view-konva',
      width: 900,
      height: 700,
      draggable: true,
    });
    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
  }

  clearSelection() {
    Object.keys(this.selectedButton).forEach(key => {
      this.selectedButton[key] = false;
    });
  }

  setSelection(type: string) {
    this.selectedButton[type] = true;
  }

  addShape(type: string) {
    this.clearSelection();
    this.setSelection(type);
    if (type == 'toilette') {
      this.addToilette();
    }
    else if (type == 'lavabo') {
      this.addLavabo();
    }
  }

  addToilette() {
    const toilette = this.shapeService.imgNode(this.stage, this.layer, 'bathroom/toilette.png');
    this.shapes.push(toilette.imgNode);
    this.transformers.push(toilette.tr);
  }

  addLavabo() {
    const lavabo = this.shapeService.imgNode(this.stage, this.layer, 'bathroom/lavabo.png');
    this.shapes.push(lavabo.imgNode);
    this.transformers.push(lavabo.tr);
  }


}
