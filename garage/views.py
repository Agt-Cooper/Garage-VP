from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.template import loader

from .models import Service


###############################################################################
################ HTML Front-End ###############################################
###############################################################################

def index(request):
    services = Service.objects.filter(enabled=True)
    template = loader.get_template("garage/home.html")
    context = {
        'page_title': 'Garage VP',
    }
    return HttpResponse(template.render(context, request))


def admin_services_html(request):
    template = loader.get_template("garage/admin_services.html")
    context = {
        'page_title': 'Administration / Services',
        'page_script': 'js/admin_services.js',
    }
    return HttpResponse(template.render(context, request))


def services_html(request):
    services = Service.objects.filter(enabled=True)
    template = loader.get_template("garage/services.html")
    context = {
        'page_title': 'Nos Services',
        'service_list': services,
    }
    return HttpResponse(template.render(context, request))

###############################################################################
################ Web Service ##################################################
###############################################################################


def services_json(request):
    service_id = request.GET.get('id', None)

    services = Service.objects.filter(enabled=True)

    if service_id is not None:
        services = services.filter(pk=service_id)

    return JsonResponse({'services': [s.desc() for s in services]})
