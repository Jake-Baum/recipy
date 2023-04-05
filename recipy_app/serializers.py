from django.db.models import fields
from rest_framework.serializers import ModelSerializer, IntegerField
from .models import Recipy, Ingredient


class IngredientSerializer(ModelSerializer):
	id = IntegerField(required=False)

	class Meta:
		model = Ingredient
		fields = '__all__'
		extra_kwargs = {
			'name': {'validators': []}
		}


class RecipySerializer(ModelSerializer):
	id = IntegerField(required=False)
	ingredients = IngredientSerializer(many=True)

	class Meta:
		model = Recipy
		fields = '__all__'


	def create(self, validated_data):
		ingredients = validated_data.pop('ingredients')
		recipy = Recipy.objects.create(**validated_data)

		for ingredient in ingredients:
			try:
				if 'id' in ingredient:
					existing_ingredient = Ingredient.objects.get(id=ingredient['id'])
					existing_ingredient.recipies.add(recipy) # type: ignore
				else:
					new_ingredient = Ingredient.objects.create(**ingredient)
					new_ingredient.recipies.add(recipy) # type: ignore
			except Ingredient.DoesNotExist:
				new_ingredient = Ingredient.objects.create(**ingredient)
				new_ingredient.recipies.add(recipy) # type: ignore

		return recipy
	
	def update(self, instance, validated_data):
		instance.title = validated_data.get('title', instance.title)
		instance.ingredients.set([])

		ingredients = validated_data.pop('ingredients')
		for ingredient in ingredients:
			try:
				if 'id' in ingredient:
					existing_ingredient = Ingredient.objects.get(id=ingredient['id'])
					existing_ingredient.recipies.add(instance) # type: ignore
				else:
					new_ingredient = Ingredient.objects.create(**ingredient)
					new_ingredient.recipies.add(instance) # type: ignore
			except Ingredient.DoesNotExist:
				new_ingredient = Ingredient.objects.create(**ingredient)
				new_ingredient.recipies.add(instance) # type: ignore

		return instance
