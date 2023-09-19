from django.contrib import admin
from django.urls import include, path

from . import views

urlpatterns = [
    path("garage/", include("garage.urls")),
    path("admin/", admin.site.urls),
]