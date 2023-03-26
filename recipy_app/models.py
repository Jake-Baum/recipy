from django.db import models

# Create your models here.

class Ingredient(models.Model):
  name = models.CharField(max_length=50)

  def __str__(self):
    return self.name

class Recipy(models.Model):
  title = models.CharField(max_length=50)
  ingredients = models.ManyToManyField(Ingredient, related_name='recipies')

  def begins_with(self, s):
    return self.title.startswith(s)

  def __str__(self):
    return self.title