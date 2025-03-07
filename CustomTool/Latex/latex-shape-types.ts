import { TLBaseShape, TLDefaultColorStyle} from 'tldraw'



// A type for our custom table shape
export type ILatexShape = TLBaseShape<
    'latex',
    {
        w: number
        h: number
        text: string
        color: TLDefaultColorStyle
        fontSize: number
        
    }
    
>

