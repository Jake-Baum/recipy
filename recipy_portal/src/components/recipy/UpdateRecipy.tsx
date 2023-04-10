import { Alert, Card, CardContent, CardHeader, Snackbar } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import RecipyForm from "./RecipyForm";
import Recipy from "../../model/recipy.interface";
import { useSnackbar } from "../../services/SnackBarService";

export default function UpdateRecipy() {
	const snackbar = useSnackbar();
	const [recipy, setRecipy] = useState<Recipy | undefined>(undefined);

	const id = useParams().id;

	useEffect(() => {
		axios.get<Recipy>(`/api/recipy/${id}/`).then(response => {
			setRecipy(response.data);
		}).catch(error => {
			snackbar({ message: 'An unexpected error occurred', severity: 'error' });
		});
	}, [id]);


	const submit = (values: any, { setSubmitting }: any) => {
		axios.put(`/api/recipy/${id}/`, values).then(response => {
			snackbar({ message: 'Recipy updated successfully', severity: 'success' });
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
				<CardHeader title="Update Recipy" />
				<CardContent>
					<RecipyForm submit={submit} value={recipy}></RecipyForm>
				</CardContent>
			</Card>
		</>
	);
}