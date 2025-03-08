import { useState } from 'react'
import React from 'react';
import {
    HTMLContainer,
    Rectangle2d,
    ShapeUtil,
    TLResizeInfo,
    TLShapeId,
    getDefaultColorTheme,
    resizeBox,
} from 'tldraw'

import { TableShapeMigrations } from './table-shape-migrations'
import { TableShapeProps } from './table-shape-props'
import { ITableShape } from './table-shape-types'




export class TableShapeUtil extends ShapeUtil<ITableShape> {
    static override type = 'table' as const
    // [1]
    static override props = TableShapeProps
    // [2]
    static override migrations = TableShapeMigrations

    // [3]
    override isAspectRatioLocked(_shape: ITableShape) {
        return false
    }
    override canResize(_shape: ITableShape) {
        return true
    }


    // [4]
    getDefaultProps(): ITableShape['props'] {
        return {
            w: 300,
            h: 300,
            color: 'black',
            //size: 'm',
            x_cells: 3,
            y_cells: 2,
            wantHead: true,
	        cellWidth: 80,
	        cellHeight: 80,
            borderWidth: 2,
        }
    }


    // [5]
    getGeometry(shape: ITableShape) {
        return new Rectangle2d({
            width: shape.props.w,
            height: shape.props.h,
            isFilled: true,
        })
    }


	updateShapeDim(id: string, width: number, height: number) {
		//const shapeUpdate = this.shapeUpdate(id, width, height);
		this.editor.updateShape<ITableShape>({
            id: id as TLShapeId,
            type: 'table',
            props: {
                w: width,
                h: height,
            },
        });
	}

    updateNCellsShape(id: string, x_cells: number, y_cells: number) {
		//const shapeUpdate = this.shapeUpdate(id, width, height);
		this.editor.updateShape<ITableShape>({
            id: id as TLShapeId,
            type: 'table',
            props: {
                x_cells: x_cells,
                y_cells: y_cells,
            },
        });
	}



    // [6]
    component(shape: ITableShape) {
        const bounds = this.editor.getShapeGeometry(shape).bounds
        const theme = getDefaultColorTheme({ isDarkMode: this.editor.user.getIsDarkMode() })
        const primaryColor = theme[shape.props.color].solid;
        const borderWidth = shape.props.borderWidth.toString() + 'px';
        const borderColor = primaryColor;

        //MetaUiHelperr({ values: 1 });
        

        let xCells = shape.props.x_cells;
        let yCells = shape.props.y_cells;
        const wantHead = shape.props.wantHead;

        /*
        if (xCells <= 0) {
            xCells = 1;
        }
        if (yCells <= 0) {
            yCells = 1;
        }

        //this.updateNCellsShape(shape.id, xCells, yCells);
        //*/

        const cellWidth = shape.props.cellWidth;
        const cellHeight = shape.props.cellHeight;

        const newWidth = cellWidth * xCells;
        let newHeight = cellHeight * yCells;

        if (wantHead == true){
           newHeight += 10;
        }
        
        this.updateShapeDim(shape.id, newWidth, newHeight);
            

        return (
            <HTMLContainer
                id={shape.id}
                style={{
                    border: '0px solid black',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'all',
                    color: primaryColor,					
                    width: '100%',
                    height: '100%',
                }}
            >
                <table style={{ border: '0px solid red', marginTop: '0px', width: '100%', height: '100%', borderCollapse: 'collapse' }}>
                    {wantHead && (
                        <thead>
                            <tr>
                                {Array.from({ length: xCells }).map((_, index) => (
                                    <th key={index} style={{ border: `${borderWidth} solid ${borderColor}`, padding: '5px'}}>
                                        
                                    </th>
                                ))}
                            </tr>
                        </thead>
                    )}
                    <tbody>
                        {Array.from({ length: yCells }).map((_, rowIndex) => (
                            <tr key={rowIndex}>
                                {Array.from({ length: xCells }).map((_, cellIndex) => (
                                    <td key={cellIndex} style={{ border: `${borderWidth} solid ${borderColor}`, padding: '5px'}}>
                                        
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </HTMLContainer>
        )
    }

    // [7]
    indicator(shape: ITableShape) {
        return <rect width={shape.props.w} height={shape.props.h} />
    }

    // [8]
    override onResize(shape: ITableShape, info: TLResizeInfo<ITableShape>) {
        const resizedShape = resizeBox(shape, info)

        const newCellWidth = shape.props.w * info.scaleX / shape.props.x_cells;
        const newCellHeight = shape.props.h * info.scaleY / shape.props.y_cells;

        return {
            ...resizedShape,
            props: {
                ...resizedShape.props,
                cellWidth: newCellWidth,
                cellHeight: newCellHeight,
            }
        }
        //return resizeBox(shape, info)
    }
}

