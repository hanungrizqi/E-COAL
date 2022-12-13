$(document).ready(function () {
    ValueUpdate();
});

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