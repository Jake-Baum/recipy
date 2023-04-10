import { Alert, Card, CardContent, CardHeader, Snackbar } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Recipy from "../../model/recipy.interface";
import RecipyForm from "./RecipyForm";
import styles from './RecipyForm.module.css';

export default function CreateRecipy() {
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const navigate = useNavigate();

	const submit = (values: any, { setSubmitting }: any) => {
		axios.post<Recipy>('/api/recipy/', values).then((response: { data: Recipy }) => {
			setSuccessMessage('Recipy created successfully');
			navigate(`/recipy/${response.data.id}`);
		}).catch(error => {
			switch (error.response.status) {
				case 400:
					setErrorMessage(error.response.data.non_field_errors[0]);
					break;
				default:
					setErrorMessage('An unexpected error occurred');
			}
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
				open={!!successMessage}
				autoHideDuration={5000}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				onClose={() => setSuccessMessage(null)}
			>
				<Alert onClose={() => setSuccessMessage(null)} severity="success">{successMessage}</Alert>
			</Snackbar>

			<Snackbar
				open={!!errorMessage}
				autoHideDuration={5000}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				onClose={() => setErrorMessage(null)}
			>
				<Alert onClose={() => setErrorMessage(null)} severity="error">{errorMessage}</Alert>
			</Snackbar>
		</>
	);
}