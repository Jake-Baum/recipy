import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecipySummaryCard from "./recipy/RecipySummaryCard";
import { Fab } from "@mui/material";
import { Add } from "@mui/icons-material";

export default function RecipiesList() {

	const [recipies, setRecipies] = useState([]);

	useEffect(() => {
		axios.get('/api/recipy').then(response => {
			setRecipies(response.data);
		}).catch(error => {
			console.error(error);
		});
	}, []);

	return (
		<>
			<h2>Recipies</h2>
			{
				recipies.map((item: any) => (
					<RecipySummaryCard recipy={item} key={item.id} />
				))
			}
			<Fab color="primary" variant="extended">
				<Link to="/recipy/create"><Add /> Create Recipy</Link>
			</Fab>
		</>
	);
}