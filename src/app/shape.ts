import Konva from 'konva';

export class Shape {
    type: string;
    konvaNode: Konva.Node;

    constructor(type: string, konvaNode: string = null) {
        this.type = type;
        if (konvaNode !== null) {
          // convert Konva Node JSON to Konva.Node object
          this.konvaNode = Konva.Node.create(konvaNode);
        }
    }

    public draw(stage: Konva.Stage, layer: Konva.Layer): void {
      const attrs = this.getKonvaNodeAttrs();
      switch(this.type) {
        case 'toilette':
          const toilette = this.imgNode(stage, layer, 'bathroom/toilette.png', attrs.x, attrs.y, attrs.width, attrs.height);
          this.konvaNode = toilette.imgNode;
          break;
        case 'lavabo':
          const lavabo = this.imgNode(stage, layer, 'bathroom/lavabo.png', attrs.x, attrs.y, attrs.width, attrs.height);
          this.konvaNode = lavabo.imgNode;
          break;
        case 'piece':
          const piece = this.rectangle(stage, layer, attrs.x, attrs.y, attrs.width, attrs.height);
          this.konvaNode = piece.rectNode;
      }
    }

    private getKonvaNodeAttrs(): any {
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

    public toJSON() : any {
      const shape: any = {
        type: '',
        konvaNode: '',
      }
      shape.konvaNode = this.konvaNode.toJSON();
      shape.type = this.type;
      return JSON.stringify(shape);
    }

    static create(shapeJSON: string) {
      const shape = JSON.parse(shapeJSON);
      return new Shape(shape.type, shape.konvaNode);
    }

    
    
    private imgNode(stage: Konva.Stage, layer: Konva.Layer, img: string, x: number=50, y: number=50, width: number=100, height: number=100) {
      // create img node
      let imageObj = new Image();
      imageObj.src = `/assets/images/icons/${img}`;
      const imgNode = new Konva.Image({
        x: x,
        y: y,
        image: imageObj,
        width: width,
        height: height,
        draggable: true,
      });
  
      // add the shape to the layer
      layer.add(imgNode);
      layer.batchDraw();
  
      // add transformer
      let tr = new Konva.Transformer({
        node: imgNode as any,
        keepRatio: true,
        enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
        rotateEnabled: false,
      });
      stage.on('click', function (e) {
        if (!this.clickStartShape) {
          return;
        }
        if (e.target._id == this.clickStartShape._id) {
          layer.add(tr);
          tr.attachTo(e.target);
          layer.draw();
        }
        else {
          tr.detach();
          layer.draw();
        }
      });
  
      imgNode.on('transform', function () {
        // reset scale
        imgNode.setAttrs({
          width: imgNode.width() * imgNode.scaleX(),
          height: imgNode.height() * imgNode.scaleY(),
          scaleX: 1
        });
      });
      layer.add(tr);
      layer.draw();
  
      return { imgNode, tr };
  
    }
  
    private rectangle(stage: Konva.Stage, layer: Konva.Layer, x: number=50, y: number=50, width: number=100, height: number=100) {
      const rectNode = new Konva.Rect({
        x: x,
        y: y,
        width: width,
        height: height,
        fillEnable: false,
        stroke: 'grey',
        strokeWidth: 4,
        draggable: true,
        strokeScaleEnabled: false,
      });
  
      // add the shape to the layer
      layer.add(rectNode);
      layer.batchDraw();
      
      // add transformer
      let tr = new Konva.Transformer({
        node: rectNode as any,
        keepRatio: false,
        enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
        rotateEnabled: false,
        ignoreStroke: true,
      });
      stage.on('click', function (e) {
        if (!this.clickStartShape) {
          return;
        }
        if (e.target._id == this.clickStartShape._id) {
          layer.add(tr);
          tr.attachTo(e.target);
          layer.draw();
        }
        else {
          tr.detach();
          layer.draw();
        }
      });
  
      // add transformer to the layer
      layer.add(tr);
      layer.draw();
  
      return { rectNode, tr };
    }

}
