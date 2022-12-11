var settingModel;

$(document).ready(function () {
    settingModel = kendo.observable({
        id_pekerjaan: "",
        id_seam: "",

        ds_grid_dataAsset: new kendo.data.DataSource({
            transport: {
                read: {
                    type: "GET",
                    contentType: "application/json",                   
                    cache: false,
                    url: $("#hd_path").val() + "api/SettingUnit/getListOperatorByRating",//?ID_PEKERJAAN=" + ID_PEKERJAAN,//$("#txt_pekerjaan").val(),
                    data: {
                        ID_PEKERJAAN: "",
                    }
                },
            },
            schema: {
                data: "Data",
                total: "Total",
                model: {
                    id: "EMPLOYEE_ID",
                    fields: {
                        EMPLOYEE_ID: { type: "string", editable: false, sortable: true },
                        NAME: { type: "string", editable: false, sortable: true },
                        POSITION_ID: { type: "string", editable: false, sortable: true },
                        POS_TITLE: { type: "string", editable: false, sortable: true },
                        DSTRCT_CODE: { type: "string", editable: false, sortable: true },
                        ID_PEKERJAAN: { type: "string", editable: false, sortable: true },
                        NAMA_PEKERJAAN: { type: "string", editable: false, sortable: true },
                        AVG_AP: { type: "string", editable: false, sortable: true }
                    }
                }
            },
            pageSize: 50,
           
        })
    })
    kendo.bind($("#form_main"), settingModel);

})

function getListOperator() {
    $("#grid").kendoGrid({
        dataSource: settingModel.ds_grid_dataAsset,
        resizable: "true",
        editable: "inline",
        scrollable: "true",
        sortable: "true",
        filterable: "true",
        pageable: "true",
        height: "500px",
        columns: [
            //{ title: 'Action', width: 50, template: $("#tmp_action").html() },
            { field: 'EMPLOYEE_ID', title: 'NRP', width: 80 },
            { field: 'NAME', title: 'Name', width: 100 },
            { field: 'NAMA_PEKERJAAN', title: 'Pekerjaan', width: 100 },
            { field: 'AVG_AP', title: 'Nilai', width: 50 },
            { title: 'Pilih', template: $('#tmp_check').html(), width: 30 },
        ]
    }).data("kendoGrid");
}

$("#txt_pekerjaan").kendoDropDownList({
    dataTextField: "NAMA_PEKERJAAN",
    dataValueField: "id",
    dataSource: {
        type: "json",
        transport: {
            read: {
                url: $("#hd_path").val() + "api/Masters/getListPekerjaan",
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
        settingModel.ds_grid_dataAsset.transport.options.read.data.ID_PEKERJAAN = dataItem.id;
        settingModel.set("id_pekerjaan", dataItem.id);
        getListOperator();
    }
});

$("#txt_seam").kendoDropDownList({
    dataTextField: "NAMA_SEAM",
    dataValueField: "id",
    dataSource: {
        type: "json",
        transport: {
            read: {
                url: $("#hd_path").val() + "api/Masters/getListSeam",
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
        settingModel.set("id_seam", dataItem.id);
        getAlat();
    }
});

function getAlat() {
    var get = settingModel.get();
    $.ajax({
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        url: $("#hd_path").val() + "api/SettingUnit/getAlatByPekerjaanSeam?ID_PEKERJAAN=" + get.id_pekerjaan + "&ID_SEAM=" + get.id_seam,
        success: function (result) {
            if (result.Status == true) {
                var obj = result.Data
                $("#txt_rekomendasiAlat").val(obj.NAMA_ALAT)
                $("#hd_rekomendasiAlat").val(obj.ID_ALAT)
            } else {
                alert(result.Remark);
            }
        }
    })
}

function submmit() {
    var grid = settingModel.ds_grid_dataAsset.data();
    var total_checked = $("[name='PILIH_OP']:checked").length;
    var grid_obj;
    console.log(total_checked);
    if (total_checked > 1) {
        alert("Operator hanya bisa dipilih 1");
    }
    else if (total_checked == 0) {
        alert("Operator belum dipilih");
    }
    else {
        for (var i_inc = 0; i_inc < grid.length; i_inc++) {
            i_cls_data = grid[i_inc];

            var check = $("[id='" + i_cls_data.EMPLOYEE_ID + "_CHECK']").is(":checked");
            if (check == true) {
                grid_obj = i_cls_data;
            }
        }

        console.log(grid_obj);
        var obj = {
            OPERATOR: grid_obj.EMPLOYEE_ID,
            ID_EQUIPMENT: $("#hd_rekomendasiAlat").val(),
            EQUIPMENT: $("#txt_rekomendasiAlat").val(),
            ID_PEKERJAAN: $("#txt_pekerjaan").val(),
            ID_SEAM: $("#txt_seam").val(),
            VOLUME: $("#txt_volume").val(),
            TIME_H: $("#txt_estimasi_h").val(),
            TIME_M: $("#txt_estimasi_m").val(),
            GRADE: "A",
        }
        console.log(obj);
        $.ajax({
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            url: $("#hd_path").val() + "api/SettingUnit/submitOperator",
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
}

//function getListOperator(id_pekerjaan) {
//    $.ajax({
//        type: "GET",
//        dataType: "json",
//        contentType: "application/json",
//        url: $("#hd_path").val() + "api/SettingUnit/getListOperatorByrating?ID_PEKERJAAN=" + id_pekerjaan,
//        success: function (result) {
//            if (result.Status == true) {
//                var list = result.Data;
//                console.log(list);

//                $('#tbl_opt').DataTable({
//                    data: list,
//                    columns: [
//                        { data: 'EMPLOYEE_ID', title: 'NRP' },
//                        { data: 'NAME', title: 'Name' }
//                    ]
//                });
//            }
//            else {
//                alert(result.Remark);
//            }
//        }
//    })
//}