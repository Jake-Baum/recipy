from django.shortcuts import get_object_or_404
from django.http import HttpResponse, Http404, JsonResponse

from .models import Recipy, Ingredient

# Create your views here.
def recipies(request):
  recipies = list(Recipy.objects.values())
  return JsonResponse(recipies, safe=False)

def recipy(request, id):
  return JsonResponse(get_object_or_404(Recipy, pk=id), safe=False)


def ingredients(request):
  ingredients = Ingredient.objects.values()
  return JsonResponse(ingredients, safe=False)

def ingredient(request, id):
  return JsonResponse(get_object_or_404(Ingredient, pk=id), safe=False)