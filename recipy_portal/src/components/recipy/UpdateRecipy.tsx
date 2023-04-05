import { Alert, Card, CardContent, CardHeader, Snackbar } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import {useParams} from "react-router-dom"
import RecipyForm from "./RecipyForm";

export default function UpdateRecipy() {
	const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
	const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
	const [recipy, setRecipy] = useState(undefined);

	const id = useParams().id;
	
	useEffect(() => {
		let mounted = true;

		axios.get(`/api/recipy/${id}/`).then(response => {
			if (mounted) {
				setRecipy(response.data);
			}
		}).catch(error => {
			console.error(error);
		});

		return () => { mounted = false; };
	}, []);


	const submit = (values: any, { setSubmitting }: any) => {
		axios.put(`/api/recipy/${id}/`, values).then(response => {
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
				<CardHeader title="Update Recipy" />
				<CardContent>
					<RecipyForm submit={submit} value={recipy}></RecipyForm>
				</CardContent>
			</Card>

			<Snackbar
				open={showSuccessSnackbar}
				autoHideDuration={5000}
				anchorOrigin={{vertical: "bottom", horizontal: "center"}}
				onClose={() => setShowSuccessSnackbar(false)}
			>
				<Alert onClose={() => setShowSuccessSnackbar(false)} severity="success">Recipy updated successfully!</Alert>
			</Snackbar>

			<Snackbar
				open={showErrorSnackbar}
				autoHideDuration={5000}
				anchorOrigin={{vertical: "bottom", horizontal: "center"}}
				onClose={() => setShowErrorSnackbar(false)}
			>
				<Alert onClose={() => setShowErrorSnackbar(false)} severity="error">Something went wrong during update</Alert>
			</Snackbar>
		</>
	);
}