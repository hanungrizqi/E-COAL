$(document).ready(function () {
    ValueUpdate();
});

function Update() {
    var empObj = {
        id: $("#id").val(),
        PROFILE: $("#profile").val()
    };
    $.ajax({
        url: 'https://localhost:44374/profile/Update',
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
        url: 'https://localhost:44374/profile/Value?id=' + id,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            $("#profile").val(result.PROFILE);
        },
    })
}