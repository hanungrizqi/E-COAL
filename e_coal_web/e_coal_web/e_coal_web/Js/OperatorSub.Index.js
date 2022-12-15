var settingModel;

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
                    url: $("#hd_path").val() + "api/OperatorSub/getListOperatorSub",//?ID_PEKERJAAN=" + ID_PEKERJAAN,//$("#txt_pekerjaan").val(),
                    /*data: {
                        ID_PEKERJAAN: "",
                    }*/
                },
            },
            schema: {
                data: "Data",
                total: "Total",
                model: {
                    id: "NRP",
                    fields: {
                        NRP: { type: "string", editable: false, sortable: true },
                        NAMA: { type: "string", editable: false, sortable: true },
                        SUBCONT_CODE: { type: "string", editable: false, sortable: true },
                        ID_JABATAN: { type: "int", editable: false, sortable: true },
                        /*JABATAN: { type: "string", editable: false, sortable: true },*/
                        DEPT_CODE: { type: "string", editable: false, sortable: true },
                        DISTRICT: { type: "string", editable: false, sortable: true },
                        TGL_MASUK: { type: "DateTime", editable: false, sortable: true },
                        INPUT_DATE: { type: "DateTime", editable: false, sortable: true },
                        INPUT_BY: { type: "string", editable: false, sortable: true },
                        STATUS: { type: "int", editable: false, sortable: true }
                    }
                }
            },
            pageSize: 50,

        })
    })
    kendo.bind($("#form_main"), settingModel);

    /*var now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    document.getElementById('txt_startJamKerja').value = now.toISOString().slice(0, 16);*/

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
            { field: 'NRP', title: 'NRP', width: 30 },
            { field: 'NAMA', title: 'Name', width: 70 },
            { field: 'SUBCONT_CODE', title: 'Subcont', width: 50 },
            { field: 'DISTRICT', title: 'District', width: 50 },
            { field: 'TGL_MASUK', title: 'Tanggal Masuk', width: 50 },
            /*{ title: 'Pilih', template: $('#tmp_check').html(), width: 30 },*/
        ]
    }).data("kendoGrid");

})

$("#txt_subcont").kendoDropDownList({
    dataTextField: "SUBCONT_NAME",
    dataValueField: "SUBCONT_CODE",
    dataSource: {
        type: "json",
        transport: {
            read: {
                url: $("#hd_path").val() + "api/Masters/getListSubcont",
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
        /*getListSubcont();*/
        console.log(dataItem);
    }
});

$("#txt_jabatan").kendoDropDownList({
    dataTextField: "JABATAN",
    dataValueField: "ID_JABATAN",
    dataSource: {
        type: "json",
        transport: {
            read: {
                url: $("#hd_path").val() + "api/Masters/getListJabatan",
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
        /*settingModel.set("id_jabatan", dataItem.id);*/
        /*getListJabatan();*/
    }
});

$("#txt_department").kendoDropDownList({
    dataTextField: "DEPT_DESC",
    dataValueField: "DEPT_CODE",
    dataSource: {
        type: "json",
        transport: {
            read: {
                url: $("#hd_path").val() + "api/Masters/getListDepartment",
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

function submmit() {
    var obj = {
        NRP: $("#txt_nrp").val(),
        NAMA: $("#txt_nama").val(),
        SUBCONT_CODE: $("#txt_subcont").val(),
        ID_JABATAN: $("#txt_jabatan").val(),
        DEPT_CODE: $("#txt_department").val(),
        DISTRICT: $("#txt_district").val(),
        TGL_MASUK: $("#txt_tglmasuk").val(),

    }
    console.log(obj);
    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        url: $("#hd_path").val() + "api/OperatorSub/submitOperator",
        data: JSON.stringify(obj),
        success: function (result) {
            if (result.Status == true) {
                alert("Success");
            } else {
                alert(result.Error);
            }
        }
    })
}