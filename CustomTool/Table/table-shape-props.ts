import { DefaultColorStyle, RecordProps, T,DefaultSizeStyle } from 'tldraw'
import { ITableShape, wantHeadStyle, xCellsStyle, yCellsStyle } from './table-shape-types'

// Validation for our custom table shape's props, using one of tldraw's default styles
export const TableShapeProps: RecordProps<ITableShape> = {
	w: T.number,
	h: T.number,
	color: DefaultColorStyle,
	//size: DefaultSizeStyle,
	x_cells: xCellsStyle,
	y_cells: yCellsStyle,
	wantHead: wantHeadStyle,
	cellWidth: T.number,
	cellHeight: T.number,
	borderWidth: T.number,
}
