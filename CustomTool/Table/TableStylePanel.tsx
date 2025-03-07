import React from 'react';
import {
    useEditor,
    useRelevantStyles,
    DefaultStylePanel,
    DefaultStylePanelContent,
    StyleProp,
} from 'tldraw';

import { xCellsStyle, yCellsStyle, wantHeadStyle } from './table-shape-types';
import './TableStylePanel.css'; // Importa il file CSS

export function TableStylePanel() {
    const editor = useEditor();
    const styles = useRelevantStyles();
    if (!styles) return null;

    const x_cells = styles.get(xCellsStyle);
    const y_cells = styles.get(yCellsStyle);
    const want_head = styles.get(wantHeadStyle);

    return (
        <DefaultStylePanel>
            <DefaultStylePanelContent styles={styles} />
            {x_cells !== undefined && (
                <div className="style-panel-section">
                    <label className="style-panel-label">X Cells</label>
                    <input
                        type="number"
                        className="style-panel-input"
                        value={x_cells.type === 'mixed' || x_cells.value === 0 ? '' : x_cells.value}
                        onChange={(e) => {
                            editor.markHistoryStoppingPoint();
                            const value = xCellsStyle.validate(+e.currentTarget.value);
                            editor.setStyleForSelectedShapes(xCellsStyle, value);
                            
                            console.log("bbbbbbbb");
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
                <div className="style-panel-section">
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
                <div className="style-panel-section">
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
        </DefaultStylePanel>
    );
}