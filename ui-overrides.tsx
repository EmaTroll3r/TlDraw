import React, { useState } from 'react';

import {
	DefaultKeyboardShortcutsDialog,
	DefaultKeyboardShortcutsDialogContent,
	DefaultToolbar,
	TLComponents,
	TLUiOverrides,
	TldrawUiMenuItem,
	useIsToolSelected,
	useTools,
	DefaultMainMenu,
	DefaultMainMenuContent,
	TldrawUiMenuGroup,
	useEditor,
	EditSubmenu,
	ViewSubmenu,
	ExportFileContentSubMenu,
	ExtrasGroup,
	PreferencesGroup,
} from 'tldraw'

//import { PdfPicker, Pdf } from './CustomTool/Pdf_Example/PdfPicker';
//import { import_pdf } from './CustomTool/Pdf/pdf'
//import { UploadPdf } from './CustomTool/Pdf/uploadPdf'
import { TableStylePanel } from './CustomTool/Table/TableStylePanel'
import { UploadImage } from './CustomTool/Images/UploadImage'
import { import_images } from './CustomTool/Images/image'
import { roomIdManager } from './roomIdManager'

/*
function CustomMainMenu() {
    const editor = useEditor();
    const [triggerUpload, setTriggerUpload] = useState(false);
    const [showPdfPicker, setShowPdfPicker] = useState(false);
    const [triggerImageUpload, setTriggerImageUpload] = useState(false);

    const handleImportPdf = () => {
        setTriggerUpload(true);
    };

    const handleFileSelect = (file: File) => {
        import_pdf(editor, file);
        setTriggerUpload(false);
    };

    const handleOpenPdfPicker = () => {
        setShowPdfPicker(true);
    };

    const handleClosePdfPicker = () => {
        setShowPdfPicker(false);
    };

    const handleOpenPdf = (pdf: Pdf) => {
        // Handle the opened PDF here
        setShowPdfPicker(false);
    };

    const handleImportImages = () => {
        setTriggerImageUpload(true);
    };

    const handleImageFilesSelect = (files: FileList) => {
        import_images(editor, files);
        setTriggerImageUpload(false);
    };

    if (showPdfPicker) {
        return (
            <PdfPicker onOpenPdf={handleOpenPdf} />
        );
    }

    return (
        <>
            <DefaultMainMenu>
                <div style={{ backgroundColor: 'thistle' }}>
                    <TldrawUiMenuGroup id="example">
                        <TldrawUiMenuItem
                            id="import-pdf"
                            label="Import PDF"
                            icon="external-link"
                            readonlyOk
                            onSelect={handleImportPdf}
                        />
                        <TldrawUiMenuItem
                            id="open-pdf-picker"
                            label="Open PDF Picker"
                            icon="file"
                            readonlyOk
                            onSelect={handleOpenPdfPicker}
                        />
						<TldrawUiMenuItem
                            id="open-images"
                            label="Open Images"
                            icon="file"
                            readonlyOk
                            onSelect={handleImportImages}
                        />
                    </TldrawUiMenuGroup>
                </div>
                <DefaultMainMenuContent />
            </DefaultMainMenu>
            {triggerUpload && <UploadPdf onFileSelect={handleFileSelect} trigger={triggerUpload} />}
            {triggerImageUpload && <UploadImage onFilesSelect={handleImageFilesSelect} trigger={triggerImageUpload} />}
        </>
    );
}
*/

function CustomMainMenu() {
    const editor = useEditor();
    const [triggerImageUpload, setTriggerImageUpload] = useState(false);

    const handleImportImages = () => {
        setTriggerImageUpload(true);
    };

    const handleImageFilesSelect = (files: FileList) => {
        import_images(editor, files);
        setTriggerImageUpload(false);
    };

	// <DefaultMainMenuContent /> 
	// packages/tldraw/src/lib/ui/components/MainMenu/DefaultMainMenuContent.tsx

	const handleImportFile = () => {
        roomIdManager('myapp-243242355');
    };

    return (
        <>
            <DefaultMainMenu>
                <TldrawUiMenuGroup id="basic">
					{/*
                    <TldrawUiMenuItem
                        id="open-file"
                        label="Open File"
                        icon="file"
                        readonlyOk
                        onSelect={handleImportFile}
                    />
					*/}
                    <EditSubmenu />
                    <ViewSubmenu />
                    <ExportFileContentSubMenu />
                    <TldrawUiMenuItem
                        id="open-images"
                        label="Open Images"
                        icon="file"
                        readonlyOk
                        onSelect={handleImportImages}
                    />
                    <ExtrasGroup />
                </TldrawUiMenuGroup>
                <PreferencesGroup />
            </DefaultMainMenu>
            {triggerImageUpload && <UploadImage onFilesSelect={handleImageFilesSelect} trigger={triggerImageUpload} />}
        </>
    );
}

