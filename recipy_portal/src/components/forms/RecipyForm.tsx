import { Add, Remove } from "@mui/icons-material";
import { Button, Card, CardContent, CardHeader, FormHelperText, IconButton, TextField } from "@mui/material";
import { FieldArray, Form, Formik } from "formik";
import * as yup from 'yup';
import IngredientForm, { INGREDIENT_VALIDATION_SCHEMA } from "./IngredientForm";

const DEFAULT_INITIAL_VALUES = {
	title: '',
	ingredients: []
};

const RECIPY_VALIDATION_SCHEMA = yup.object({
	title: yup.string().required('Title is required').max(50, 'Title must be less than 50 characters'),
	ingredients: yup.array().of(INGREDIENT_VALIDATION_SCHEMA).min(1, 'Must create at least one ingredient')
});

function submit(values: any, { setSubmitting }: any) {
	console.log(values);
	setSubmitting(false);
}

export default function RecipyForm() {

	return (
		<>
			<Card>
				<CardHeader title="Create Recipy" />
				<CardContent>
					<Formik
						initialValues={DEFAULT_INITIAL_VALUES}
						validationSchema={RECIPY_VALIDATION_SCHEMA}
						onSubmit={submit}
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
				</CardContent>
			</Card>
		</>
	);

}