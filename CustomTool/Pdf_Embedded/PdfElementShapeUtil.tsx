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

import { PdfElementShapeMigrations } from './pdfElement-shape-migrations'
import { PdfElementShapeProps } from './pdfElement-shape-props'
import { allowChangesStyle, IPdfElementShape } from './pdfElement-shape-types'




export class PdfElementShapeUtil extends ShapeUtil<IPdfElementShape> {
    static override type = 'pdfElement' as const
    // [1]
    static override props = PdfElementShapeProps
    // [2]
    static override migrations = PdfElementShapeMigrations

    // [3]
    override isAspectRatioLocked(_shape: IPdfElementShape) {
        return false
    }
    override canResize(_shape: IPdfElementShape) {
        return true
    }


    // [4]
    getDefaultProps(): IPdfElementShape['props'] {
        return {
            w: 300,
            h: 300,
            allowChanges: allowChangesStyle.defaultValue || true,
        }
    }


    // [5]
    getGeometry(shape: IPdfElementShape) {
        return new Rectangle2d({
            width: shape.props.w,
            height: shape.props.h,
            isFilled: true,
        })
    }


    // [6]
    component(shape: IPdfElementShape) {
        const bounds = this.editor.getShapeGeometry(shape).bounds
        const theme = getDefaultColorTheme({ isDarkMode: this.editor.user.getIsDarkMode() })
        const allowChanges = shape.props.allowChanges;
        
        /*
        if(!shape.isLocked && !allowChanges) {
            this.editor.toggleLock([shape.id])
        }
        */

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
                    width: '100%',
                    height: '100%',
                }}
            >   
                <object
                    data="pdf/input2.pdf"
                    type="application/pdf"
                    width="100%"
                    height="100%"
                    style={{ 
                        pointerEvents: allowChanges ? 'all' : 'none',
                        border: '10px solid rgba(0, 0, 0, 0)'
                    }}
                ></object>
            </HTMLContainer>
        )
    }

    // [7]
    indicator(shape: IPdfElementShape) {
        return <rect width={shape.props.w} height={shape.props.h} />
    }

    // [8]
    override onResize(shape: IPdfElementShape, info: TLResizeInfo<IPdfElementShape>) {
        return resizeBox(shape, info)
    }
}

