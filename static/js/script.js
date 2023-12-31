function buildServiceDiv(service) {

  // Image
  divPic = document.createElement('div');
  divPic.classList.add('service-img');
  img = document.createElement('img');
  img.src = service.picture;
  img.alt = service.name;
  divPic.appendChild(img);

  // Product info bloc
  divInfo = document.createElement('div');
  divInfo.classList.add('service-info');

  // title
  hName = document.createElement('h4');
  hName.innerHTML = service.name;
  divInfo.appendChild(hName);

  // Description
  pDesc = document.createElement('p');
  pDesc.classList.add('service-desc');
  pDesc.innerHTML = service.price;
  divInfo.appendChild(pDesc);

  // Item div
  divItem = document.createElement('div');
  divItem.classList.add('service-item');

  divItem.appendChild(divPic);
  divItem.appendChild(divInfo);
  return divItem;
}

function refreshServices(htmlContainer, params="") {

    var xhttp = new XMLHttpRequest();
     xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {


        // Récupérer le div container et formatter les résultats reçus
        container = document.getElementById(htmlContainer);
        services = JSON.parse(this.responseText).services

        container.innerHTML = "";

        services.forEach(service => {
          container.appendChild(buildServiceDiv(service));
        });
      }
    };


    xhttp.open('GET','/services.json'+params, true);
    xhttp.send();
}

function buildProductDiv(product) {

  // Image
  divPic = document.createElement('div');
  divPic.classList.add('service-img');
  img = document.createElement('img');
  img.src = product.picture;
  img.alt = product.name;
  divPic.appendChild(img);

  // Product info bloc
  divInfo = document.createElement('div');
  divInfo.classList.add('service-info');

  // title
  hName = document.createElement('h4');
  hName.innerHTML = product.manufacturer + ' ' + product.model_name;
  divInfo.appendChild(hName);

  // Description
  pDesc = document.createElement('p');
  pDesc.classList.add('service-desc');
  pDesc.innerHTML = product.year;
  divInfo.appendChild(pDesc);

  pDesc = document.createElement('p');
  pDesc.classList.add('service-desc');
  pDesc.innerHTML = product.price + ' €';
  divInfo.appendChild(pDesc);

  // Item div
  divItem = document.createElement('div');
  divItem.classList.add('service-item');

  divItem.appendChild(divPic);
  divItem.appendChild(divInfo);
  return divItem;
}

function refreshCatalog(htmlContainer, params="") {

    var xhttp = new XMLHttpRequest();
     xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {


        // Récupérer le div container et formatter les résultats reçus
        container = document.getElementById(htmlContainer);
        products = JSON.parse(this.responseText).products

        container.innerHTML = "";

        products.forEach(product => {
          container.appendChild(buildProductDiv(product));
        });
      }
    };


    xhttp.open('GET','/products.json'+params, true);
    xhttp.send();
}

