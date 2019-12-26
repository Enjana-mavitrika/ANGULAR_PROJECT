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
    console.log('draw shape');
    const attrs = this.getKonvaNodeAttrs();
    switch (this.type) {
      case 'toilette':
        this.konvaNode = this.imgNode(layer, 'bathroom/toilette.png', attrs.x, attrs.y, attrs.width, attrs.height);
        break;
      case 'lavabo':
        this.konvaNode = this.imgNode(layer, 'bathroom/lavabo.png', attrs.x, attrs.y, attrs.width, attrs.height);
        break;
      case 'piece':
        this.konvaNode = this.rectangle(layer, attrs.x, attrs.y, attrs.width, attrs.height);
        break;
      default:
        break;
    }
  }

  protected getKonvaNodeAttrs(): any {
    const attrs = {
      x: 50,
      y: 50,
      width: 100,
      height: 100,
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



  private imgNode(layer: Konva.Layer, img: string, x: number = 50, y: number = 50, width: number = 100, height: number = 100): Konva.Node {
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

    return imgNode;
  }

  private rectangle(layer: Konva.Layer, x: number = 50, y: number = 50, width: number = 100, height: number = 100): Konva.Node {
    const rectNode = new Konva.Rect({
      x: x,
      y: y,
      width: width,
      height: height,
      name: 'shape',
      fillEnable: false,
      stroke: 'grey',
      strokeWidth: 4,
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

    return rectNode;
  }
}
