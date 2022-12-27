var settingModel;

$(document).ready(function () {
    settingModel = kendo.observable({

        ds_grid_dataSource: new kendo.data.DataSource({
            transport: {
                read: {
                    type: "GET",
                    contentType: "application/json",
                    cache: false,
                    url: $("#hd_path").val() + "api/Masters/getListSeam",
                },
            },
            schema: {
                data: "Data",
                total: "Total",
                model: {
                    fields: {
                        id: { type: "int", editable: false, sortable: true },
                        NAMA_SEAM: { type: "string", editable: false, sortable: true },
                        GRADE: { type: "string", editable: false, sortable: true },
                        INITIAL: { type: "string", editable: false, sortable: true },
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
            { field: 'NAMA_SEAM', title: 'Seam', width: 70 },
            { field: 'GRADE', title: 'Grade', width: 70 },
            { field: 'INITIAL', title: 'Initial', width: 70 },
            {
                title: 'Action', width: 80,
                template: '<button class="btn btn-success btn-sm" onclick="Edit(\'#=id#\');"><i class="fa fa-edit" aria-hidden="true"></i> </button> <button class="btn btn-danger btn-sm" onclick="Delete(\'#=id#\');"><i class="fa fa-trash" aria-hidden="true"></i> </button>'
            },
        ]
    }).data("kendoGrid");
})

function Save() {
    var obj = {
        NAMA_SEAM: $("#txtSeam").val(),
        GRADE: $("#txtGrade").val(),
        INITIAL: $("#txtInitial").val(),
    }

    $.ajax({
        type: "POST",
        url: $("#hd_path").val() + "api/Masters/saveSeam",
        data: JSON.stringify(obj),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            if (data.Status == true) {
                settingModel.ds_grid_dataSource.read();
                alert(data.Message);
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
        NAMA_SEAM: $("#txtSeam").val(),
        GRADE: $("#txtGrade").val(),
        INITIAL: $("#txtInitial").val()
    }
    console.log(obj);
    if (ans) {
        $.ajax({
            type: "POST",
            url: $("#hd_path").val() + "api/Masters/deleteSeam",
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
    $("#lblTitle").text("Add New Seam Master");

    $("#txtSeam").val("");
    $("#txtGrade").val("");
    $("#txtInitial").val("");
    $("#modalForm").modal("show");
}

/*function Edit(id) {
    $('#lblTitle').text("Edit Profile");

    //field2nya nanti taruh disini
    $.ajax({
        type: "POST",
        url: $("#hd_path").val() + "api/Masters/getProfileByID?id=" + id,
        //data: JSON.stringify(obj),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            //console.log(result.Data[0].customer_id);
            if (result.Remarks == true) {
                *//*var isActive = 0;
if (result.Data[0].STATUS == true) {
    isActive = 1
}*//*
$("#txtProfile").val(result.Data.PROFILE);
*//*$("#hd_id").val(id1);
//$("#txtWarehouse").data("kendoComboBox").value(result.Data[0].WAREHOUSE);
$("#txtSNcode").val(result.Data[0].SN_CODE);
$("#txtFungsi").data("kendoDropDownList").value(result.Data[0].FUNGSI);
$("#txtMnemonic").val(result.Data[0].MNEMONIC);
$("#txtMeterFakor").val(result.Data[0].METER_FAKOR);
//$("#txtKapMaks").val(result.Data[0].KAP_MAKS);
$("#txtKalibrationDate").val(result.Data[0].KALIBARTION_DATE);
$("#txtKalibrationExp").val(result.Data[0].KALIBRATION_EXPIRED);
$("#txtWHLocation").val(result.Data[0].WHOUSE_LOCATION);
$("#txtFlowMeterNo").val(result.Data[0].FLOW_METER_NO);
$("#txtFlowMeterLocation").val(result.Data[0].FLOW_METER_LOCATION);
$("#txtRemark").val(result.Data[0].REMARK);
$("#txtStatus").data("kendoDropDownList").value(isActive);

var wh = $("#txtWarehouse").data("kendoComboBox");
wh.value(result.Data[0].WAREHOUSE);
wh.readonly();*//*
}
else {
alert(result.Message);
//console.log(data.Message);
}

},
error: function (xhr) {
alert("Error...");
}
});


$("#modalForm").modal("show");
}*/