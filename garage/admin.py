from django.contrib import admin

from .models import Service, OpeningHours

admin.site.register(OpeningHours)
admin.site.register(Service)
