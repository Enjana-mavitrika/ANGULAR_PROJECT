import Konva from 'konva';
import Shape from './shape';

export default class Line extends Shape {

    konvaNode: Konva.Line;
    anchor1: Konva.Circle;
    anchor2: Konva.Circle;

    constructor(type: string, konvaNode: string = null) {
        super(type, konvaNode);
    }

    public delete() {
        super.delete();
        this.anchor1.destroy();
        this.anchor2.destroy();
    }

    public draw(layer: Konva.Layer): void {
        const attrs = this.getKonvaNodeAttrs();
        switch (this.type) {
            case 'eau-chaude':
                this.createLine(layer, attrs.points, 'red', 5);
                break;
            case 'eau-froide':
                this.createLine(layer, attrs.points, 'blue', 5);
            default:
                break;
        }
    }

    protected getKonvaNodeAttrs() {
        const attrs = {
            points: [50, 50, 250, 50],
        }
        if (this.konvaNode && this.konvaNode.attrs) {
            attrs.points = this.konvaNode.points();
        }

        return attrs;
    }

    private createLine(layer: Konva.Layer, points: number[], stroke: string, strokeWidth: number): void {
        const lineNode = new Konva.Line({
            points,
            stroke,
            strokeWidth,
            opacity: 0.8,
        });
        // add the line to the layer
        layer.add(lineNode);
        layer.batchDraw();
        // add anchors to manipulate the line
        const anchor1 = new Konva.Circle({
            x: lineNode.points()[0],
            y: lineNode.points()[1],
            radius: 8,
            fill: stroke,
            draggable: true,
            opacity: 0.8,
        })
        layer.add(anchor1);
        const anchor2 = new Konva.Circle({
            x: lineNode.points()[2],
            y: lineNode.points()[3],
            radius: 8,
            fill: stroke,
            draggable: true,
            opacity: 0.8,
        })
        layer.add(anchor2);
        // update line when moving anchors
        anchor1.on('dragmove', () => {
            const points = [
                anchor1.x(),
                anchor1.y(),
                anchor2.x(),
                anchor2.y(),
            ];
            lineNode.points(points);
            layer.batchDraw();
        });
        anchor2.on('dragmove', () => {
            const points = [
                anchor1.x(),
                anchor1.y(),
                anchor2.x(),
                anchor2.y(),
            ]
            lineNode.points(points);
            layer.batchDraw();
        });

        this.konvaNode = lineNode;
        this.anchor1 = anchor1;
        this.anchor2 = anchor2;
    }

    static create(shapeJSON: string): Line {
        const shape = JSON.parse(shapeJSON);
        return new Line(shape.type, shape.konvaNode);
    }

}