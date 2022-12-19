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
            if (result == true) {
                alert("You will now be redirected.");
                window.location = "https://localhost:44397/Profile/Get";
            }
        },
        error: function (xhr) {
            alert(xhr.responseText);
        }
    });
}