export const uiOverrides: TLUiOverrides = {
	tools(editor, tools) {
		tools.table = {
			id: 'table',
			icon: 'tool-table',
			label: 'table',
			kbd: 'c',
			onSelect: () => {
				editor.setCurrentTool('table')
			},
		}
		tools.latex = {
			id: 'latex',
			icon: 'text', // Usa un'icona appropriata
			label: 'Latex',
			kbd: 'l',
			onSelect: () => {
				editor.setCurrentTool('latex')
			},
		}
		return tools
	},
}

export const components: TLComponents = {
	Toolbar: (props) => {
		const tools = useTools()
		return (
			<DefaultToolbar {...props}>
				
				<TldrawUiMenuItem {...tools['select']} isSelected={useIsToolSelected(tools['select'])} />
				<TldrawUiMenuItem {...tools['hand']} isSelected={useIsToolSelected(tools['hand'])} />
				<TldrawUiMenuItem {...tools['draw']} isSelected={useIsToolSelected(tools['draw'])} />
				<TldrawUiMenuItem {...tools['eraser']} isSelected={useIsToolSelected(tools['eraser'])} />
				
				{/*
				<TldrawUiMenuItem {...tools['latex']} isSelected={useIsToolSelected(tools['latex'])} />
				*/}
				
				<TldrawUiMenuItem {...tools['arrow']} isSelected={useIsToolSelected(tools['arrow'])} />
				<TldrawUiMenuItem {...tools['text']} isSelected={useIsToolSelected(tools['text'])} />
				<TldrawUiMenuItem {...tools['note']} isSelected={useIsToolSelected(tools['note'])} />
				<TldrawUiMenuItem {...tools['asset']} isSelected={useIsToolSelected(tools['asset'])} />
				<TldrawUiMenuItem {...tools['rectangle']} isSelected={useIsToolSelected(tools['rectangle'])} />
				<TldrawUiMenuItem {...tools['ellipse']} isSelected={useIsToolSelected(tools['ellipse'])} />
				<TldrawUiMenuItem {...tools['triangle']} isSelected={useIsToolSelected(tools['triangle'])} />
				<TldrawUiMenuItem {...tools['diamond']} isSelected={useIsToolSelected(tools['diamond'])} />
				<TldrawUiMenuItem {...tools['hexagon']} isSelected={useIsToolSelected(tools['hexagon'])} />
				<TldrawUiMenuItem {...tools['oval']} isSelected={useIsToolSelected(tools['oval'])} />
				<TldrawUiMenuItem {...tools['rhombus']} isSelected={useIsToolSelected(tools['rhombus'])} />
				<TldrawUiMenuItem {...tools['star']} isSelected={useIsToolSelected(tools['star'])} />
				<TldrawUiMenuItem {...tools['cloud']} isSelected={useIsToolSelected(tools['cloud'])} />
				<TldrawUiMenuItem {...tools['heart']} isSelected={useIsToolSelected(tools['heart'])} />
				<TldrawUiMenuItem {...tools['x-box']} isSelected={useIsToolSelected(tools['x-box'])} />
				<TldrawUiMenuItem {...tools['check-box']} isSelected={useIsToolSelected(tools['check-box'])} />
				<TldrawUiMenuItem {...tools['arrow-left']} isSelected={useIsToolSelected(tools['arrow-left'])} />
				<TldrawUiMenuItem {...tools['arrow-up']} isSelected={useIsToolSelected(tools['arrow-up'])} />
				<TldrawUiMenuItem {...tools['arrow-down']} isSelected={useIsToolSelected(tools['arrow-down'])} />
				<TldrawUiMenuItem {...tools['arrow-right']} isSelected={useIsToolSelected(tools['arrow-right'])} />
				<TldrawUiMenuItem {...tools['line']} isSelected={useIsToolSelected(tools['line'])} />
				<TldrawUiMenuItem {...tools['highlight']} isSelected={useIsToolSelected(tools['highlight'])} />
				<TldrawUiMenuItem {...tools['laser']} isSelected={useIsToolSelected(tools['laser'])} />
				<TldrawUiMenuItem {...tools['frame']} isSelected={useIsToolSelected(tools['frame'])} />
				<TldrawUiMenuItem {...tools['table']} isSelected={useIsToolSelected(tools['table'])} /> 
				
				
				{/* 
				<DefaultToolbarContent /> 
				*/}
			</DefaultToolbar>
		)
	},
	KeyboardShortcutsDialog: (props) => {
		const tools = useTools()
		return (
			<DefaultKeyboardShortcutsDialog {...props}>
				<TldrawUiMenuItem {...tools['table']} />
				<DefaultKeyboardShortcutsDialogContent />
			</DefaultKeyboardShortcutsDialog>
		)
	},
	StylePanel: TableStylePanel,
	MainMenu: CustomMainMenu,
}

export const assetUrls = {
    icons: {
        'tool-table': '/resources/Images/custom-table-icon.svg',
    },
}