var settingModel;

$(document).ready(function () {
    settingModel = kendo.observable({

        ds_grid_dataSource: new kendo.data.DataSource({
            transport: {
                read: {
                    type: "GET",
                    contentType: "application/json",
                    cache: false,
                    url: $("#hd_path").val() + "api/Masters/getListUser",
                },
            },
            schema: {
                data: "Data",
                total: "Total",
                model: {
                    fields: {
                        ID: { type: "int", editable: false, sortable: true },
                        NRP: { type: "string", editable: false, sortable: true },
                        NAME: { type: "string", editable: false, sortable: true },
                        ID_PROFILE: { type: "int", editable: false, sortable: true },
                        PROFILE: { type: "string", editable: false, sortable: true },
                        DISTRICT: { type: "string", editable: false, sortable: true },
                        POSITION_ID: { type: "string", editable: false, sortable: true },
                        POST_TITLE: { type: "string", editable: false, sortable: true },
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
            { field: 'NRP', title: 'NRP', width: 70 },
            /*{ field: 'ID_PROFILE', title: 'ID Profile', width: 70 },*/
            { field: 'NAME', title: 'Nama', width: 70 },
            { field: 'PROFILE', title: 'Profile', width: 70 },
            { field: 'DISTRICT', title: 'District', width: 70 },
            {
                title: 'Action', width: 80,
                template: '<button class="btn btn-success btn-sm" onclick="Edit(\'#=ID#\');"><i class="fa fa-edit" aria-hidden="true"></i> </button> <button class="btn btn-danger btn-sm" onclick="Delete(\'#=ID#\');"><i class="fa fa-trash" aria-hidden="true"></i> </button>'
            },
        ]
    }).data("kendoGrid");

    /*$("#txtDistrict").val($("#hd_district").val());*/
})

$("#txtIDProfile").kendoDropDownList({
    dataTextField: "PROFILE",
    dataValueField: "id",
    dataSource: {
        type: "json",
        transport: {
            read: {
                url: $("#hd_path").val() + "api/Masters/getListProfile",
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

$("#txtNRP").kendoComboBox({
    dataTextField: "EMPLOYEE_DESC",
    dataValueField: "EMPLOYEE_ID",
    dataSource: {
        type: "json",
        transport: {
            read: {
                url: $("#hd_path").val() + "api/Masters/getListEmployee?district=" + $("#hd_district").val(),
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
    filter: "contains",
    select: function (e) {
        var dataItem = this.dataItem(e.item.index());
        /*settingModel.set("id_department", dataItem.id);*/
        /*getListDepartment();*/
    }
});

//$("#txtDistrict").kendoDropDownList({
//    dataTextField: "DSTRCT_CODE",
//    dataValueField: "DSTRCT_CODE",
//    dataSource: {
//        type: "json",
//        transport: {
//            read: {
//                url: $("#hd_path").val() + "api/Masters/getListDistrict",
//                contentType: "application/json",
//                type: "GET",
//                cache: false
//            }
//        },
//        schema: {
//            data: "Data",
//            total: "Total"
//        }
//    },
//    filter: "contains",
//    select: function (e) {
//        var dataItem = this.dataItem(e.item.index());
//        /*settingModel.set("id_department", dataItem.id);*/
//        /*getListDepartment();*/
//    }
//});

function Save() {
    var obj = {
        ID: $("#txtIDUser").val(),
        NRP: $("#txtNRP").val(),
        ID_PROFILE: $("#txtIDProfile").val(),
        DISTRICT: $("#txtDistrict").val(),
    }

    $.ajax({
        type: "POST",
        url: $("#hd_path").val() + "api/Masters/saveUser",
        data: JSON.stringify(obj),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            if (data.Status == true) {
                settingModel.ds_grid_dataSource.read();
                alert(data.Message);
                $("#txtIDUser").val("");
                $("#txtNRP").val("");
                $("#txtIDProfile").val("");
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
        NRP: $("#txtNRP").val(),
        ID_PROFILE: $("#txtIDProfile").val(),
        DISTRICT: $("#txtDistrict").val()
    }
    console.log(obj);
    if (ans) {
        $.ajax({
            type: "POST",
            url: $("#hd_path").val() + "api/Masters/deleteUser",
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



function Edit(ID) {
    $('#lblTitle').text("Edit User");
    /*var empObj = {
        id: id
        *//*PROFILE: $("#txtProfile").val()*//*
};*/
    /*console.log(empObj);*/
    //field2nya nanti taruh disini
    $.ajax({
        type: "POST",
        url: $("#hd_path").val() + "api/Masters/getUserByID?ID=" + ID,
        /*data: JSON.stringify(empObj),*/
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {            
            //console.log(result.Data[0].customer_id);
            if (result.Remarks == true) {
                console.log(result.Data);
                $("#txtIDUser").val(ID);
                $("#txtNRP").data("kendoComboBox").value(result.Data.NRP);
                $("#txtIDProfile").data("kendoDropDownList").value(result.Data.ID_PROFILE);
                $("#txtDistrict").val(result.Data.DISTRICT);

                console.log($("#txtNRP").val());
                console.log($("#txtIDProfile").val());
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

function AddNew() {
    $("#lblTitle").text("Add New User Master");

    $("#txtIDUser").val("");
    $("#txtNRP").data("kendoComboBox").value("");
    $("#txtIDProfile").data("kendoDropDownList").value(-1);
    $("#txtDistrict").val($("#hd_district").val());

    //console.log($("#txtIDUser").val());
    //console.log($("#txtNRP").val());
    //console.log($("#txtIDProfile").val());
    //console.log($("#txtDistrict").val());

    $("#modalForm").modal("show");
}