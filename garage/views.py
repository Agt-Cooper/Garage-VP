from django.contrib.auth import authenticate, login
from django.contrib.auth import logout
from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect
from django.shortcuts import render
from django.template import loader

from .models import Service


###############################################################################
################ HTML Front-End ###############################################
###############################################################################

def index(request):
    template = loader.get_template("garage/home.html")
    context = {
        'page_script': 'js/home.js',
    }
    return HttpResponse(template.render(context, request))

def admin_home_html(request):
    template = loader.get_template("garage/admin_home.html")
    context = {'page_title': 'Administration' }
    return HttpResponse(template.render(context, request))

    

def admin_services_html(request):

    service_id = request.GET.get('id', None)
    context = {
        'page_title': 'Administration / Services',
        'page_script': 'js/admin_services.js',
    }

    if request.method == 'POST':
        # Dans le cas d'une requête POST
        # On utilise les paramètres envoyés par la page précédente pour
        # ou mettre le produit à jour
        # ou créer un nouveau produit

        if service_id is None:
            service = Service()
            context['page_information'] = 'Service créé'
        else:
            service = Service.objects.get(id=service_id)
            context['page_information'] = 'Service mis à jour'

        service.name    = request.POST.get('service_name', 'Service')
        service.price   = request.POST.get('service_price', 0)
        service.enabled = 'service_enabled' in request.POST

        if 'service_img_name' in request.FILES:
            service.picture = request.FILES['service_img_name']

        service.save()

    template = loader.get_template("garage/admin_services.html")
    return HttpResponse(template.render(context, request))


def logout_user(request):
    logout(request)
    return redirect('/')


def login_user(request):
    if request.method == 'POST':
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        if user is None:
            return redirect('login.html')

        login(request, user)
        return redirect('admin/home.html')

    template = loader.get_template("garage/login.html")
    context = {
    }
    return HttpResponse(template.render(context, request))

###############################################################################
################ Web Service ##################################################
###############################################################################

def delete_service(request, id):
    to_delete = Service.objects.get(id=id)
    if to_delete is not None:
        to_delete.delete()
        return JsonResponse({'result': True})
    return JsonResponse({'result': False})

def services_json(request):
    all_services = request.GET.get('all', None)
    service_id = request.GET.get('id', None)

    services = Service.objects.all()

    if all_services is None:
        services = services.filter(enabled=True)

    if service_id is not None:
        services = services.filter(pk=service_id)

    return JsonResponse({'services': [s.desc() for s in services]})


