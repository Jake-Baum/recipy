from django.urls import path
from rest_framework.authtoken import views as auth
from .views import *

urlpatterns = [
  path('login/', auth.obtain_auth_token),

  path('recipy/', RecipiesView.as_view()),
  path('recipy/<int:id>/', RecipyView.as_view()),
  path('ingredient/', IngredientsView.as_view()),
  path('ingredient/<int:id>/', IngredientView.as_view())
]