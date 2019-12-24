import { Component, OnInit } from '@angular/core';
import Konva from 'konva';
import { ShapeService } from '../shape.service';
import { Schema } from '../schema';

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
  schema: Schema;

  selectedButton: any = {
    'toilette': false,
    'lavabo': false,
    'piece': false,
  }

  save() {
    // save shapes
    const shapesRepo = [];
    for (let shape of this.shapes) {
      shapesRepo.push(shape.toJSON())
    }
    localStorage.setItem('shapesRepo', JSON.stringify(shapesRepo));
    // save stage
    const stageRepo = this.stage.toJSON();
    localStorage.setItem('stageRepo', stageRepo);
    // save layer
    const layerRepo = this.layer.toJSON();
    localStorage.setItem('layerRepo', layerRepo);
    // save transformers
    const transformersRepo = [];
    for (let tr of this.transformers) {
      transformersRepo.push(tr.toJSON());
    }
    localStorage.setItem('transformersRepo', JSON.stringify(transformersRepo));
  }

  load() {
    // load stage
    const stageRepo = localStorage.getItem('stageRepo');
    this.stage = Konva.Node.create(stageRepo, 'schema-view-konva');
    // load layer
    const layerRepo = localStorage.getItem('layerRepo');
    this.layer = Konva.Node.create(layerRepo);
    this.layer.destroyChildren();
    // load shapes
    const shapesRepo = JSON.parse(localStorage.getItem('shapesRepo'));
    this.shapes = [];
    for (let shape of shapesRepo) {
      console.log(Konva.Node.create(shape))
      this.shapes.push(Konva.Node.create(shape));
      this.layer.add(Konva.Node.create(shape));
    }
    // load transformers
    const transformersRepo = JSON.parse(localStorage.getItem('transformersRepo'));
    this.transformers = [];
    for (let tr of transformersRepo) {
      this.transformers.push(Konva.Node.create(tr));
    }
    // draw
    this.stage.add(this.layer);
    this.layer.batchDraw();
  }

  constructor(private shapeService: ShapeService) { }

  ngOnInit() {
    this.schema = new Schema();
  }

  clearSelection() {
    Object.keys(this.selectedButton).forEach(key => {
      this.selectedButton[key] = false;
    });
  }

  setSelection(type: string) {
    this.selectedButton[type] = true;
  }

  addToilette() {
    this.schema.addToilette();
  }

  addLavabo() {
    this.schema.addLavabo();
  }

  addPiece() {
    this.schema.addPiece();
  }

  clear() {
    this.schema.clear();
  }


}
