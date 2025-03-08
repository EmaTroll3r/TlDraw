import { useCallback } from 'react'
import {
	Geometry2d,
	RecordProps,
	Rectangle2d,
	SVGContainer,
	ShapeUtil,
	T,
	TLBaseShape,
	TLResizeInfo,
	TLShapeId,
	getPerfectDashProps,
	resizeBox,
	useValue,
} from 'tldraw'
import { moveToSlide, useSlides } from './useSlides'
import { SlideShape, aspectRatioStyle } from './slide-shape-types'
import { SlideShapeProps } from './slide-shape-props'
import React from 'react'

export class SlideShapeUtil extends ShapeUtil<SlideShape> {
	static override type = 'slide' as const

	static override props = SlideShapeProps

	override canBind() {
		return false
	}
	override hideRotateHandle() {
		return true
	}

	override isAspectRatioLocked(shape: SlideShape) {
		return shape.props.aspectRatio;
	}

	getDefaultProps(): SlideShape['props'] {
		return {
			w: 720,
			h: 480,
			aspectRatio: aspectRatioStyle.defaultValue || false,
		}
	}

	getGeometry(shape: SlideShape): Geometry2d {
		return new Rectangle2d({
			width: shape.props.w,
			height: shape.props.h,
			isFilled: false,
		})
	}

	override onRotate(initial: SlideShape) {
		return initial
	}

	override onResize(shape: SlideShape, info: TLResizeInfo<SlideShape>) {
		return resizeBox(shape, info);
	}

	override onDoubleClick(shape: SlideShape) {
		moveToSlide(this.editor, shape)
		this.editor.selectNone()
	}

	override onDoubleClickEdge(shape: SlideShape) {
		moveToSlide(this.editor, shape)
		this.editor.selectNone()
	}

	component(shape: SlideShape) {
		const bounds = this.editor.getShapeGeometry(shape).bounds

		// eslint-disable-next-line react-hooks/rules-of-hooks
		const zoomLevel = useValue('zoom level', () => this.editor.getZoomLevel(), [this.editor])

		// eslint-disable-next-line react-hooks/rules-of-hooks
		const slides = useSlides()
		const index = slides.findIndex((s) => s.id === shape.id)

		// eslint-disable-next-line react-hooks/rules-of-hooks
		const handleLabelPointerDown = useCallback(() => this.editor.select(shape.id), [shape.id])

		if (!bounds) return null

		if (shape.props.aspectRatio) {
			const screenAspectRatio = window.innerWidth / window.innerHeight;
			const newHeight = shape.props.h;
			const newWidth = newHeight * screenAspectRatio;
			this.editor.updateShape<SlideShape>({
				id: shape.id as TLShapeId,
				type: 'slide',
				props: {
					w: newWidth,
					h: newHeight,
				},
			});
		}

		return (
			<>
				<div onPointerDown={handleLabelPointerDown} className="slide-shape-label">
					{`Slide ${index + 1}`}
				</div>
				<SVGContainer>
					<g
						style={{
							stroke: 'var(--color-text)',
							strokeWidth: 'calc(1px * var(--tl-scale))',
							opacity: 0.25,
						}}
						pointerEvents="none"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						{bounds.sides.map((side, i) => {
							const { strokeDasharray, strokeDashoffset } = getPerfectDashProps(
								side[0].dist(side[1]),
								1 / zoomLevel,
								{
									style: 'dashed',
									lengthRatio: 6,
									forceSolid: zoomLevel < 0.2,
								}
							)

							return (
								<line
									key={i}
									x1={side[0].x}
									y1={side[0].y}
									x2={side[1].x}
									y2={side[1].y}
									strokeDasharray={strokeDasharray}
									strokeDashoffset={strokeDashoffset}
								/>
							)
						})}
					</g>
				</SVGContainer>
			</>
		)
	}

	indicator(shape: SlideShape) {
		return <rect width={shape.props.w} height={shape.props.h} />
	}
}