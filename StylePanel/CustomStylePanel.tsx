import React, { useEffect } from 'react';
import {
    useEditor,
    useRelevantStyles,
    DefaultStylePanel,
    DefaultStylePanelContent,
    StyleProp,
    getDefaultColorTheme,
    useIsDarkMode,
    DefaultColorStyle,
} from 'tldraw';

import { xCellsStyle, yCellsStyle, wantHeadStyle } from '../CustomTool/Table/table-shape-types';
import { aspectRatioStyle } from '../CustomTool/SlideShow/slide-shape-types';
import './CustomStylePanel.css'; // Importa il file CSS
import { get } from 'http';

export function getPrimaryColor() {
    return getDefaultColorTheme({ isDarkMode: useIsDarkMode() }).black.solid;
}

export function getSecondaryColor() {
    const hex = getPrimaryColor().replace(/^#/, '');

    // Parse the r, g, b values
    let r = parseInt(hex.slice(0, 2), 16);
    let g = parseInt(hex.slice(2, 4), 16);
    let b = parseInt(hex.slice(4, 6), 16);

    // Invert each color component
    r = parseInt((255 - r).toString(16).padStart(2, '0'), 16);
    g = parseInt((255 - g).toString(16).padStart(2, '0'), 16);
    b = parseInt((255 - b).toString(16).padStart(2, '0'), 16);

    // Return the inverted color
    return `#${r}${g}${b}`;
}

export function CustomStylePanel() {
    const editor = useEditor();
    const styles = useRelevantStyles();
    if (!styles) return null;

    document.documentElement.style.setProperty('--primary-color', getPrimaryColor());
    document.documentElement.style.setProperty('--secondary-color', getSecondaryColor());
    console.log(getSecondaryColor());

    const x_cells = styles.get(xCellsStyle);
    const y_cells = styles.get(yCellsStyle);
    const want_head = styles.get(wantHeadStyle);
    const aspect_ratio = styles.get(aspectRatioStyle);

    //console.log(DefaultColorStyle);

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