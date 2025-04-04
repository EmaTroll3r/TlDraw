// npm install tldraw
// npm install @tldraw/sync
// npm install vite


import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { hardReset, Tldraw } from 'tldraw';
import { useSyncDemo } from '@tldraw/sync'
import 'tldraw/tldraw.css';
import './styles.css';
import 'katex/dist/katex.min.css';

import { TableShapeTool } from './CustomTool/Table/TableShapeTool'
import { TableShapeUtil } from './CustomTool/Table/TableShapeUtil'
import { PdfElementShapeTool } from './CustomTool/Pdf_Embedded/PdfElementShapeTool';
import { PdfElementShapeUtil } from './CustomTool/Pdf_Embedded/PdfElementShapeUtil';
import { components, uiOverrides, assetUrls } from './ui-overrides'
import { LatexShapeTool } from './CustomTool/Latex/LatexShapeTool';
import { LatexShapeUtil } from './CustomTool/Latex/LatexShapeUtil';
import PdfEditorWrapper from './CustomTool/Pdf_Example/PdfEditorWrapper';
import { handleExport } from './CustomTool/FileSystem/FileSystem';
import { SlideShapeTool } from './CustomTool/SlideShow/SlideShapeTool';
import { SlideShapeUtil } from './CustomTool/SlideShow/SlideShapeUtil';

const customShapeUtils = [TableShapeUtil, LatexShapeUtil, SlideShapeUtil, PdfElementShapeUtil];
const customTools = [TableShapeTool, LatexShapeTool, SlideShapeTool ,PdfElementShapeTool];

export let defaultRoomId = localStorage.getItem('roomId') || "tldrawFile-1";

let root: ReactDOM.Root | null = null;

export function App({ roomId }: { roomId: string }) {
    const store = useSyncDemo({ roomId, shapeUtils: customShapeUtils });
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div style={{ position: 'fixed', inset: 0, display: 'flex' }}>
            <div style={{ flex: 1 }}>
                <Tldraw
                    shapeUtils={customShapeUtils}
                    tools={customTools}
                    overrides={uiOverrides}
                    components={components}
                    assetUrls={assetUrls}
                    onMount={(editor) => {
                        editor.updateInstanceState({ isGridMode: true });
                        editor.user.updateUserPreferences({ colorScheme: 'dark' });
                    }}
                    store={store}
                />
            </div>
        </div>
    );
}

const container = document.getElementById('root');
if (!root && container) {
    root = ReactDOM.createRoot(container);
}
root?.render(<App roomId={defaultRoomId} />);