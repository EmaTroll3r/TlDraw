import { BaseBoxShapeTool, TLClickEventInfo } from 'tldraw'

export class LatexShapeTool extends BaseBoxShapeTool {
  static override id = 'latex'
  static override initial = 'idle'
  override shapeType = 'latex'

  override onDoubleClick(_info: TLClickEventInfo) {
    // Handle double-click event if needed
  }
}