from django.urls import path

from . import views

from .views import *

urlpatterns = [
  path('recipy/', RecipiesView.as_view()),
  path('recipy/<int:id>/', RecipyView.as_view()),
  path('ingredient/', IngredientsView.as_view()),
  path('ingredient/<int:id>/', IngredientView.as_view())
]