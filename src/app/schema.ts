import Konva from 'konva';
import Shape from './shape';
import Line from './line';

export default class Schema {

  stage: Konva.Stage;
  layer: Konva.Layer;
  shapes: Shape[] = [];
  lines: Line[] = [];
  selectedShape: Shape;

  constructor(container: string = 'schema-view-konva', width: number = 1000, height: number = 700) {
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
    const newLines = this.lines.filter((line) => line !== this.selectedShape);
    this.shapes = newShapes;
    this.lines = newLines;
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
    for (let line of this.lines) {
      if (line.konvaNode === shapeNode) {
        return line;
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

  private shapesToJson() {
    const shapes = [];
    for (let shape of this.shapes) {
      shapes.push(shape.toJSON());
    }
    return JSON.stringify(shapes);
  }

  private linesToJson() {
    const lines = [];
    for (let line of this.lines) {
      lines.push(line.toJSON());
    }
    return JSON.stringify(lines);
  }

  private jsonToShapes(shapesJSON: string) {
    const shapes = JSON.parse(shapesJSON);
    const shapesObj = [];
    for (let shape of shapes) {
      shapesObj.push(Shape.create(shape));
    }
    return shapesObj;
  }

  private jsonToLines(linesJSON: string) {
    const lines = JSON.parse(linesJSON);
    const linesObj = [];
    for (let line of lines) {
      linesObj.push(Line.create(line));
    }
    return linesObj;
  }

  public save() {
    const shema = { shapes : this.shapesToJson(), lines: this.linesToJson() };
    localStorage.setItem('schema', JSON.stringify(shema));
  }

  public load() {
    this.clear();
    const shema = JSON.parse(localStorage.getItem('schema'));
    this.shapes = this.jsonToShapes(shema.shapes);
    this.lines = this.jsonToLines(shema.lines);
    this.drawAll();
  }

  private drawAll(): void {
    for (let shape of this.shapes) {
      shape.draw(this.layer);
    }
    for (let line of this.lines) {
      line.draw(this.layer);
    }
  }

  public addToilette() {
    const toilette = new Shape('toilette');
    toilette.draw(this.layer);
    this.shapes.push(toilette);
  }

  public addLavabo() {
    const lavabo = new Shape('lavabo');
    lavabo.draw(this.layer);
    this.shapes.push(lavabo);
  }

  public addEvier() {
    const evier = new Shape('evier');
    evier.draw(this.layer);
    this.shapes.push(evier);
  }

  public addEvier2() {
    const evier2 = new Shape('evier2');
    evier2.draw(this.layer);
    this.shapes.push(evier2);
  }

  public addDouche() {
    const douche =  new Shape('douche');
    douche.draw(this.layer);
    this.shapes.push(douche);
  }

  public addPiece() {
    const piece = new Shape('piece');
    piece.draw(this.layer);
    this.shapes.push(piece);
  }

  public addSol() {
    const sol = new Shape('sol');
    sol.draw(this.layer);
    this.shapes.push(sol);
  }

  public addEauChaude() {
    const eauChaude = new Line('eau-chaude');
    eauChaude.draw(this.layer);
    this.lines.push(eauChaude);
  }

  public addEauFroide() {
    const eauFroide = new Line('eau-froide');
    eauFroide.draw(this.layer);
    this.lines.push(eauFroide);
  }

  public addRaccordEauChaude() {
    const raccord = new Shape('raccord-eau-chaude');
    raccord.draw(this.layer);
    this.shapes.push(raccord);
  }

  public addRaccordEauFroide() {
    const raccord = new Shape('raccord-eau-froide');
    raccord.draw(this.layer);
    this.shapes.push(raccord);
  }

  public addChauffeEau() {
    const chauffeEau = new Shape('chauffe-eau');
    chauffeEau.draw(this.layer);
    this.shapes.push(chauffeEau);
  }

  public addLaveLinge() {
    const laveLinge = new Shape('lave-linge');
    laveLinge.draw(this.layer);
    this.shapes.push(laveLinge);
  }

  public addLaveVaisselle() {
    const laveVaisselle = new Shape('lave-vaisselle');
    laveVaisselle.draw(this.layer);
    this.shapes.push(laveVaisselle);
  }

  public addBaignoire() {
    const baignoire = new Shape('baignoire');
    baignoire.draw(this.layer);
    this.shapes.push(baignoire);
  }

  public clear() {
    // clean layer
    this.layer.removeChildren();
    // delete all shape nodes
    for (let shape of this.shapes) {
      shape.delete();
    }
    // delete all line nodes
    for (let line of this.lines) {
      line.delete();
    }
    // reinit shapes state
    this.shapes = [];
    // reinit lines state
    this.lines = [];
    this.layer.batchDraw();
  }
}
