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
import { defaultRoomId } from '../..';




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
            pdfPath: '',
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

    updateShapeProps(id: string, props: Partial<IPdfElementShape['props']>) {
            //const shapeUpdate = this.shapeUpdate(id, width, height);
            this.editor.updateShape<IPdfElementShape>({
                id: id as TLShapeId,
                type: 'pdfElement',
                props: props,
            });
        }

    // [6]
    component(shape: IPdfElementShape) {
        const bounds = this.editor.getShapeGeometry(shape).bounds
        const theme = getDefaultColorTheme({ isDarkMode: this.editor.user.getIsDarkMode() })
        const allowChanges = shape.props.allowChanges;


        const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (file) {
                const roomId = defaultRoomId;

                if (!roomId) {
                    console.error('roomId is not set in localStorage or defaultRoomId');
                    return;
                }
                
                const formData = new FormData();
                formData.append('file', file);

                try {
                    const response = await fetch(`http://localhost:3001/upload?roomId=${roomId}`, {
                        method: 'POST',
                        body: formData,
                    });

                    if (response.ok) {
                        const data = await response.json();
                        const serverFilePath = `/uploads/${roomId}/pdf/${data.fileName}`;
                        this.updateShapeProps(shape.id, { pdfPath: serverFilePath });
                        console.log('ok'); // Print 'ok' after successful response
                    } else {
                        console.error('Failed to upload file', response.status, response.statusText);
                    }
                } catch (error) {
                    console.error('Error uploading file:', error);
                }
            }
        };

        React.useEffect(() => {
            if (shape.props.pdfPath === '') {
                document.getElementById(`file-input-${shape.id}`)?.click();
            }
            
        }, []);

        console.log("pdfPath: ", shape.props.pdfPath);

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
                <input
                    id={`file-input-${shape.id}`}
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
                <object
                    data={shape.props.pdfPath}
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

