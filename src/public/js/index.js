const digimon = document.getElementById("nombreDigimon");
const botonBuscar = document.getElementById("btnBuscar");
const alertPlaceholder = document.getElementById("liveAlertPlaceholder");

const baseUrlName = "https://digimon-api.vercel.app/api/digimon/name/";
const baseUrlFull = "https://digimon-api.vercel.app/api/digimon/";

botonBuscar.addEventListener("click", buscarDigimon);
//botonBuscar.addEventListener("touchstart", buscarDigimon); //Para moviles --Beta-- Creo que esto en movil me mandaba el mensaje 2 veces

var dataSet = [];

function buscarDigimon() {
  fetch(`${baseUrlName}${digimon.value.toLowerCase()}`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("nombreD").innerHTML = data[0].name;
      const digimonImage = document.querySelector("#imagenDigimon");
      document.getElementById(
        "nivelDigimon"
      ).innerHTML = `Nivel: ${data[0].level}`;
      digimonImage.src = data[0].img;
    })
    .catch((error) =>
      //WIP Manejo del error 400 a 404
      //Alerta en JQuery
      toastr.error(
        "Lo sentimos este Digimon no esta en nuestra base de datos, intenta con otro!",
        "Digimon no encontrado!"
      )
    );
}

//Carga la tabla con todos los Digimons
fetch(baseUrlFull)
  .then((response) => response.json())
  .then((data) => cargarTabla(data))
  .catch((error) => console.log(error));

const cargarTabla = (data) => {
  for (var i = 0; i < data.length; i++) {
    dataSet.push([data[i].name]);
  }

  $(document).ready(function () {
    $("#data_table").DataTable({
      data: dataSet,
      columns: [{ title: "Lista de Digimons" }],
      //Opciones de la tabla
      language: {
        processing: "Tratamiento en curso...",
        search: "Buscar&nbsp;:",
        lengthMenu: "Agrupar de _MENU_ items",
        info: "Mostrando del item _START_ al _END_ de un total de _TOTAL_ items",
        infoEmpty: "No existen datos.",
        infoFiltered: "(filtrado de _MAX_ elementos en total)",
        infoPostFix: "",
        loadingRecords: "Cargando...",
        zeroRecords: "No se encontraron datos con tu busqueda",
        emptyTable: "No hay datos disponibles en la tabla.",
        paginate: {
          first: "Primero",
          previous: "Anterior",
          next: "Siguiente",
          last: "Ultimo",
        },
        aria: {
          sortAscending: ": active para ordenar la columna en orden ascendente",
          sortDescending:
            ": active para ordenar la columna en orden descendente",
        },
      },
      scrollY: 415,
      lengthMenu: [
        [5, 10, -1],
        [5, 10, "Todos"],
      ],
    });
  });
};
