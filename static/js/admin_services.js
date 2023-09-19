function preparePage() {
  fetchServices()
}

function fetchServices() {
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
            btnProduct.innerHTML += service.name;
            divServices.appendChild(btnProduct);
        });


        //   btnProduct.addEventListener("click", onAdminProduct_Click); 
        
      }
    };

    xhttp.open('GET', '/garage/services.json', true);
    xhttp.send(null);
}


document.onload = preparePage()

