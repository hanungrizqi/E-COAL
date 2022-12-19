var settingModel;

$(document).ready(function () {
    settingModel = kendo.observable({
        ds_gridInSitu: new kendo.data.DataSource({
            transport: {
                read: {
                    type: "GET",
                    contentType: "application/json",
                    cache: false,
                    url: $("#hd_path").val() + "api/Dashboard/getListInSitu",//?ID_PEKERJAAN=" + ID_PEKERJAAN,//$("#txt_pekerjaan").val(),
                    data: {
                        TANGGAL_AWAL: "",
                        TANGGAL_AKHIR: ""
                    }
                },
            },
            schema: {
                data: "Data",
                total: "Total",
                model: {
                    fields: {
                        IN_SITU: { type: "string", editable: false, sortable: true },
                        TANGGAL: { type: "date", editable: false, sortable: true },
                        TOTAL_TONASE: { type: "decimal", editable: false, sortable: true },
                        COAL_CONDITION: { type: "string", editable: false, sortable: true }
                    }
                }
            },
            pageSize: 50,
        }),

        ds_gridAnomaliInSitu: new kendo.data.DataSource({
            transport: {
                read: {
                    type: "GET",
                    contentType: "application/json",
                    cache: false,
                    url: $("#hd_path").val() + "api/Dashboard/getListAnomaliInSitu",//?ID_PEKERJAAN=" + ID_PEKERJAAN,//$("#txt_pekerjaan").val(),
                    data: {
                        TANGGAL_AWAL: "",
                        TANGGAL_AKHIR: ""
                    }
                },
            },
            schema: {
                data: "Data",
                total: "Total",
                model: {
                    fields: {
                        ID_IN_SITU: { type: "string", editable: false, sortable: true },
                        COAL_CONDITION: { type: "string", editable: false, sortable: true },
                        TOTAL_TONASE: { type: "string", editable: false, sortable: true },
                        TANGGAL: { type: "string", editable: false, sortable: true },
                        STATUS: { type: "string", editable: false, sortable: true },
                        IN_SITU: { type: "string", editable: false, sortable: true }
                    }
                }
            },
            pageSize: 50,
        }),

        ds_gridRequestCoalApproval: new kendo.data.DataSource({
            transport: {
                read: {
                    type: "GET",
                    contentType: "application/json",
                    cache: false,
                    url: $("#hd_path").val() + "api/Dashboard/getRequestCoalApproval",//?ID_PEKERJAAN=" + ID_PEKERJAAN,//$("#txt_pekerjaan").val(),
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
                        ID: { type: "int", editable: false, sortable: true },
                        MOMCOST: { type: "string", editable: false, sortable: true },
                        VOLUMECOAL: { type: "decimal", editable: false, sortable: true },
                        TARGETGCV: { type: "decimal", editable: false, sortable: true },
                        DEADLINE: { type: "date", editable: false, sortable: true },
                        STATUS: { type: "int", editable: false, sortable: true },
                        REQUEST_COAL: { type: "string", editable: false, sortable: true }
                    }
                }
            },
            pageSize: 50,
        })
    })

    $("#gridInSitu").kendoGrid({
        dataSource: settingModel.ds_gridInSitu,
        resizable: "true",
        editable: "inline",
        scrollable: "true",
        sortable: "true",
        filterable: "true",
        pageable: "true",
        height: "400px",
        columns: [
            //{ title: 'Action', width: 50, template: $("#tmp_action").html() },
            { title: 'In SITU (GCV | Ton)', template: $('#tmp_inSitu').html(), width: 100 }
        ]
    }).data("kendoGrid");

    $("#gridAnomaliInSitu").kendoGrid({
        dataSource: settingModel.ds_gridAnomaliInSitu,
        resizable: "true",
        editable: "inline",
        scrollable: "true",
        sortable: "true",
        filterable: "true",
        pageable: "true",
        height: "400px",
        columns: [            
            { title: 'In SITU (GCV | Ton)', template: $('#tmp_AnomaliInSitu').html(), width: 100 },
            { title: 'Action', width: 50, template: $("#tmp_AnomaliAction").html() },
        ]
    }).data("kendoGrid");

    $("#gridRequestCoalApproval").kendoGrid({
        dataSource: settingModel.ds_gridRequestCoalApproval,
        resizable: "true",
        editable: "inline",
        scrollable: "true",
        sortable: "true",
        filterable: "true",
        pageable: "true",
        height: "400px",
        columns: [
            /*{ title: 'Request Coal List', template: $('#tmp_RequestCoalApproval').html(), width: 100 },*/
            { field: 'MOMCOST', title: 'Mom Cost', width: 50 },
            { field: 'VOLUMECOAL', title: 'Volume Coal', width: 50 },
            { field: 'TARGETGCV', title: 'Target GCV', width: 50 },
            { field: 'DEADLINE', title: 'Deadline', width: 50 },
            { title: 'Action', width: 50, template: $("#tmp_RequestCoalAction").html() },
        ]
    }).data("kendoGrid");

    setGambar();
    setDateNow();
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


function setDateNow() {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);

    $.ajax({
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        url: $("#hd_path").val() + "api/Dashboard/getDate",
        success: function (result) {
            if (result.Status == true) {
                var data = result.Data;
                console.log(today);
                console.log(data.max_date);
                $("#txt_tanggalAwal").val(data.min_date);
                $("#txt_tanggalAkhir").val(today);
                fillter();
            } else {
                alert(result.Error);
            }
        }
    })
}

