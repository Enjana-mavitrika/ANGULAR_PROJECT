import { Component, OnInit } from '@angular/core';
import Konva from 'konva';
import Schema from '../schema';

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

  constructor() { }

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

  addEauChaude() {
    this.schema.addEauChaude();
  }

  addEauFroide() {
    this.schema.addEauFroide();
  }

  clear() {
    this.schema.clear();
  }

  save() {
    this.schema.save();
  }

  load() {
    this.schema.load();
  }


}
