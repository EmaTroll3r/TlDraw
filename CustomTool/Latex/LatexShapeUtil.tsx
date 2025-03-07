import React from 'react'
import { useState } from "react";
import { HTMLContainer, Rectangle2d, ShapeUtil, TLBaseShape, TLResizeInfo, resizeBox } from 'tldraw'
import Latex from 'react-latex-next';	//npm install react-latex-next
import { LatexShapeProps } from './latex-shape-props';
import 'katex/dist/katex.min.css';
import { ILatexShape } from './latex-shape-types';


export class LatexShapeUtil extends ShapeUtil<ILatexShape> {
    static override type = 'latex' as const
    static override props = LatexShapeProps

    getDefaultProps(): ILatexShape['props'] {
            return {
            w: 100,
            h: 100,
            text: 'f(x) E=mc^2 \\sum_{i=0}^{\\infty} \\frac{1}{n^2}',
            color: 'black',
            fontSize: 20,
        }
    }

    override canResize() {
        return true
    }

    getGeometry(shape: ILatexShape) {
        return new Rectangle2d({
            width: shape.props.w,
            height: shape.props.h,
            isFilled: true,
        })
    }

    
    override onResize(shape: ILatexShape, info: TLResizeInfo<ILatexShape>) {
        const resizedShape = resizeBox(shape, info)
        const { scaleX, scaleY } = info
    
        let newFontSize = shape.props.fontSize
    
        if (scaleX !== 1 && scaleY === 1) {
            // Resize only along the X axis
            //newFontSize = (resizedShape.props.w / shape.props.w) * shape.props.fontSize
            
            console.log('Resizing along X axis')
        } else if (scaleY !== 1) {
            // Resize along Y axis or both axes, maintain proportions
            console.log('both axes')
            const scale = scaleY
            resizedShape.props.w = shape.props.w * scale
            resizedShape.props.h = shape.props.h * scale
            //newFontSize = shape.props.fontSize * scale
        }
    
        return {
            ...resizedShape,
            props: {
                ...resizedShape.props,
                fontSize: newFontSize,
            }
        }
    }

    component(shape: ILatexShape) {
        const INITIAL_MACROS = { "\\f": "#1f(#2)" };
    
        const [macros, setMacros] = useState(INITIAL_MACROS);
    
        const scaleX = shape.props.w / 100;
        const scaleY = shape.props.h / 100;
    
        return (
            <HTMLContainer>
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        transform: `scale(${scaleX}, ${scaleY})`,
                        transformOrigin: '0 0',
                   }}
                >
                    <Latex macros={macros}>{`$${shape.props.text}$`}</Latex>
                </div>
            </HTMLContainer>
        );
    }

    indicator(shape: ILatexShape) {
        return <rect width={shape.props.w} height={shape.props.h} />
    }
}