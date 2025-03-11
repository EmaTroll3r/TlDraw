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
    TldrawUiMenuSubmenu,
	computed,
} from 'tldraw'

//import { PdfPicker, Pdf } from './CustomTool/Pdf_Example/PdfPicker';
//import { import_pdf } from './CustomTool/Pdf/pdf'
//import { UploadPdf } from './CustomTool/Pdf/uploadPdf'
import { UploadImage } from './CustomTool/Images/UploadImage'
import { import_images } from './CustomTool/Images/image'
import { roomIdManager } from './roomIdManager'
import { handleExport, handleImport } from './CustomTool/FileSystem/FileSystem';
import { SlidesPanel } from './CustomTool/SlideShow/SlidesPanel';
import { getSlides, $currentSlide, moveToSlide } from './CustomTool/SlideShow/useSlides';
import './CustomTool/SlideShow/slides.css'
import { CustomStylePanel } from './StylePanel/CustomStylePanel';


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
	
    const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            handleImport(editor.store, file);
        }
    };

    return (
        <>
            <DefaultMainMenu>
                <TldrawUiMenuGroup id="basic">
                    <FileSubmenu />
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
            
            <input
                type="file"
                id="file-input"
                accept=".tldr"
                style={{ display: 'none' }}
                onChange={handleFileImport}
            />
            {triggerImageUpload && <UploadImage onFilesSelect={handleImageFilesSelect} trigger={triggerImageUpload} />}
        </>
    );
}

function FileSubmenu() {
    const editor = useEditor();

    const handleChangeFile = () => {
        const input = prompt('Please enter the file name:');
        if (input) {
            console.log(`File name entered: ${input}`);
            roomIdManager('tldrawFile-' + input);
        }
    };

    return (
        <>
            <TldrawUiMenuSubmenu id="file" label="menu.file">
                <TldrawUiMenuItem
                    id="import-file"
                    label="Import File"
                    icon="file"
                    readonlyOk
                    onSelect={() => document.getElementById('file-input')?.click()}
                />
                <TldrawUiMenuItem
                    id="export-file"
                    label="Export File"
                    icon="file"
                    readonlyOk
                    onSelect={() => handleExport(editor.store)}
                />
                <TldrawUiMenuItem
                    id="open-file"
                    label="Open File"
                    icon="file"
                    readonlyOk
                    onSelect={handleChangeFile}
                />
            </TldrawUiMenuSubmenu>
        </>
    );
}

export const uiOverrides: TLUiOverrides = {
	
	tools(editor, tools) {
		tools.table = {
			id: 'table',
			icon: 'tool-table',
			label: 'Table',
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
		tools.slide = {
			id: 'slide',
			icon: 'group',
			label: 'Slide',
			kbd: 's',
			onSelect: () => {
				editor.setCurrentTool('slide')
			}
		},
		tools.pdfElement = {
			id: 'pdfElement',
			icon: 'color',
			label: 'Pdf Element',
			kbd: 'p',
			onSelect: () => {
				editor.setCurrentTool('pdfElement')
			}
		}
		return tools
	},
	actions(editor, actions) {
		const $slides = computed('slides', () => getSlides(editor))
		return {
			...actions,
			'next-slide': {
				id: 'next-slide',
				label: 'Next slide',
				kbd: 'right',
				onSelect() {
					const slides = $slides.get()
					const currentSlide = $currentSlide.get()
					const index = slides.findIndex((s) => s.id === currentSlide?.id)
					const nextSlide = slides[index + 1] ?? currentSlide ?? slides[0]
					if (nextSlide) {
						editor.stopCameraAnimation()
						moveToSlide(editor, nextSlide)
					}
				},
			},
			'previous-slide': {
				id: 'previous-slide',
				label: 'Previous slide',
				kbd: 'left',
				onSelect() {
					const slides = $slides.get()
					const currentSlide = $currentSlide.get()
					const index = slides.findIndex((s) => s.id === currentSlide?.id)
					const previousSlide = slides[index - 1] ?? currentSlide ?? slides[slides.length - 1]
					if (previousSlide) {
						editor.stopCameraAnimation()
						moveToSlide(editor, previousSlide)
					}
				},
			},
		}
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
				
				<TldrawUiMenuItem {...tools['pdfElement']} isSelected={useIsToolSelected(tools['pdfElement'])} />
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
				<TldrawUiMenuItem {...tools['slide']} isSelected={useIsToolSelected(tools['slide'])} />
				
				
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
	StylePanel: CustomStylePanel,
	MainMenu: CustomMainMenu,
	HelperButtons: SlidesPanel,
}



export const assetUrls = {
    icons: {
        'tool-table': '/resources/Images/custom-table-icon.svg',
    },
}