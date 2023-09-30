function preparePage() {
  getServiceList()

  document.getElementById('admDetailsEnabled').addEventListener('click', updateEnableServiceCheckbox);

  document.getElementById('admValidate').disabled = true;
  document.getElementById('admCreate').addEventListener('click', prepareNewService);
  document.getElementById('admDelete').addEventListener('click', deleteCurrentService);
}

function prepareNewService() {
  clearServiceDetailsForm();

  btnValidate = document.getElementById('admValidate');
  btnValidate.innerHTML= 'Créer Service';
  btnValidate.disabled = false;
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

  updateEnableServiceCheckbox();

  formProduct = document.getElementById('admin-service-details-form');
  formProduct.action = "admin.html";
  document.getElementById('admin-service-list').childNodes.forEach(btnToUnselect => { btnToUnselect.classList.remove('active'); });
  document.getElementById('admDelete').hidden=true;

  btnValidate = document.getElementById('admValidate');
  btnValidate.innerHTML= 'Sélectionnez un service dans la liste';
  btnValidate.disabled = true;
}

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

  clearServiceDetailsForm();


  // Récupérer l'ID du service selectionné
  btnSelected = type.target;
  populateServiceForm(btnSelected.dataset.service_id)

  // Mettre à jour la Preview (plus tard)
  
  // Afficher le bouton de suppression

  // Desactive tous les boutons et active celui qui est sélectioné
  document.getElementById('admin-service-list').childNodes.forEach(btnToUnselect => { btnToUnselect.classList.remove('active'); })
  btnSelected.classList.add('active')
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

