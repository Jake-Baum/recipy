from django.contrib import admin

from .models import Recipy, Ingredient

admin.site.register(Recipy)
admin.site.register(Ingredient)