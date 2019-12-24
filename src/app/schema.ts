import Konva from 'konva';
import { Shape } from './shape';

export class Schema {
  stage: Konva.Stage;
  layer: Konva.Layer;
  shapes: Shape[] = [];

  constructor(container: string = 'schema-view-konva', width: number = 900, height: number = 700) {
    this.stage = new Konva.Stage({
      container: container,
      width: width,
      height: height,
      draggable: true,
    });
    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
  }

  public draw(): void {
    // clean 
    this.layer.removeChildren();
    // draw shapes
    for (let shape of this.shapes) {
      shape.draw(this.stage, this.layer);
    }
    this.stage.batchDraw();
  }

  public addToilette() {
    const toilette = new Shape('toilette');
    this.shapes.push(toilette);
    this.draw();
  }

  public addLavabo() {
    const lavabo = new Shape('lavabo');
    this.shapes.push(lavabo);
    this.draw();
  }

  public addPiece() {
    const piece = new Shape('piece');
    this.shapes.push(piece);
    this.draw();
  }
  
  public clear() {
    this.shapes = [];
    this.draw();
  }
}
