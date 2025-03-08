import { DefaultColorStyle, RecordProps, T,DefaultSizeStyle } from 'tldraw'
import { aspectRatioStyle, SlideShape } from './slide-shape-types'

// Validation for our custom slide shape's props, using one of tldraw's default styles
export const SlideShapeProps: RecordProps<SlideShape> = {
	w: T.number,
	h: T.number,
	//size: DefaultSizeStyle,
	aspectRatio: aspectRatioStyle,
}
