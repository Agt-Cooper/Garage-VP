////////////////////////////////////////////////////////////////////////////////
/// Page initialization scripts
function preparePage() {
  document.querySelectorAll('button.delete-hour').forEach(function (currentButton) {
    currentButton.addEventListener("click", onHourDelete_Click); 
  });
}

function onHourDelete_Click(type, listener) {

  btnSelected = type.target
  hour_id = btnSelected.dataset.id;


  var xhttp = new XMLHttpRequest();

   xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        if(JSON.parse(this.responseText).result) {
          location.reload();
        }



        // alert("Page à reloader")
      }
    }

  xhttp.open('GET', '/hours/delete/'+hour_id+'/', true);
  xhttp.send();
}



document.onload = preparePage()

