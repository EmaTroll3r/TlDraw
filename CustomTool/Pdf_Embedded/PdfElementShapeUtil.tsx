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
import { Dropbox } from 'dropbox'; // Importa il pacchetto Dropbox

//const endpoint = 'localhost'; /*
const endpoint = 'affiuccio.duckdns.org';
//*/


const dropboxAccessToken = 'sl.u.AFlm2-sawXoVq6V3pXyaz7-0KRdPdQYTU5QMSZjpQLDLNGYduNBD3TY8SHSAg2l4-vTplSbF2WW3CZHvbvKgL69D-sjbrcoPRK3ZPA2BivYBoHlOlOyTOre9Y-2_Nw1Q14zuxMd0tBhn8DpiXLNE_Pl05Bcg_nKRuazquFSbouuZzppM3t8UX4VdIIdM8A-qORuFDAnj5HiKizc798VZ1V4dDJen2AmXGyZ3_bKfjuLNZ5I1TZ1GWT_acEgrXaASaHEl7s-b4MyZJBjQ5q1xYcf4ewYH4lo0CkaL8uHPBEK0k_6Pk_6wl-aBqdgi40SBxyz6RmOqOw7VNDkpDY9-3IPPZqKH0-BWf7oBrq_ogGuAeVN7RujTNuR7T85Wb03TsiFdpqFso7ye5CCpSDUvewB3IYsEgsA_7ghjd8lEO0hcNjKMReH7A6573S8FJZ79ucuGcdZadZjEqbzkcSz-gltRf2RRP2vO8kJ2K3f9BxdK5WsdGaT5LTY6oMmhFuRl95jy-cvjpzmvVth_lYG2aA6PaEAfzQuOoKxuNPHeDEWDMxAAvkUHGrdUiuyCOFqfW1Vy9oa7XajKITeoP8CuFxYjUJjVHTxLCow7Z-qUQ5xlmIjFC7-SsjyeV6NL-nT6a8rM4mGsXVKx4EPhn_EohY3uNsw1Y_pySypjbH3zXqjr-n8L123ZfXugoOh6LbJEV0Ee3yNDfvZvN5zcSXpa2MJTp16ShU42YFo8Q_gyfqTdHRU_GpZ0hUsGlhyvD72pdjXz5TU8rAfQHe6gxjYe8NGFZxgsgbVwuaFSUILdQoRQ29dKCzOt1QZV36s-vDDex1yzVojk8HIWbpoSgJ9iKfT8v1WyYw3Gr2UP9lnPSgzb-wezqME3DDt7qwggfgfzaNwDDBTnvpHEWiVVJLbYFhoW-cTr7A-JpaOZcMF6yYShhrKRSExK7-LPcMKHfb5Z0cA12QZV5vrLAsIklmm6oOTtw3vuJ3xAHJ1sfwMuR5hm_NRZg9emfFaWtY9xYESU7ol3u3CFg0UDs7GGuKyNZ4nzRc7jy6fhDM765F5o1CNo4FZrEg842vBp8yQFVzCsbw1Wg5vSDMlcixh-H8CKxAYtm1C1J_2dum1l0rJe92xoUrXlfa17HQwSpdixtH8rSpSiB3IAWPw-6yLoDbpJi686LKy6uYvHmkUCGElyZCFS-u8XB9G858jVWCec3yqSYsUi1sv7PU0DS7_ZpS_0sxLAwm63szU_t8Cl2nHXVOX8BtivWOuPPCV4UNDrVDyPawTqLqryUyvSzmABIaL_HMQLRMNAryQQ6kDXLnjP5sJY6A'


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

        /*
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
                    const response = await fetch(`http://${endpoint}:3001/upload?roomId=${roomId}`, {
                        method: 'POST',
                        body: formData,
                    });

                    if (response.ok) {
                        const data = await response.json();
                        const serverFilePath = `/uploads/${roomId}/pdf/${data.fileName}`;
                        this.updateShapeProps(shape.id, { pdfPath: serverFilePath });
                        console.log('pdfPath',serverFilePath); // Print 'ok' after successful response
                    } else {
                        console.error('Failed to upload file', response.status, response.statusText);
                    }
                } catch (error) {
                    console.error('Error uploading file:', error);
                }
            }
        };
        */

        const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (file) {
                const dropboxPath = `/${file.name}`;

                const reader = new FileReader();
                reader.onload = async () => {
                    const arrayBuffer = reader.result as ArrayBuffer;

                    try {
                        const response = await fetch('https://content.dropboxapi.com/2/files/upload', {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${dropboxAccessToken}`,
                                'Dropbox-API-Arg': JSON.stringify({
                                    path: dropboxPath,
                                    mode: 'add',
                                    autorename: true,
                                    mute: false,
                                    strict_conflict: false
                                }),
                                'Content-Type': 'application/octet-stream'
                            },
                            body: arrayBuffer
                        });

                        if (response.ok) {
                            const data = await response.json();
                            const sharedLinkResponse = await fetch('https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings', {
                                method: 'POST',
                                headers: {
                                    'Authorization': `Bearer ${dropboxAccessToken}`,
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    path: data.path_lower
                                })
                            });

                            if (sharedLinkResponse.ok) {
                                const sharedLinkData = await sharedLinkResponse.json();
                                const sharedLink = sharedLinkData.url.replace('dl=0', 'raw=1');
                                this.updateShapeProps(shape.id, { pdfPath: sharedLink });
                                console.log('pdfPath', sharedLink); // Stampa il percorso del PDF dopo il caricamento
                            } else {
                                console.error('Failed to create shared link', sharedLinkResponse.status, sharedLinkResponse.statusText);
                            }
                        } else {
                            const errorText = await response.text();
                            console.error('Failed to upload file to Dropbox', response.status, response.statusText, errorText);
                        }
                    } catch (error) {
                        console.error('Error uploading file to Dropbox:', error);
                    }
                };
                reader.readAsArrayBuffer(file);
            }
        }

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
                
                {/*
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
                
                */}
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

