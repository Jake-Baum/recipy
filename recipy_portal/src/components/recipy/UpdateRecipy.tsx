import { Alert, Card, CardContent, CardHeader, Snackbar } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import RecipyForm from "./RecipyForm";
import Recipy from "../../model/recipy.interface";

export default function UpdateRecipy() {
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [recipy, setRecipy] = useState<Recipy | undefined>(undefined);

	const id = useParams().id;

	useEffect(() => {
		axios.get<Recipy>(`/api/recipy/${id}/`).then(response => {
			setRecipy(response.data);
		}).catch(error => {
			switch (error.response.status) {
				case 400:
					setErrorMessage(error.response.data.non_field_errors[0]);
					break;
				default:
					setErrorMessage('An unexpected error occurred');
			}
		});
	}, [id]);


	const submit = (values: any, { setSubmitting }: any) => {
		axios.put(`/api/recipy/${id}/`, values).then(response => {
			setSuccessMessage('Recipy updated successfully');
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
				<CardHeader title="Update Recipy" />
				<CardContent>
					<RecipyForm submit={submit} value={recipy}></RecipyForm>
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