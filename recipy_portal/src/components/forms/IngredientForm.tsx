import { TextField } from '@mui/material';
import * as yup from 'yup';
import Ingredient from '../../model/ingredient.interface';

export const INGREDIENT_VALIDATION_SCHEMA = yup.object({
	name: yup.string().required('Name is required')
});

export default function IngredientForm(props: { value: Ingredient, touched: any, errors: any, onChange: any, onBlur: any, index: number }) {
	return (
		<>
			<TextField
				name={`ingredients[${props.index}].name`}
				label="Name"
				value={props.value.name}
				onChange={props.onChange}
				onBlur={props.onBlur}
				error={props.touched?.name && Boolean(props.errors?.name)}
				helperText={props.touched?.name && props.errors?.name}
			/>
		</>
	);
}