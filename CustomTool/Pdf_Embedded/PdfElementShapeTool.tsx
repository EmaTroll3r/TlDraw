import { BaseBoxShapeTool, TLClickEventInfo } from 'tldraw'
export class PdfElementShapeTool extends BaseBoxShapeTool {
	static override id = 'pdfElement'
	static override initial = 'idle'
	override shapeType = 'pdfElement'

	override onDoubleClick(_info: TLClickEventInfo) {
		// you can handle events in handlers like this one;
		// check the BaseBoxShapeTool source as an example
	}
}

/*
This file contains our custom tool. The tool is a StateNode with the `id` "pdfElement".

We get a lot of functionality for free by extending the BaseBoxShapeTool. but we can
handle events in out own way by overriding methods like onDoubleClick. For an example 
of a tool with more custom functionality, check out the screenshot-tool example. 

*/