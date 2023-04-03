import { TextField } from '@mui/material';
import * as yup from 'yup';

export const INGREDIENT_VALIDATION_SCHEMA = yup.object({
	name: yup.string().required('Name is required')
});

export default function IngredientForm({ value, touched, errors, onChange, onBlur, index }: any) {
	return (
		<>
			<TextField
				name={`ingredients[${index}].name`}
				label="Name"
				value={value.name}
				onChange={onChange}
				onBlur={onBlur}
				error={touched?.name && Boolean(errors?.name)}
				helperText={touched?.name && errors?.name}
			/>
		</>
	);
}