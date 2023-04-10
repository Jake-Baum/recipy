from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Ingredient(models.Model):
  name = models.CharField(max_length=50, unique=True, null=False)

  def __str__(self):
    return self.name

class Recipy(models.Model):

  class Meta:
    constraints = [
      models.UniqueConstraint(fields=['owner', 'title'], name='owner_title_unique')
    ]

  owner = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
  title = models.CharField(max_length=50, null=False)
  ingredients = models.ManyToManyField(Ingredient, related_name='recipies')

  def __str__(self):
    return self.title