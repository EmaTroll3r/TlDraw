import { DefaultColorStyle, RecordProps, T, } from 'tldraw'
import { ILatexShape, } from './latex-shape-types'

// Validation for our custom table shape's props, using one of tldraw's default styles
export const LatexShapeProps: RecordProps<ILatexShape> = {
	w: T.number,
	h: T.number,
	text: T.string,
	color: DefaultColorStyle,
	fontSize: T.number,
}
