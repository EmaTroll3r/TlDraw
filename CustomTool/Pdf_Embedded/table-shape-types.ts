import { TLBaseShape, TLDefaultColorStyle, T, StyleProp } from 'tldraw'

/*
const positiveNumberValidator = T.number.check((value) => {
	if (value <= 0) {
		throw new Error('Value must be greater than 0');
	}
	return value;
})
*/

export const xCellsStyle = StyleProp.define('table:xCells', {
	defaultValue: 2,
	//type: positiveNumberValidator,
	type: T.number,
})

export const yCellsStyle = StyleProp.define('table:yCells', {
	defaultValue: 2,
	type: T.number,
})

export const wantHeadStyle = StyleProp.defineEnum('table:wantHead', {
	defaultValue: false,
	values: [true, false],
})

// [2]
type XCellsStyle = T.TypeOf<typeof xCellsStyle>
type YCellsStyle = T.TypeOf<typeof yCellsStyle>
type WantHeadStyle = T.TypeOf<typeof wantHeadStyle>

// A type for our custom table shape
export type ITableShape = TLBaseShape<
	'table',
	{
		w: number
		h: number
		color: TLDefaultColorStyle
		//size: TLDefaultSizeStyle
		x_cells: XCellsStyle,
		y_cells: YCellsStyle,
		wantHead: WantHeadStyle,
		cellWidth: number,
		cellHeight: number,
		borderWidth: number,
		
	}
	
> 
/*& {meta:{
	cellWidth: number,
	cellHeight: number,
}}
*/

