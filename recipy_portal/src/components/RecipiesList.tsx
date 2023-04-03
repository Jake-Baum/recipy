import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function RecipiesList() {

	const [recipies, setRecipies] = useState([]);

	useEffect(() => {
		let mounted = true;

		axios.get('/api/recipy').then(res => {
			if (mounted) {
				setRecipies(res.data);
			}
		}).catch(err => {
			console.error(err);
		});

		return () => { mounted = false; };
	}, []);

	return (
		<>
			<h2>Recipies</h2>
			<ul>
				{
					recipies.map((item: any) => (
						<li key={item.id}>
							<span>{item.id} - {item.title}</span>
						</li>
					))
				}
			</ul>
			<Link to="/recipy/create">Create Recipy</Link>
		</>
	);
}