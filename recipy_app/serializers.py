from django.db.models import fields
from rest_framework.serializers import ModelSerializer
from .models import Recipy, Ingredient


class IngredientSerializer(ModelSerializer):

	class Meta:
		model = Ingredient
		fields = '__all__'


class RecipySerializer(ModelSerializer):
	ingredients = IngredientSerializer(many=True)

	class Meta:
		model = Recipy
		fields = '__all__'


	def create(self, validated_data):
		ingredients = validated_data.pop('ingredients')
		recipy = Recipy.objects.create(**validated_data)

		for ingredient in ingredients:
			new_ingredient = Ingredient.objects.create(**ingredient)
			new_ingredient.recipies.add(recipy) # type: ignore
	    
		return recipy
	
	def update(self, instance, validated_data):
		instance.title = validated_data.get('title', instance.title)
		instance.ingredients.set([])

		ingredients = validated_data.pop('ingredients')
		for ingredient in ingredients:
			new_ingredient = Ingredient.objects.create(**ingredient)
			new_ingredient.recipies.add(instance) # type: ignore

		return instance