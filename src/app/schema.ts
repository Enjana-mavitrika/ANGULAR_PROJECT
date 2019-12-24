import Konva from 'konva';
import { Shape } from './shape';

export class Schema {

  stage: Konva.Stage;
  layer: Konva.Layer;
  shapes: Shape[] = [];
  selectedShape: Shape;

  constructor(container: string = 'schema-view-konva', width: number = 900, height: number = 700) {
    this.stage = new Konva.Stage({
      container: container,
      width: width,
      height: height,
      draggable: true,
    });
    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
    this.onClickStage();
    this.onKeydown();
  }

  private onKeydown() {
    document.addEventListener('keydown', (e) => {
      // if press delete on selected shape
      if (this.selectedShape && e.keyCode == 46) {
        e.preventDefault();
        this.removeSelectedShape();
      }
    });
  }

  private removeSelectedShape() {
    this.selectedShape.delete();
    this.deleteTransformers();
    const newShapes = this.shapes.filter((shape) => shape !== this.selectedShape);
    this.shapes = newShapes;
    this.layer.batchDraw();
  }

  private onClickStage() {
    this.stage.on('click tap', (e) => {
      // select shape on click
      this.selectedShape = this.findShape(e.target);
      // add transformer to shape on click
      this.addTransformerToSelectedShape(e.target);
    });
  }

  private findShape(shapeNode: Konva.Node): Shape {
    for (let shape of this.shapes) {
      if (shape.konvaNode === shapeNode) {
        return shape;
      }
    }
  }

  private addTransformerToSelectedShape(shape: Konva.Node) {
    // if click on empty area - remove all transformers
    if (shape === this.stage) {
      this.deleteTransformers();
      this.layer.draw();
      return;
    }
    // do nothing if clicked NOT on our rectangles
    if (!shape.hasName('shape')) {
      return;
    }
    // remove old transformers
    this.deleteTransformers();
    this.addTranformer(shape);
  }

  private deleteTransformers() {
    const transformers = this.stage.find('Transformer');
      transformers.each((tr) => {
        tr.destroy();
      });
  }

  private addTranformer(shape: Konva.Node) {
    const tr = new Konva.Transformer({
      keepRatio: false,
    });
    this.layer.add(tr);
    tr.attachTo(shape);
    this.layer.draw();
  }

  public shapesToJson() {
    const shapes = [];
    for (let shape of this.shapes) {
      shapes.push(shape.toJSON());
    }
    return JSON.stringify(shapes);
  }

  public JsonToShapes(shapesJSON: string) {
    const shapes = JSON.parse(shapesJSON);
    const shapesObj = [];
    for (let shape of shapes) {
      shapesObj.push(Shape.create(shape));
    }
    return shapesObj;
  }

  public save() {
    localStorage.setItem('schema', this.shapesToJson());
  }

  public load() {
    this.clear();
    this.shapes = this.JsonToShapes(localStorage.getItem('schema'));
    this.drawAll();
  }

  private drawAll(): void {
    for (let shape of this.shapes) {
      shape.draw(this.stage, this.layer);
    }
  }

  public addToilette() {
    const toilette = new Shape('toilette');
    toilette.draw(this.stage, this.layer);
    this.shapes.push(toilette);
  }

  public addLavabo() {
    const lavabo = new Shape('lavabo');
    lavabo.draw(this.stage, this.layer);
    this.shapes.push(lavabo);
  }

  public addPiece() {
    const piece = new Shape('piece');
    piece.draw(this.stage, this.layer);
    this.shapes.push(piece);
  }

  public clear() {
    // clean layer
    this.layer.removeChildren();
    // delete all shape nodes
    for (let shape of this.shapes) {
      shape.delete();
    }
    // reinit shapes state   
    this.shapes = [];
    this.layer.batchDraw();
  }
}
