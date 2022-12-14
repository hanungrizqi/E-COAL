$(document).ready(function () {
    setGambar();
})

function setGambar() {
    $.ajax({
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        url: $("#hd_path").val() + "api/Cgv/getImgCgv",
        //data: JSON.stringify(obj),
        success: function (result) {
            if (result.Status == true) {
                var data = result.Data;
                $("#DisplayImage").show();
                $("#img_cgv").attr("src", "/UploadImage/" + data.IMAGE_TITLE);
            } else {
                alert(result.Error);
            }
        }
    })
}

var UploadImage = function () {
    var file = $("#SelectImage").get(0).files;
    var data = new FormData;
    data.append("ImageFile", file[0]);
    $.ajax({
        type: "POST",
        /*url: "api/Home/ImageUpload",*/
        /*url: $("#hd_path").val() + "api/Home/ImageUpload",*/
        url: '/Home/ImageUpload',
        data: data,
        contentType: false,
        processData: false,
        success: function (imgID) {
            console.log(imgID);
            //$("#DisplayImage").append('<img src="https://localhost:44397/UploadImage/' + imgID + '"class=img-responsive thumbnail"  width="200" height="200"/>');
            $("#DisplayImage").show();
            $("#img_cgv").attr("src", "/UploadImage/" + imgID);

        }

    })
}