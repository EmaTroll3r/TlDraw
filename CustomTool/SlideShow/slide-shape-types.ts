import { TLBaseShape, T, StyleProp } from 'tldraw'

export const aspectRatioStyle = StyleProp.define('slide:aspectRatio', {
    defaultValue: false,
    type: T.boolean,
})

type AspectRatioStyle = T.TypeOf<typeof aspectRatioStyle>

export type SlideShape = TLBaseShape<
    'slide',
    {
        w: number
        h: number
        aspectRatio: AspectRatioStyle
    }
>