import Ingredient from "./ingredient.interface";

export default interface Recipy {
	id?: number;
	title: string;
	ingredients: Ingredient[]
}