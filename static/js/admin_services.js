////////////////////////////////////////////////////////////////////////////////
/// Page initialization scripts
function preparePage() {
  clearServiceDetailsForm()
  getServiceList()

  document.getElementById('admDetailsEnabled').addEventListener('click', updateEnableServiceCheckbox);
  document.getElementById('admValidate').disabled = true;
  document.getElementById('admCreate').addEventListener('click', prepareNewService);
  document.getElementById('admDelete').addEventListener('click', deleteCurrentService);


  preselected_id = new URLSearchParams(window.location.search).get('id');
  if(preselected_id != null) {
    prepareExistingService(preselected_id)

    // Desactive tous les boutons et active celui qui est sélectioné
    document.getElementById('admin-service-list').childNodes.forEach(btnService => { 
      // console.log(btnService.dataset.service_id)
      if (btnService.dataset.service_id == preselected_id) {
        btnService.classList.add('active')
      }
    })
  }
}

////////////////////////////////////////////////////////////////////////////////
/// Présente le formulaire pour un nouveau service prêt à être créé
function prepareNewService() {
  clearServiceDetailsForm();
  information("")

  btnValidate = document.getElementById('admValidate');
  btnValidate.innerHTML= 'Créer Service';
  btnValidate.disabled = false;
}

////////////////////////////////////////////////////////////////////////////////
/// Supprime le service actuellement sélectionné de la base de données
function deleteCurrentService() {
  var xhttp = new XMLHttpRequest();

   xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        preparePage()
        information("Service Supprimé")
      }
    }

  form = document.getElementById('admin-service-details-form');
  service_id = form.dataset.current_service;
  xhttp.open('GET', '/services/delete/'+service_id+'/', true);
  xhttp.send();
}

////////////////////////////////////////////////////////////////////////////////
/// Met à jour le texte du bouton Actif/Inactif du formulaire
function updateEnableServiceCheckbox() {
  cbxEnabled = document.getElementById('admDetailsEnabled');
  lblEnabled = document.getElementById('admDetailsEnabledLabel');
  lblEnabled.innerHTML = cbxEnabled.checked ? 'Actif' : 'Inactif';
}

////////////////////////////////////////////////////////////////////////////////
/// Réinitialise la page pour un état "propre"
function clearServiceDetailsForm() {
  document.getElementById('admin-service-details-form').reset();
  document.getElementById('admDetailsName').value = "";
  document.getElementById('admDetailsPrice').value = 0.0;
  document.getElementById('admDetailsEnabled').checked = false;

  updateEnableServiceCheckbox();

  formProduct = document.getElementById('admin-service-details-form');
  delete formProduct.dataset.current_service;
  formProduct.action = "admin.html";
  document.getElementById('admin-service-list').childNodes.forEach(btnToUnselect => { btnToUnselect.classList.remove('active'); });
  document.getElementById('admDelete').hidden=true;

  btnValidate = document.getElementById('admValidate');
  btnValidate.innerHTML= 'Sélectionnez un service dans la liste';
  btnValidate.disabled = true;
}

////////////////////////////////////////////////////////////////////////////////
// Remplit le formulaire de droite avec les informations du service
// dont l'id est en paramètre
function populateServiceForm(service_id) {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        services = JSON.parse(this.responseText).services
        service = services[0]


        // Mettre à jour le formulaire
        document.getElementById('admDetailsName').value = service.name;
        document.getElementById('admDetailsPrice').value = service.price;
        document.getElementById('admDetailsEnabled').checked = service.enabled;

        // document.getElementById('admDetailsEnabled').checked = product.enabled;
        // document.getElementById('admDetailsCat').value = product.category;
        updateEnableServiceCheckbox();

        formProduct = document.getElementById('admin-service-details-form');
        formProduct.dataset.current_service = service.id;
        formProduct.action = "admin.html?id="+service.id;

        btnValidate = document.getElementById('admValidate');
        btnValidate.innerHTML= 'Mettre à jour';
        btnValidate.disabled = false;
      }
  }

  xhttp.open('GET', '/services.json?all&id='+service_id, true)
  xhttp.send(null)
  
}

////////////////////////////////////////////////////////////////////////////////
function prepareExistingService(service_id) {
  clearServiceDetailsForm();
  information("")

  populateServiceForm(service_id)

  // Mettre à jour la Preview 
  refreshServices('admin-service-preview', '?all&id='+service_id);
  
  // Afficher le bouton de suppression
  document.getElementById('admDelete').hidden=false;
}

////////////////////////////////////////////////////////////////////////////////
/// Gestion de sélection d'un service dans la liste de gauche
function onAdminService_Click(type, listener) {
  // Récupérer l'ID du service selectionné
  btnSelected = type.target;
  service_id = btnSelected.dataset.service_id

  prepareExistingService(service_id)

  // Desactive tous les boutons et active celui qui est sélectioné
  document.getElementById('admin-service-list').childNodes.forEach(btnToUnselect => { btnToUnselect.classList.remove('active'); })
  btnSelected.classList.add('active')
}

////////////////////////////////////////////////////////////////////////////////
// Récupère la liste des services et les affiche dans 'admin-service-list'
function getServiceList() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        services = JSON.parse(this.responseText).services
        divServices = document.getElementById('admin-service-list');

        divServices.innerHTML = "";

        services.forEach(service => {
            btnProduct = document.createElement('button');
            btnProduct.type = 'button'
            btnProduct.classList.add('list-group-item');
            btnProduct.classList.add('list-group-item-action');
            btnProduct.dataset.service_id = service.id;
            btnProduct.addEventListener("click", onAdminService_Click); 
            if (new URLSearchParams(window.location.search).get('id') == service.id) {
              btnProduct.classList.add('active')
            }
            btnProduct.innerHTML += service.name
            divServices.appendChild(btnProduct);
        });
      }
    };

    xhttp.open('GET', '/services.json?all', true);
    xhttp.send(null);
}

function information(message) {
  pInfo = document.getElementById('information');
  if (message != null && message.length > 0) {
    pInfo.innerHTML = message;
  } else {
    pInfo.innerHTML = "";
  }
}


document.onload = preparePage()


