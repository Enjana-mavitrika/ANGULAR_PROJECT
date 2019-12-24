import { Injectable } from '@angular/core';
import Konva from 'konva';

@Injectable({
  providedIn: 'root'
})
export class ShapeService {

  constructor() { }

  imgNode(stage: Konva.Stage, layer: Konva.Layer, img: string, x: number=50, y: number=50, width: number=100, height: number=100) {
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
      // reset scale, so only with is changing by transformer
      imgNode.setAttrs({
        width: imgNode.width() * imgNode.scaleX(),
        scaleX: 1
      });
    });
    layer.add(tr);
    layer.draw();

    return { imgNode, tr };

  }

  rectangle(stage: Konva.Stage, layer: Konva.Layer) {
    const rectNode = new Konva.Rect({
      x: 20,
      y: 20,
      width: 100,
      height: 50,
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
