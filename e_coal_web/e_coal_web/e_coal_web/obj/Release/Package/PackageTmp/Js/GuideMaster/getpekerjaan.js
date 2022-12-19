$(document).ready(function () {
    get();
    ValueUpdate();
    $('#example').DataTable();
});

function create() {

    var obj = {
        NAMA_PEKERJAAN: $("#nama_pekerjaan").val()
    };

    $.ajax({
        type: "POST",
        url: $("#hd_path").val() + '/pekerjaan/Create',
        data: JSON.stringify(obj),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            window.location.href = "/pekerjaan/Get";
        },
        error: function (xhr) {
            alert(xhr.responseText);
        }
    });
}

function get() {

    $.ajax({
        type: "GET",
        url: $("#hd_path").val() + '/pekerjaan/Get',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            var getData = "";
            $.each(result, function (row, item) {
                getData += '<tr>' +
                    '<td>' + item.NAMA_PEKERJAAN + '</td>' +
                    '<td> <button type="button" class="btn btn-danger" onclick="Delete(\'' + item.id + '\');">Delete</button> ' +
                    '<button type="button" class="btn btn-warning" onclick="GotoUpdate(\'' + item.id + '\');">Edit</button></td>' +
                    '</tr>';
            });
            $("#getBody").append(getData);
        },
        error: function (xhr) {
            alert(xhr.responseText);
        }
    });
}

function Delete(id) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            type: "POST",
            url: $("#hd_path").val() + '/pekerjaan/Delete?id=' + id,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                window.location.href = "/pekerjaan/Get";
            },
            error: function (xhr) {
                alert(xhr.responseText);

            }
        });
    }
}

function GotoUpdate(id) {
    window.location.href = "/pekerjaan/Update?id=" + id;
}

function Update() {
    var empObj = {
        id: $("#id").val(),
        NAMA_PEKERJAAN: $("#nama_pekerjaan").val()
    };
    $.ajax({
        url: $("#hd_path").val() + '/pekerjaan/Update',
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $("#id").val("");
            $("#nama_pekerjaan").val("");
            window.location.href = "/pekerjaan/Get";
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function ValueUpdate() {
    var id = $("#id").val();
    $.ajax({
        type: "POST",
        url: $("#hd_path").val() + '/pekerjaan/Value?id=' + id,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            $("#nama_pekerjaan").val(result.NAMA_PEKERJAAN);
        },
    })
}