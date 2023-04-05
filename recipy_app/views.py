from django.shortcuts import get_object_or_404
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse

from rest_framework.views import APIView
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated

from .serializers import RecipySerializer, IngredientSerializer
from .models import Recipy, Ingredient

class RecipiesView(APIView):
  permission_classes = (IsAuthenticated, )
  authentication_classes = (BasicAuthentication, )

  def get(self, request):
    recipies = Recipy.objects.filter(**request.GET.dict())

    return JsonResponse(RecipySerializer(recipies, many=True).data, safe=False) 
  
  def post(self, request):
    recipy = RecipySerializer(data=request.data)

    if not recipy.is_valid():
      return HttpResponseBadRequest()
    
    recipy.save()
    return JsonResponse(recipy.data, safe=False)
  
class RecipyView(APIView):
  permission_classes = (IsAuthenticated, )
  authentication_classes = (BasicAuthentication, )
  
  def get(self, request, id):
    recipy = get_object_or_404(Recipy, pk=id)

    return JsonResponse(RecipySerializer(recipy).data, safe=False)
  
  def put(self, request, id):
    recipy = get_object_or_404(Recipy, pk=id)

    new_recipy = RecipySerializer(data=request.data, instance=recipy)
    if not new_recipy.is_valid():
      return HttpResponseBadRequest()
    
    new_recipy.save()
    return JsonResponse(new_recipy.data, safe=False)
  
  def delete(self, request, id):
    recipy = get_object_or_404(Recipy, pk=id)
    recipy.delete()

    return HttpResponse(status=204)

class IngredientsView(APIView):
  def get(self, request):
    ingredients = Ingredient.objects.filter(**request.GET.dict())

    return JsonResponse(IngredientSerializer(ingredients, many=True).data, safe=False) 
  
  def post(self, request):
    ingredient = IngredientSerializer(data=request.data)

    if not ingredient.is_valid():
      return HttpResponseBadRequest()
    
    ingredient.save()
    return JsonResponse(ingredient.data, safe=False)
  
class IngredientView(APIView):
  def get(self, request, id):
    ingredient = get_object_or_404(Ingredient, pk=id)

    return JsonResponse(IngredientSerializer(ingredient).data, safe=False)
  
  def put(self, request, id):
    ingredient = get_object_or_404(Ingredient, pk=id)

    new_ingredient = IngredientSerializer(data=request.data, instance=ingredient)
    if not new_ingredient.is_valid():
      return HttpResponseBadRequest()
    
    new_ingredient.save()
    return JsonResponse(new_ingredient.data, safe=False)
  
  def delete(self, request, id):
    ingredient = get_object_or_404(Ingredient, pk=id)
    ingredient.delete()

    return HttpResponse(status=204)