import { createShapePropsMigrationIds, createShapePropsMigrationSequence } from 'tldraw'

const versions = createShapePropsMigrationIds(
	// this must match the shape type in the shape definition
	'pdfElement',
	{
		AddSomeProperty: 1,
	}
)

// Migrations for the custom pdfElement shape (optional but very helpful)
export const PdfElementShapeMigrations = createShapePropsMigrationSequence({
	sequence: [
		{
			id: versions.AddSomeProperty,
			up(props) {
				// it is safe to mutate the props object here
				props.someProperty = 'some value'
			},
			down(props) {
				delete props.someProperty
			},
		},
	],
})