from django.db.models import fields
from rest_framework.serializers import ModelSerializer, IntegerField, CurrentUserDefault, HiddenField, ValidationError
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
	owner = HiddenField(default=CurrentUserDefault())
	ingredients = IngredientSerializer(many=True)

	class Meta:
		model = Recipy
		fields = '__all__'

	def validate(self, attrs):
		if self.context['request'].method == 'POST':
			existing_recipy_with_title = Recipy.objects.filter(owner=attrs['owner'], title=attrs['title']).first()
			if existing_recipy_with_title:
				raise ValidationError('Recipy with title {} already exists'.format(attrs['title']))
		
		return super().validate(attrs)

	def create(self, validated_data):
		ingredients = validated_data.pop('ingredients')
		recipy = Recipy.objects.create(**validated_data)

		for ingredient in ingredients:
			try:
				existing_ingredient = Ingredient.objects.get(name=ingredient['name'])
				existing_ingredient.recipies.add(recipy) # type: ignore
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
				existing_ingredient = Ingredient.objects.get(name=ingredient['name'])
				existing_ingredient.recipies.add(instance) # type: ignore
			except Ingredient.DoesNotExist:
				new_ingredient = Ingredient.objects.create(**ingredient)
				new_ingredient.recipies.add(instance) # type: ignore

		return instance
