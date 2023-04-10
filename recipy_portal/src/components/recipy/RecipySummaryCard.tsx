import { Card, CardContent } from "@mui/material";
import Recipy from "../../model/recipy.interface";
import { Link } from "react-router-dom";
import styles from './RecipySummaryCard.module.css';

export default function RecipySummaryCard({ recipy }: { recipy: Recipy }) {
	return (
		<>
			<Card component={Link} to={`/recipy/${recipy.id}`}>
				<CardContent className={styles['recipy-summary-card']}>
					{recipy.id} - {recipy.title}
				</CardContent>
			</Card>
		</>
	)
}