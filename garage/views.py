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

    service_id = request.GET.get('id', None)
    # print(f"service_id: {service_id}")

    if request.method == 'POST':
        # Dans le cas d'une requête POST
        # On utilise les paramètres envoyés par la page précédente pour
        # ou mettre le produit à jour
        # ou créer un nouveau produit

        if service_id is None:
            service = Service()
        else:
            service = Service.objects.get(id=service_id)

        service.name    = request.POST.get('service_name', 'Service')
        service.price   = request.POST.get('service_price', 0)
        service.enabled = 'service_enabled' in request.POST

        if 'service_img_name' in request.FILES:
            service.picture = request.FILES['service_img_name']

        service.save()

    template = loader.get_template("garage/admin_services.html")
    context = {
        'page_title': 'Administration / Services',
        'page_script': 'js/admin_services.js',
    }
    return HttpResponse(template.render(context, request))


###############################################################################
################ Web Service ##################################################
###############################################################################


def services_json(request):
    services = Service.objects.all()

    service_id = request.GET.get('id', None)
    if service_id is not None:
        services = services.filter(pk=service_id)

    return JsonResponse({'services': [s.desc() for s in services]})

###############################################################################
################ On verra plus tard ###########################################
###############################################################################
def services_html(request):
    services = Service.objects.filter(enabled=True)
    template = loader.get_template("garage/services.html")
    context = {
        'page_title': 'Nos Services',
        'service_list': services,
    }
    return HttpResponse(template.render(context, request))

