import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
			<ul>
				{
					recipies.map((item: any) => (
						<li key={item.id}>
							<Link to={`/recipy/${item.id}`}><span>{item.id} - {item.title}</span></Link>
						</li>
					))
				}
			</ul>
			<Link to="/recipy/create">Create Recipy</Link>
		</>
	);
}