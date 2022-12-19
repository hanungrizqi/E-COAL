﻿var settingModel;

$(document).ready(function () {
    settingModel = kendo.observable({
        /*id_pekerjaan: "",
        id_seam: "",*/

        ds_grid_dataSource: new kendo.data.DataSource({
            transport: {
                read: {
                    type: "GET",
                    contentType: "application/json",
                    cache: false,
                    url: $("#hd_path").val() + "api/RequestCoal/getListRequestCoal",//?ID_PEKERJAAN=" + ID_PEKERJAAN,//$("#txt_pekerjaan").val(),

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
                        DEADLINE: { type: "DateTime", editable: false, sortable: true },
                        INPUT_DATE: { type: "DateTime", editable: false, sortable: true },
                        INPUT_BY: { type: "string", editable: false, sortable: true },
                        FLAG: { type: "int", editable: false, sortable: true },
                        STATUS: { type: "string", editable: false, sortable: true }
                    }
                }
            },
            pageSize: 50,

        })
    })
    kendo.bind($("#form_main"), settingModel);

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
            { field: 'MOMCOST', title: 'MOM Cust', width: 70 },
            { field: 'VOLUMECOAL', title: 'Volume Coal', width: 30 },
            { field: 'TARGETGCV', title: 'Target GCV', width: 30 },
            { field: 'DEADLINE', title: 'Deadline', type: 'DateTime', format: '{0:dd/MM/yyyy}', width: 40 },
            /*{ title: 'Pilih', template: $('#tmp_check').html(), width: 30 },*/
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

function submmit() {
    var obj = {
        
        MOMCOST: $("#txt_momcost").val(),
        VOLUMECOAL: $("#txt_volumecoal").val(),
        TARGETGCV: $("#txt_targetgcv").val(),
        DEADLINE: $("#txt_deadline").val(),
        STATUS: 0
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
                alert("Request Terkirim!");
                $("#txt_momcost").val("");
                $("#txt_volumecoal").val("");
                $("#txt_targetgcv").val("");
                $("#txt_deadline").val("");
                $("#txt_status").val("");
            } else {
                alert(result.Remark);
            }
        }
    })
}

function Reset() {
    $("#txt_momcost").val("");
    $("#txt_volumecoal").val("");
    $("#txt_targetgcv").val("");
    $("#txt_deadline").val("");
    $("#txt_status").val("");
}