$(document).ready(function () {
    ValueUpdate();
});

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