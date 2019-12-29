import Konva from 'konva';

export default class Shape {
  type: string;
  konvaNode: Konva.Node;

  constructor(type: string, konvaNode: string = null) {
    this.type = type;
    if (konvaNode !== null) {
      // convert Konva Node JSON to Konva.Node object
      this.konvaNode = Konva.Node.create(konvaNode);
    }
  }

  public delete() {
    this.konvaNode.destroy();
  }

  public draw(layer: Konva.Layer): void {
    const attrs = this.getKonvaNodeAttrs();
    switch (this.type) {
      case 'toilette':
        this.createImgNode(layer, 'bathroom/toilette.png', attrs.x, attrs.y, attrs.width, attrs.height);
        break;
      case 'lavabo':
        this.createImgNode(layer, 'bathroom/lavabo.png', attrs.x, attrs.y, attrs.width, attrs.height);
        break;
      case 'evier':
        this.createImgNode(layer, 'bathroom/evier.png', attrs.x, attrs.y, attrs.width, attrs.height);
        break;
      case 'evier2':
        this.createImgNode(layer, 'bathroom/evier2.png', attrs.x, attrs.y, attrs.width, attrs.height);
        break;
      case 'douche':
        this.createImgNode(layer, 'bathroom/douche.png', attrs.x, attrs.y, attrs.width, attrs.height);
        break;
      case 'piece':
        this.createRectangle(layer, attrs.x, attrs.y, attrs.width, attrs.height);
        break;
      case 'raccord-eau-chaude':
        this.createRectangle(layer, attrs.x, attrs.y, attrs.width, attrs.height, 'white', 'red', 5);
        break;
      case 'raccord-eau-froide':
        this.createRectangle(layer, attrs.x, attrs.y, attrs.width, attrs.height, 'white', 'blue', 5);
        break;
      case 'sol':
        this.createImgNode(layer, 'piece/sol.png', attrs.x, attrs.y, attrs.width, attrs.height); 
        break;
      case 'lave-linge':
        this.createImgNode(layer, 'menager/lave-linge.png', attrs.x, attrs.y, attrs.width, attrs.height); 
        break;
      case 'lave-vaisselle':
        this.createImgNode(layer, 'menager/lave-vaisselle.png', attrs.x, attrs.y, attrs.width, attrs.height); 
        break;
      case 'chauffe-eau':
        this.createImgNode(layer, 'menager/chauffe-eau.png', attrs.x, attrs.y, attrs.width, attrs.height); 
        break;
      case 'baignoire':
        this.createImgNode(layer, 'menager/baignoire.png', attrs.x, attrs.y, attrs.width, attrs.height); 
        break;
      default:
        break;
    }
  }

  protected getKonvaNodeAttrs(): any {
    let width = 100;
    let height = 100;
    switch(this.type) {
      case 'raccord-eau-chaude':
      case 'raccord-eau-froide': width = 50; height = 15; break;
      default: break;      
    }
    const attrs = {
      x: 50,
      y: 50,
      width,
      height,
    };
    if (this.konvaNode && this.konvaNode.attrs !== null) {
      attrs.x = this.konvaNode.attrs.x;
      attrs.y = this.konvaNode.attrs.y;
      attrs.width = this.konvaNode.attrs.width;
      attrs.height = this.konvaNode.attrs.height;
    }
    return attrs;
  }

  public toJSON(): any {
    const shape: any = {
      type: '',
      konvaNode: '',
    }
    shape.konvaNode = this.konvaNode.toJSON();
    shape.type = this.type;
    return JSON.stringify(shape);
  }

  static create(shapeJSON: string) : Shape{
    const shape = JSON.parse(shapeJSON);
    return new Shape(shape.type, shape.konvaNode);
  }



  private createImgNode(layer: Konva.Layer, img: string, x: number = 50, y: number = 50, width: number = 100, height: number = 100): void {
    // create img node
    let imageObj = new Image();
    imageObj.src = `/assets/images/icons/${img}`;
    const imgNode = new Konva.Image({
      x: x,
      y: y,
      image: imageObj,
      width: width,
      height: height,
      name: 'shape',
      draggable: true,
    });
    // add the shape to the layer
    layer.add(imgNode);
    layer.batchDraw();
    // handleTransform event
    imgNode.on('transform', function () {
      // reset scale
      imgNode.setAttrs({
        width: imgNode.width() * imgNode.scaleX(),
        height: imgNode.height() * imgNode.scaleY(),
        scaleX: 1
      });
    });

    this.konvaNode = imgNode;
  }

  private createRectangle(layer: Konva.Layer, x: number = 50, y: number = 50, width: number = 100, height: number = 100, fill: string = '', stroke: string = 'grey', strokeWidth: number = 4): void {
    const rectNode = new Konva.Rect({
      x,
      y,
      width,
      height,
      name: 'shape',
      fillEnable: (fill.length > 0),
      stroke,
      strokeWidth,
      draggable: true,
      strokeScaleEnabled: false,
    });
    // add the shape to the layer
    layer.add(rectNode);
    layer.batchDraw();
    // handle tranform event
    rectNode.on('transform', function () {
      // reset scale
      rectNode.setAttrs({
        width: rectNode.width() * rectNode.scaleX(),
        height: rectNode.height() * rectNode.scaleY(),
        scaleX: 1
      });
    });

    this.konvaNode = rectNode;
  }
}
