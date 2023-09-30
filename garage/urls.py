from django.contrib import admin
from django.urls import include, path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login.html", views.login_user, name="login"),
    path("logout.html", views.logout_user, name="logout"),

    path("admin/home.html", views.admin_home_html, name="admin_home_html"),
    path("admin/services.html", views.admin_services_html, name="admin_services_html"),

    path('services/delete/<int:id>/', views.delete_service, name="delete_service"),
    path("services.json", views.services_json, name="services_json"),
]
