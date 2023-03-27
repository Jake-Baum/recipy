import { Button, TextField } from "@mui/material";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import { useState } from "react";
import * as yup from 'yup';

export default function RecipyForm() {
	const [count, setCount] = useState(0);

	const validationSchema = yup.object({
		title: yup.string().required('Title is required')
	});

	const formik = useFormik({
		initialValues: {
			title: '',
			recipies: []
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			console.log(values);
		},
	});


	return (
		<div>
			<form onSubmit={formik.handleSubmit}>
				<TextField
					fullWidth
					id="title"
					name="title"
					label="title"
					value={formik.values.title}
					onChange={formik.handleChange}
					error={formik.touched.title && Boolean(formik.errors.title)}
					helperText={formik.touched.title && formik.errors.title}
				/>
				<Button color="primary" variant="contained" fullWidth type="submit">Save Recipy</Button>
			</form>
		</div>
	);

}