function fillter() {
    settingModel.ds_gridInSitu.transport.options.read.data.TANGGAL_AWAL = $("#txt_tanggalAwal").val();
    settingModel.ds_gridInSitu.transport.options.read.data.TANGGAL_AKHIR = $("#txt_tanggalAkhir").val();
    settingModel.ds_gridInSitu.read();

    settingModel.ds_gridAnomaliInSitu.transport.options.read.data.TANGGAL_AWAL = $("#txt_tanggalAwal").val();
    settingModel.ds_gridAnomaliInSitu.transport.options.read.data.TANGGAL_AKHIR = $("#txt_tanggalAkhir").val();
    settingModel.ds_gridAnomaliInSitu.read();

/*    settingModel.ds_gridRequestCoalApproval.transport.options.read.data.TANGGAL_AWAL = $("#txt_tanggalAwal").val();
    settingModel.ds_gridRequestCoalApproval.transport.options.read.data.TANGGAL_AKHIR = $("#txt_tanggalAkhir").val();
    settingModel.ds_gridRequestCoalApproval.read();*/
    

}

function anomaliApprove(inSitu) {
    var obj = {
        IN_SITU: inSitu
    }
    //console.log(obj);
    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        url: $("#hd_path").val() + "api/Dashboard/approveAnomali",
        data: JSON.stringify(obj),
        success: function (result) {
            if (result.Status == true) {
                fillter();
            } else {
                alert(result.Error);
            }
        }
    })
}

function anomaliReject(inSitu) {
    var obj = {
        IN_SITU: inSitu
    }

    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        url: $("#hd_path").val() + "api/Dashboard/rejectAnomali",
        data: JSON.stringify(obj),
        success: function (result) {
            if (result.Status == true) {
                fillter();
            } else {
                alert(result.Error);
            }
        }
    })
}

function requestApprove(requestCoal) {
    var obj = {
        ID_REQUESTCOAL: requestCoal
    }
    console.log(obj)
    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        url: $("#hd_path").val() + "api/Dashboard/approveRequestCoal",
        data: JSON.stringify(obj),
        success: function (result) {
            if (result.Status == true) {
                settingModel.ds_gridRequestCoalApproval.read();
            } else {
                alert(result.Error);
            }
        }
    })
}