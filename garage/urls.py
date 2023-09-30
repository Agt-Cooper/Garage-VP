from django.contrib import admin
from django.urls import include, path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("services.html", views.services_html, name="services_html"),
    path("services.json", views.services_json, name="services_json"),
    path("services/admin.html", views.admin_services_html, name="admin_services_html"),
    path('services/delete/<int:id>/', views.delete_service, name="delete_service"),
]
