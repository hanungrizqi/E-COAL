function create() {

    var obj = {
        NAMA_PEKERJAAN: $("#nama_pekerjaan").val()
    };

    $.ajax({
        type: "POST",
        url: 'https://localhost:44374/pekerjaan/Create',
        data: JSON.stringify(obj),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result == true) {
                alert("You will now be redirected.");
                window.location = "https://localhost:44397/Pekerjaan/Get";
            }
        },
        error: function (xhr) {
            alert(xhr.responseText);
        }
    });
}