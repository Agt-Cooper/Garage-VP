from django.contrib import admin

from .models import Service, OpeningHours, Product

admin.site.register(OpeningHours)
admin.site.register(Product)
admin.site.register(Service)
