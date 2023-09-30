function preparePage() {
  getServiceList()

  // document.getElementById('admDetailsEnabled').addEventListener('click', updateEnableProductCheckbox);
  document.getElementById('admValidate').disabled = true;
  document.getElementById('admCreate').addEventListener('click', prepareNewService);
  document.getElementById('admDelete').addEventListener('click', deleteCurrentService);
}

function prepareNewService() {
  alert('prepareNewService()');
}

function deleteCurrentService() {
  alert('deleteCurrentService()');
}

function updateEnableServiceCheckbox() {
  cbxEnabled = document.getElementById('admDetailsEnabled');
  lblEnabled = document.getElementById('admDetailsEnabledLabel');
  lblEnabled.innerHTML = cbxEnabled.checked ? 'Actif' : 'Inactif';
}

function clearServiceDetailsForm() {
  document.getElementById('admin-service-details-form').reset();
  document.getElementById('admDetailsName').value = "";
  document.getElementById('admDetailsPrice').value = 0.0;
  document.getElementById('admDetailsEnabled').checked = false;

  // clearThumbnail();
  // updatePromoFormEnabled();
  updateEnableServiceCheckbox();

  formService  = document.getElementById('admin-service-details-form');
  // delete formService .dataset.current_service;
  // formService .action = "admin.html";
  document.getElementById('admin-service-list').childNodes.forEach(btnToUnselect => { btnToUnselect.classList.remove('active'); });
  document.getElementById('admDelete').hidden=true;
}

// Remplit le formulaire de droite avec les informations du service
// dont l'id est en paramètre
function populateServiceForm(service_id) {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        services = JSON.parse(this.responseText).services
        service = services[0]

        clearServiceDetailsForm();

        // Mettre à jour le formulaire
        document.getElementById('admDetailsName').value = service.name;
        document.getElementById('admDetailsPrice').value = service.price;
        document.getElementById('admDetailsEnabled').checked = service.enabled;

        // document.getElementById('admDetailsEnabled').checked = product.enabled;
        // document.getElementById('admDetailsCat').value = product.category;
        updateEnableServiceCheckbox();

        formProduct = document.getElementById('admin-service-details-form');
        // formProduct.dataset.current_product = service.id;
        formProduct.action = "admin.html?id="+service.id;

        btnValidate = document.getElementById('admValidate');
        btnValidate.innerHTML= 'Mettre à jour';
        btnValidate.disabled = false;
      }
  }

  xhttp.open('GET', '/services.json?id='+service_id, true)
  xhttp.send(null)
  
}

function onAdminService_Click(type, listenever) {


  // Récupérer l'ID du service selectionné
  btnSelected = type.target;
  populateServiceForm(btnSelected.dataset.service_id)

  // Mettre à jour la Preview (plus tard)
  
  // Afficher le bouton de suppression

  // Désactive tous les boutons, active celui là
}

// Récupère la liste des services et les affiche dans 'admin-service-list'
function getServiceList() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        services = JSON.parse(this.responseText).services
        divServices = document.getElementById('admin-service-list');

        services.forEach(service => {
            btnProduct = document.createElement('button');
            btnProduct.type = 'button'
            btnProduct.classList.add('list-group-item');
            btnProduct.classList.add('list-group-item-action');
            btnProduct.dataset.service_id = service.id;
            btnProduct.addEventListener("click", onAdminService_Click); 
            btnProduct.innerHTML += service.name
            divServices.appendChild(btnProduct);
        });
      }
    };

    xhttp.open('GET', '/services.json', true);
    xhttp.send(null);
}


document.onload = preparePage()

