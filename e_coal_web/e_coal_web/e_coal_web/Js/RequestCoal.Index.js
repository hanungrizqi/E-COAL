function submmit() {
    var obj = {
        
        MOMCOST: $("#txt_momcost").val(),
        VOLUMECOAL: $("#txt_volumecoal").val(),
        TARGETCGV: $("#txt_targetgcv").val(),
        DEADLINE: $("#txt_deadline").val()
    }
    console.log(obj);
    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        url: $("#hd_path").val() + "api/RequestCoal/submitOperator",
        data: JSON.stringify(obj),
        success: function (result) {
            if (result.Status == true) {
                alert("Success");
            } else {
                alert(result.Remark);
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
            $("#DisplayImage").append('<img src="https://localhost:44397/UploadImage/' + imgID + '"class=img-responsive thumbnail"  width="200" height="200"/>');
            
        }

    })
}
/*function UploadImage() {
    var imgcanvas = document.getElementById("#canv1");
    var fileinput = document.getElementById("#SelectImage");
    var image = new SimpleImage(fileinput);
    image.drawTo(imgcanvas);
}*/