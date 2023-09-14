$(document).ready(function () {
    console.log("Ready")
});


const settings = {
    async: true,
    crossDomain: true,
    url: 'https://api.api-onepiece.com/fruits',
    method: 'GET',
    contentType: 'application/json'
};

$.ajax(settings).done(function (response) {
    const fruitsTable = $('#fruitsTable tbody');

    // Itera a través de los datos de la API y agrega filas a la tabla
    response.forEach(function (fruit) {
        const row = `
            <tr>
                <td>${fruit.id}</td>
                <td>${fruit.roman_name}</td>
                <td>${fruit.description}</td>
                <td><img src="https://images.api-onepiece.com/fruits/${fruit.filename}" style="width: 75px;" /></td>
                <td><a class="btn btn-success " onClick="ver(${fruit.id})">ver</a></td>
            </tr>
        `;
        fruitsTable.append(row);
    });

    new DataTable('#fruitsTable');

});

function ver(id) {

    localStorage.setItem("Item_id", id);

    window.location.href = 'ver.html';

}

function ver_fruta() {
    let item_id = localStorage.getItem("Item_id");

    const url = 'https://api.api-onepiece.com/fruits/' + item_id;

    const foto = $("#Foto");
    const fruta = $("#fruta");
    const description = $("#description");

    const settings = {
        async: true,
        crossDomain: true,
        url: url,
        method: 'GET',
        contentType: 'application/json',
    }

    $.ajax(settings).done((data)=>{
        const img = "https://images.api-onepiece.com/fruits/" + data.filename;
        foto.attr('src', img);
        fruta.append(data.roman_name);
        description.append(data.description);
    });
}

