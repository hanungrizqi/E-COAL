var settingModel;

$(document).ready(function () {
    settingModel = kendo.observable({

        ds_grid_dataSource: new kendo.data.DataSource({
            transport: {
                read: {
                    type: "GET",
                    contentType: "application/json",
                    cache: false,
                    url: $("#hd_path").val() + "api/Masters/getListGrade",
                },
            },
            schema: {
                data: "Data",
                total: "Total",
                model: {
                    fields: {
                        GRADE: { type: "string", editable: false, sortable: true },
                        GAR_MIN: { type: "int", editable: false, sortable: true },
                        GAR_MAX: { type: "int", editable: false, sortable: true },
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
            { field: 'GRADE', title: 'Grade', width: 70 },
            { field: 'GAR_MIN', title: 'Gar Min', width: 70 },
            { field: 'GAR_MAX', title: 'Gar Max', width: 70 },
            /*{ field: 'DISTRICT', title: 'District', width: 70 },*/
            {
                title: 'Action', width: 80,
                template: '<button class="btn btn-success btn-sm" onclick="Edit(\'#=GRADE#\');"><i class="fa fa-edit" aria-hidden="true"></i> </button> <button class="btn btn-danger btn-sm" onclick="Delete(\'#=GRADE#\');"><i class="fa fa-trash" aria-hidden="true"></i> </button>'
            },
        ]
    }).data("kendoGrid");
})

/*$("#txtDistrict").kendoDropDownList({
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
        *//*settingModel.set("id_department", dataItem.id);*//*
        *//*getListDepartment();*//*
    }
});*/

function Save() {
    var obj = {
        GRADE: $("#txtGrade").val(),
        GAR_MIN: $("#txtGarMin").val(),
        GAR_MAX: $("#txtGarMax").val(),
        /*DISTRICT: $("#txtDistrict").val(),*/
    }

    $.ajax({
        type: "POST",
        url: $("#hd_path").val() + "api/Masters/saveGrade",
        data: JSON.stringify(obj),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            if (data.Status == true) {
                settingModel.ds_grid_dataSource.read();
                alert(data.Message);
                $("#txtGrade").val("");
                $("#txtGarMin").val("");
                $("#txtGarMax").val("");
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

function Delete(GRADE) {
    var ans = confirm("Are you sure to want delete this data?");

    var obj = {
        GRADE: GRADE,
        GAR_MIN: $("#txtGarMin").val(),
        GAR_MAX: $("#txtGarMax").val(),
        DISTRICT: $("#txtDistrict").val()
    }
    console.log(obj);
    if (ans) {
        $.ajax({
            type: "POST",
            url: $("#hd_path").val() + "api/Masters/deleteGrade",
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
    $("#lblTitle").text("Add New Grade Master");

    $("#txtGrade").attr('readonly', false);
    $("#txtGrade").val("");
    $("#txtGarMin").val("");
    $("#txtGarMax").val("");
    $("#txtDistrict").data("kendoDropDownList").value(-1);

    $("#modalForm").modal("show");
}

function Edit(GRADE) {
    $('#lblTitle').text("Edit Grade");
    /*var empObj = {
        id: id
        *//*PROFILE: $("#txtProfile").val()*//*
};*/
    /*console.log(empObj);*/
    //field2nya nanti taruh disini
    $.ajax({
        type: "POST",
        url: $("#hd_path").val() + "api/Masters/getGradeByID?GRADE=" + GRADE,
        /*data: JSON.stringify(empObj),*/
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            console.log(result.Data[0].GRADE);
            //console.log(result.Data[0].customer_id);
            if (result.Remarks == true) {
                /*$("#hd_id").val(id);*/
                //settingModel.ds_grid_dataSource.read();
                $("#txtGrade").val(GRADE);
                $("#txtGrade").attr('readonly', true);
                $("#txtGarMin").val(result.Data[0].GAR_MIN);
                $("#txtGarMax").val(result.Data[0].GAR_MAX);
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