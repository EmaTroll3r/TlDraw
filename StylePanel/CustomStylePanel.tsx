import React from 'react';
import {
    useEditor,
    useRelevantStyles,
    DefaultStylePanel,
    DefaultStylePanelContent,
    StyleProp,
} from 'tldraw';

import { xCellsStyle, yCellsStyle, wantHeadStyle } from '../CustomTool/Table/table-shape-types';
import { aspectRatioStyle } from '../CustomTool/SlideShow/slide-shape-types';
import './CustomStylePanel.css'; // Importa il file CSS

export function CustomStylePanel() {
    const editor = useEditor();
    const styles = useRelevantStyles();
    if (!styles) return null;


    const x_cells = styles.get(xCellsStyle);
    const y_cells = styles.get(yCellsStyle);
    const want_head = styles.get(wantHeadStyle);
    const aspect_ratio = styles.get(aspectRatioStyle);

    //console.log("aspect_ratio", aspect_ratio);
    //console.log("want_head", want_head);

    return (
        <DefaultStylePanel>
            <DefaultStylePanelContent styles={styles} />
            {x_cells !== undefined && (
                <div className="style-panel-section" style={{ display: 'flex', alignItems: 'center' }}>
                    <label className="style-panel-label">X Cells</label>
                    <input
                        type="number"
                        className="style-panel-input"
                        value={x_cells.type === 'mixed' || x_cells.value === 0 ? '' : x_cells.value}
                        onChange={(e) => {
                            editor.markHistoryStoppingPoint();
                            const value = xCellsStyle.validate(+e.currentTarget.value);
                            editor.setStyleForSelectedShapes(xCellsStyle, value);
                        }}
                        onBlur={(e) => {
                            console.log("onBlur triggered");
                            editor.markHistoryStoppingPoint();
                            let inputValue = +e.currentTarget.value;
                            if (inputValue == 0) {
                                inputValue = 1;
                            }
                            const value = xCellsStyle.validate(inputValue);
                            editor.setStyleForSelectedShapes(xCellsStyle, value);
                        }}
                        min={-3}
                        max={100}
                    />
                </div>
            )}

            {y_cells !== undefined && (
                <div className="style-panel-section" style={{ display: 'flex', alignItems: 'center' }}>
                    <label className="style-panel-label">Y Cells</label>
                    <input
                        type="number"
                        className="style-panel-input"
                        value={y_cells.type === 'mixed' ? '' : y_cells.value}
                        onChange={(e) => {
                            editor.markHistoryStoppingPoint();
                            const value = yCellsStyle.validate(+e.currentTarget.value);
                            editor.setStyleForSelectedShapes(yCellsStyle, value);
                        }}
                        min={1}
                        max={100}
                    />
                </div>
            )}

            {want_head !== undefined && (
                <div className="style-panel-section" style={{ display: 'flex', alignItems: 'center' }}>
                    <label className="style-panel-label">Header</label>
                    <select
                        className="style-panel-select"
                        value={want_head.type === 'mixed' ? '' : want_head.value.toString()}
                        onChange={(e) => {
                            editor.markHistoryStoppingPoint();
                            const value = wantHeadStyle.validate(e.currentTarget.value === 'true');
                            editor.setStyleForSelectedShapes(wantHeadStyle, value);
                        }}
                    >
                        {want_head.type === 'mixed' ? <option value="">Mixed</option> : null}
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>
            )}

            {aspect_ratio !== undefined && (
                <div className="style-panel-section" style={{ marginTop: '16px' }}>
                    <label className="style-panel-label">Aspect Ratio</label>
                    <input
                        type="checkbox"
                        className="style-panel-checkbox"
                        checked={aspect_ratio.type === 'mixed' ? false : aspect_ratio.value}
                        onChange={(e) => {
                            editor.markHistoryStoppingPoint();
                            const value = aspectRatioStyle.validate(e.currentTarget.checked);
                            editor.setStyleForSelectedShapes(aspectRatioStyle, value);
                        }}
                    />
                </div>
            )}
        </DefaultStylePanel>
    );
}