import { Alert, Card, CardContent, CardHeader, Snackbar } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import RecipyForm from "./RecipyForm";
import styles from './RecipyForm.module.css';

export default function CreateRecipy() {
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
					<RecipyForm submit={submit}></RecipyForm>
				</CardContent>
			</Card>

			<Snackbar
				open={showSuccessSnackbar}
				autoHideDuration={5000}
				anchorOrigin={{vertical: "bottom", horizontal: "center"}}
				onClose={() => setShowSuccessSnackbar(false)}
			>
				<Alert onClose={() => setShowSuccessSnackbar(false)} severity="success">Recipy saved successfully!</Alert>
			</Snackbar>

			<Snackbar
				open={showErrorSnackbar}
				autoHideDuration={5000}
				anchorOrigin={{vertical: "bottom", horizontal: "center"}}
				onClose={() => setShowErrorSnackbar(false)}
			>
				<Alert onClose={() => setShowErrorSnackbar(false)} severity="error">Something went wrong during save</Alert>
			</Snackbar>
		</>
	);
}