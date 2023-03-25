from django.urls import path

from . import views

urlpatterns = [
  path('recipy/', views.recipies, name='recipies'),
  path('recipy/<int:id>/', views.recipy, name='recipy'),

  path('ingredient/', views.ingredients, name='ingredients'),
  path('ingredient/<int:id>', views.ingredient, name='ingredient')
]