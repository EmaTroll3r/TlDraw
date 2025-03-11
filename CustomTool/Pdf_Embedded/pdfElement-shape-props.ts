import { RecordProps, T } from 'tldraw'
import { IPdfElementShape, allowChangesStyle } from './pdfElement-shape-types'

// Validation for our custom pdfElement shape's props, using one of tldraw's default styles
export const PdfElementShapeProps: RecordProps<IPdfElementShape> = {
	w: T.number,
	h: T.number,
	allowChanges: allowChangesStyle,
	pdfPath: T.string,
}
