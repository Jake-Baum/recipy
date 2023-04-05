import { Add, Remove } from "@mui/icons-material";
import { Button, FormHelperText, IconButton, TextField } from "@mui/material";
import { FieldArray, Form, Formik } from "formik";
import * as yup from 'yup';
import Recipy from "../../model/recipy.interface";
import IngredientForm, { INGREDIENT_VALIDATION_SCHEMA } from "../forms/IngredientForm";

const DEFAULT_INITIAL_VALUES: Recipy = {
	title: '',
	ingredients: []
};

const RECIPY_VALIDATION_SCHEMA = yup.object({
	title: yup.string().required('Title is required').max(50, 'Title must be less than 50 characters'),
	ingredients: yup.array().of(INGREDIENT_VALIDATION_SCHEMA).min(1, 'Must create at least one ingredient')
});

export default function RecipyForm(props: { submit: any, value?: Recipy }) {
	return (
		<>
			<Formik
				enableReinitialize={true}
				initialValues={props.value || DEFAULT_INITIAL_VALUES}
				validationSchema={RECIPY_VALIDATION_SCHEMA}
				onSubmit={props.submit}
			>
				{({ values, errors, touched, handleChange, handleBlur, isValid }) => (
					<Form >
						<div>
							<TextField
								name="title"
								label="Title"
								value={values.title}
								onChange={handleChange}
								onBlur={handleBlur}
								error={touched.title && Boolean(errors.title)}
								helperText={touched.title && errors.title}
							/>
							<FieldArray name="ingredients">
								{
									arrayHelpers => (
										<div>
											<IconButton type="button" onClick={() => arrayHelpers.push({ name: '' })}>
												<Add />
											</IconButton>
											{typeof errors.ingredients === 'string' && <FormHelperText error={true}>{errors.ingredients}</FormHelperText>}


											{
												values.ingredients.map((ingredient: any, index: number) => (
													<div key={index}>
														<IngredientForm
															index={index}
															value={ingredient}
															onChange={handleChange}
															onBlur={handleBlur}
															touched={touched.ingredients ? touched.ingredients[index] : {}}
															errors={errors.ingredients ? errors.ingredients[index] : {}}
														/>
														<IconButton type="button" onClick={() => arrayHelpers.remove(index)}>
															<Remove />
														</IconButton>
													</div>
												))
											}
										</div>
									)
								}
							</FieldArray>
						</div>
						<Button color="primary" variant="contained" type="submit" disabled={!isValid}>Save Recipy</Button>
					</Form>
				)}

			</Formik>

		</>
	);

}