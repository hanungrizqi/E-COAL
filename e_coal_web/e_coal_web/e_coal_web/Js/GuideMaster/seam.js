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
            if (result == true) {
                alert("You will now be redirected.");
                window.location = "https://localhost:44397/Seam/Get";
            }
        },
        error: function (xhr) {
            alert(xhr.responseText);
        }
    });
}