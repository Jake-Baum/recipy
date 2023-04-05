import { Add, Remove } from "@mui/icons-material";
import { Alert, Button, Card, CardContent, CardHeader, FormHelperText, IconButton, Snackbar, TextField } from "@mui/material";
import axios from "axios";
import { FieldArray, Form, Formik } from "formik";
import { useState } from "react";
import * as yup from 'yup';
import IngredientForm, { INGREDIENT_VALIDATION_SCHEMA } from "./IngredientForm";
import styles from './RecipyForm.module.css';

const DEFAULT_INITIAL_VALUES = {
	title: '',
	ingredients: []
};

const RECIPY_VALIDATION_SCHEMA = yup.object({
	title: yup.string().required('Title is required').max(50, 'Title must be less than 50 characters'),
	ingredients: yup.array().of(INGREDIENT_VALIDATION_SCHEMA).min(1, 'Must create at least one ingredient')
});



export default function RecipyForm() {

	const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
	const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);

	const submit = (values: any, { setSubmitting }: any) => {
		axios.post('/api/recipy/', values).then(response => {
			setShowSuccessSnackbar(true);
		}).catch(error => {
			setShowErrorSnackbar(true);
		}).finally(() => {
			setSubmitting(false);
		});
	}

	return (
		<>
			<Card>
				<CardHeader title="Create Recipy" className={styles.something} />
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

			<Snackbar
				open={showSuccessSnackbar}
				autoHideDuration={5000}
				onClose={() => setShowSuccessSnackbar(false)}
			>
				<Alert onClose={() => setShowSuccessSnackbar(false)} severity="success">Recipy saved successfully!</Alert>
			</Snackbar>

			<Snackbar
				open={showErrorSnackbar}
				autoHideDuration={5000}
				onClose={() => setShowErrorSnackbar(false)}
			>
				<Alert onClose={() => setShowErrorSnackbar(false)} severity="error">Something went wrong during save</Alert>
			</Snackbar>
		</>
	);

}