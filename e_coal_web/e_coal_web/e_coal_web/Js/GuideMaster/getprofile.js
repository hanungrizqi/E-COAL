$(document).ready(function () {
    get();
    ValueUpdate();
    $('#example').DataTable();
});

function create() {

    var obj = {
        PROFILE: $("#profile").val()
    };

    $.ajax({
        type: "POST",
        url: $("#hd_path").val() + '/profile/Create',
        data: JSON.stringify(obj),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            window.location.href = "/profile/Get";
        },
        error: function (xhr) {
            alert(xhr.responseText);
        }
    });
}

function get() {

    $.ajax({
        type: "GET",
        url: $("#hd_path").val() + '/profile/Get',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            var getData = "";
            $.each(result, function (row, item) {
                getData += '<tr>' +
                    '<td>' + item.PROFILE + '</td>' +
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
            url: $("#hd_path").val() + '/profile/Delete?id=' + id,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                window.location.href = "/profile/Get";
            },
            error: function (xhr) {
                alert(xhr.responseText);

            }
        });
    }
}

function GotoUpdate(id) {
    window.location.href = "/profile/Update?id=" + id;
}

function Update() {
    var empObj = {
        id: $("#id").val(),
        PROFILE: $("#profile").val()
    };
    $.ajax({
        url: $("#hd_path").val() + '/profile/Update',
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $("#id").val("");
            $("#profile").val("");
            window.location.href = "/profile/Get";
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
        url: $("#hd_path").val() + '/profile/Value?id=' + id,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            $("#profile").val(result.PROFILE);
        },
    })
}