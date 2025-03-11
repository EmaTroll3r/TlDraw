import { StyleProp, T, TLBaseShape, } from 'tldraw'


export const allowChangesStyle = StyleProp.define('pdfElement:allowChanges', {
	defaultValue: true,
	type: T.boolean,
})

type AllowChangesStyle = T.TypeOf<typeof allowChangesStyle>

export type IPdfElementShape = TLBaseShape<
	'pdfElement',
	{
		w: number
		h: number
		allowChanges: AllowChangesStyle
		pdfPath: string
	}
>
