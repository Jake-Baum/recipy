import { Alert, Card, CardContent, CardHeader, Snackbar } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Recipy from "../../model/recipy.interface";
import RecipyForm from "./RecipyForm";
import styles from './RecipyForm.module.css';
import { useSnackbar } from "../../services/SnackBarService";

export default function CreateRecipy() {
	const snackbar = useSnackbar();
	const navigate = useNavigate();

	const submit = (values: any, { setSubmitting }: any) => {
		axios.post<Recipy>('/api/recipy/', values).then((response: { data: Recipy }) => {
			snackbar({ message: 'Recipy created successfully', severity: 'success' });
			navigate(`/recipy/${response.data.id}`);
		}).catch(error => {
			switch (error.response.status) {
				case 400:
					snackbar({ message: error.response.data.non_field_errors[0], severity: 'error' });
					break;
				default:
					snackbar({ message: 'An unexpected error occurred', severity: 'error' });
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
		</>
	);
}