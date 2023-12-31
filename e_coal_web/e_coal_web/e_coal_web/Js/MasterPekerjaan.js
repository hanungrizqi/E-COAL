﻿var settingModel;

$(document).ready(function () {
    settingModel = kendo.observable({

        ds_grid_dataSource: new kendo.data.DataSource({
            transport: {
                read: {
                    type: "GET",
                    contentType: "application/json",
                    cache: false,
                    url: $("#hd_path").val() + "api/Masters/getListPekerjaan",
                },
            },
            schema: {
                data: "Data",
                total: "Total",
                model: {
                    fields: {
                        id: { type: "int", editable: false, sortable: true },
                        NAMA_PEKERJAAN: { type: "string", editable: false, sortable: true },
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
            { field: 'NAMA_PEKERJAAN', title: 'Pekerjaan', width: 70 },
            {
                title: 'Action', width: 80,
                template: '<button class="btn btn-success btn-sm" onclick="Edit(\'#=id#\');"><i class="fa fa-edit" aria-hidden="true"></i> </button> <button class="btn btn-danger btn-sm" onclick="Delete(\'#=id#\');"><i class="fa fa-trash" aria-hidden="true"></i> </button>'
            },
        ]
    }).data("kendoGrid");
})

function Save() {
    var obj = {
        id: $("#txtIDPekerjaan").val(),
        NAMA_PEKERJAAN: $("#txtPekerjaan").val(),
    }

    $.ajax({
        type: "POST",
        url: $("#hd_path").val() + "api/Masters/savePekerjaan",
        data: JSON.stringify(obj),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            if (data.Status == true) {
                settingModel.ds_grid_dataSource.read();
                alert(data.Message);
                $("#txtIDPekerjaan").val("");
                $("#txtPekerjaan").val("");
                $('#modalForm').modal('hide');
            }
            else {
                alert(data.Error);
            }

        },
        error: function (xhr) {
            alert("Error...");
        }
    });
}

function Delete(id) {
    var ans = confirm("Are you sure to want delete this data?");

    var obj = {
        id: id,
        NAMA_PEKERJAAN: $("#txtPekerjaan").val()
    }
    console.log(obj);
    if (ans) {
        $.ajax({
            type: "POST",
            url: $("#hd_path").val() + "api/Masters/deletePekerjaan",
            data: JSON.stringify(obj),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                if (data.Remarks == true) {
                    settingModel.ds_grid_dataSource.read();
                    alert(data.Message);
                }
                else {
                    alert(data.Message);
                }

            },
            error: function (xhr) {
                alert("Error...");
            }
        });
    }
    /*$('#grid').data('kendoGrid').dataSource.read();*/
    /*$('#grid').data('kendoGrid').refresh();*/
}

function AddNew() {
    $("#lblTitle").text("Add New Pekerjaan Master");
    $("#txtIDPekerjaan").val("");
    $("#txtPekerjaan").val("");
    $("#modalForm").modal("show");
}

function Edit(id) {
    $('#lblTitle').text("Edit Pekerjaan");
    /*var empObj = {
        id: id
        *//*PROFILE: $("#txtProfile").val()*//*
    };*/
    /*console.log(empObj);*/
    //field2nya nanti taruh disini
    $.ajax({
        type: "POST",
        url: $("#hd_path").val() + "api/Masters/getPekerjaanByID?id=" + id,
        /*data: JSON.stringify(empObj),*/
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            console.log(result.Data[0].NAMA_PEKERJAAN);
            //console.log(result.Data[0].customer_id);
            if (result.Remarks == true) {
                /*$("#hd_id").val(id);*/
                //settingModel.ds_grid_dataSource.read();
                $("#txtIDPekerjaan").val(id);
                $("#txtPekerjaan").val(result.Data[0].NAMA_PEKERJAAN);
            }
            else {
                alert(result.Message);
                console.log(data.Message);
            }
        },
        error: function (xhr) {
            alert("Error...");
        }
    });
    $("#modalForm").modal("show");
}