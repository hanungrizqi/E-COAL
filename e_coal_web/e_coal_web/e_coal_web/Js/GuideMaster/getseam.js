$(document).ready(function () {
    get();
    ValueUpdate();
    $('#example').DataTable();
});

function create() {

    var obj = {
        NAMA_SEAM: $("#nama_seam").val()
    };

    $.ajax({
        type: "POST",
        url: 'https://localhost:44374/seam/Create',
        data: JSON.stringify(obj),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            window.location.href = "/seam/Get";
        },
        error: function (xhr) {
            alert(xhr.responseText);
        }
    });
}

function get() {

    $.ajax({
        type: "GET",
        url: 'https://localhost:44374/seam/Get',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            var getData = "";
            $.each(result, function (row, item) {
                getData += '<tr>' +
                    '<td>' + item.NAMA_SEAM + '</td>' +
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
            url: 'https://localhost:44374/seam/Delete?id=' + id,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                window.location.href = "/seam/Get";
            },
            error: function (xhr) {
                alert(xhr.responseText);

            }
        });
    }
}

function GotoUpdate(id) {
    window.location.href = "/seam/Update?id=" + id;
}

function Update() {
    var empObj = {
        id: $("#id").val(),
        NAMA_SEAM: $("#nama_seam").val()
    };
    $.ajax({
        url: 'https://localhost:44374/seam/Update',
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $("#id").val("");
            $("#nama_seam").val("");
            window.location.href = "/seam/Get";
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
        url: 'https://localhost:44374/seam/Value?id=' + id,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            $("#nama_seam").val(result.NAMA_SEAM);
        },
    })
}