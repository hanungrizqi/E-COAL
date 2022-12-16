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
            if (result == true) {
                alert("You will now be redirected.");
                window.location = "/Pekerjaan/Get";
            }
        },
        error: function (xhr) {
            alert(xhr.responseText);
        }
    });
}