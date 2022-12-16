var settingModel;

$(document).ready(function () {
    settingModel = kendo.observable({
        ds_grid_dataSource: new kendo.data.DataSource({
            transport: {
                read: {
                    type: "GET",
                    contentType: "application/json",
                    cache: false,
                    url: $("#hd_path").val() + "api/Dashboard/getListInSitu",//?ID_PEKERJAAN=" + ID_PEKERJAAN,//$("#txt_pekerjaan").val(),
                    /*data: {
                        TANGGAL_AWAL: "",
                        TANGGAL_AKHIR: ""
                    }*/
                },
            },
            schema: {
                data: "Data",
                total: "Total",
                model: {
                    fields: {
                        ID_IN_SITU: { type: "string", editable: false, sortable: true },
                        TANGGAL_AWAL: { type: "date", editable: false, sortable: true },
                        TANGGAL_AKHIR: { type: "date", editable: false, sortable: true },
                        TOTAL_TONASE: { type: "decimal", editable: false, sortable: true },
                        COAL_CONDITION: { type: "string", editable: false, sortable: true }
                    }
                }
            },
            pageSize: 50,
        })
    })

    $("#grid").kendoGrid({
        dataSource: settingModel.ds_grid_dataSource,
        resizable: "true",
        editable: "inline",
        scrollable: "true",
        sortable: "true",
        filterable: "true",
        pageable: "true",
        height: "500px",
        columns: [
            //{ title: 'Action', width: 50, template: $("#tmp_action").html() },
            { field: 'ID_IN_SITU', title: 'In Situ', width: 100 },
            { field: 'TOTAL_TONASE', title: 'Tonase', width: 50 },
        ]
    }).data("kendoGrid");

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
        url: '/Home/ImageUpload',
        data: data,
        contentType: false,
        processData: false,
        success: function (imgID) {
            console.log(imgID);
            $("#DisplayImage").show();
            $("#img_cgv").attr("src", "/UploadImage/" + imgID);

        }
    })
}
