import { createShapePropsMigrationIds, createShapePropsMigrationSequence } from 'tldraw'

const versions = createShapePropsMigrationIds(
	// this must match the shape type in the shape definition
	'table',
	{
		AddSomeProperty: 1,
	}
)

// Migrations for the custom table shape (optional but very helpful)
export const TableShapeMigrations = createShapePropsMigrationSequence({
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