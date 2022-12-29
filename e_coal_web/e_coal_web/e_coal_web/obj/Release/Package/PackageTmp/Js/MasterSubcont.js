var settingModel;

$(document).ready(function () {
    settingModel = kendo.observable({

        ds_grid_dataSource: new kendo.data.DataSource({
            transport: {
                read: {
                    type: "GET",
                    contentType: "application/json",
                    cache: false,
                    url: $("#hd_path").val() + "api/Masters/getListSubcont",
                },
            },
            schema: {
                data: "Data",
                total: "Total",
                model: {
                    fields: {
                        ID: { type: "int", editable: false, sortable: true },
                        SUBCONT_CODE: { type: "string", editable: false, sortable: true },
                        SUBCONT_NAME: { type: "string", editable: false, sortable: true },
                        DISTRICT: { type: "string", editable: false, sortable: true },
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
            { field: 'SUBCONT_CODE', title: 'Subcont Code', width: 70 },
            { field: 'SUBCONT_NAME', title: 'Subcont Name', width: 70 },
            { field: 'DISTRICT', title: 'District', width: 70 },
            {
                title: 'Action', width: 80,
                template: '<button class="btn btn-success btn-sm" onclick="Edit(\'#=ID#\');"><i class="fa fa-edit" aria-hidden="true"></i> </button> <button class="btn btn-danger btn-sm" onclick="Delete(\'#=ID#\');"><i class="fa fa-trash" aria-hidden="true"></i> </button>'
            },
        ]
    }).data("kendoGrid");
})

$("#txtDistrict").kendoDropDownList({
    dataTextField: "DSTRCT_CODE",
    dataValueField: "DSTRCT_CODE",
    dataSource: {
        type: "json",
        transport: {
            read: {
                url: $("#hd_path").val() + "api/Masters/getListDistrict",
                contentType: "application/json",
                type: "GET",
                cache: false
            }
        },
        schema: {
            data: "Data",
            total: "Total"
        }
    },
    optionLabel: "Pilih",
    select: function (e) {
        var dataItem = this.dataItem(e.item.index());
        /*settingModel.set("id_department", dataItem.id);*/
        /*getListDepartment();*/
    }
});

function Save() {
    var obj = {
        ID: $("#txtIDSubcont").val(),
        SUBCONT_CODE: $("#txtSubcontCode").val(),
        SUBCONT_NAME: $("#txtSubcontName").val(),
        DISTRICT: $("#txtDistrict").val(),
    }

    $.ajax({
        type: "POST",
        url: $("#hd_path").val() + "api/Masters/saveSubcont",
        data: JSON.stringify(obj),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            if (data.Status == true) {
                settingModel.ds_grid_dataSource.read();
                alert(data.Message);
                $("#txtIDSubcont").val("");
                $("#txtSubcontCode").val("");
                $("#txtSubcontName").val("");
                $("#txtDistrict").val("");
                AddNew();
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

function Delete(ID) {
    var ans = confirm("Are you sure to want delete this data?");

    var obj = {
        ID: ID,
        SUBCONT_CODE: $("#txtSubcontCode").val(),
        SUBCONT_NAME: $("#txtSubcontName").val(),
        DISTRICT: $("#txtDistrict").val()
    }
    console.log(obj);
    if (ans) {
        $.ajax({
            type: "POST",
            url: $("#hd_path").val() + "api/Masters/deleteSubcont",
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
    $("#lblTitle").text("Add New Subcont Master");

    $("#txtIDSubcont").val("");
    $("#txtSubcontCode").val("");
    $("#txtSubcontName").val("");
    $("#txtDistrict").data("kendoDropDownList").value(-1);

    $("#modalForm").modal("show");
}

function Edit(ID) {
    $('#lblTitle').text("Edit Subcont");
    /*var empObj = {
        id: id
        *//*PROFILE: $("#txtProfile").val()*//*
};*/
    /*console.log(empObj);*/
    //field2nya nanti taruh disini
    $.ajax({
        type: "POST",
        url: $("#hd_path").val() + "api/Masters/getSubcontByID?ID=" + ID,
        /*data: JSON.stringify(empObj),*/
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            console.log(result.Data[0].SUBCONT_NAME);
            //console.log(result.Data[0].customer_id);
            if (result.Remarks == true) {
                /*$("#hd_id").val(id);*/
                //settingModel.ds_grid_dataSource.read();
                $("#txtIDSubcont").val(ID);
                $("#txtSubcontCode").val(result.Data[0].SUBCONT_CODE);
                $("#txtSubcontName").val(result.Data[0].SUBCONT_NAME);
                $("#txtDistrict").val(result.Data[0].DISTRICT);
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