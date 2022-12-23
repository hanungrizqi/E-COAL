var settingModel;
var protyAlat = 0;

$(document).ready(function () {
    settingModel = kendo.observable({
        id_pekerjaan: "",
        id_seam: "",

        ds_grid_dataSource: new kendo.data.DataSource({
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
                    id: "NRP",
                    fields: {
                        NRP: { type: "string", editable: false, sortable: true },
                        NAMA: { type: "string", editable: false, sortable: true },
                        SUBCONT_CODE: { type: "string", editable: false, sortable: true },
                        ID_JABATAN: { type: "string", editable: false, sortable: true },
                        JABATAN: { type: "string", editable: false, sortable: true },
                        DISTRICT: { type: "string", editable: false, sortable: true },
                        ID_PEKERJAAN: { type: "string", editable: false, sortable: true },
                        NAMA_PEKERJAAN: { type: "string", editable: false, sortable: true },
                        AVG_AP: { type: "string", editable: false, sortable: true },
                        STATUS_AVALIABLE: { type: "string", editable: false, sortable: true }
                    }
                }
            },
            pageSize: 50,
           
        })
    })
    kendo.bind($("#form_main"), settingModel);

    var now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    document.getElementById('txt_startJamKerja').value = now.toISOString().slice(0, 16);

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
            { field: 'NRP', title: 'NRP', width: 80 },
            { field: 'NAMA', title: 'Name', width: 100 },
            { field: 'NAMA_PEKERJAAN', title: 'Pekerjaan', width: 100 },
            /*{ field: 'AVG_AP', title: 'Nilai', format: '{0:0.00}', width: 50 },*/
            { field: 'AVG_AP', title: 'Nilai', template: "#:(Math.round(parseFloat(AVG_AP) * 100) / 100).toFixed(2)#", width: 50 },
            { title: 'Pilih', template: $('#tmp_check').html(), width: 30 },
        ]
    }).data("kendoGrid");

})

function getListOperator() {
    var get = settingModel.get();
    settingModel.ds_grid_dataSource.transport.options.read.data.ID_PEKERJAAN = get.id_pekerjaan;
    settingModel.ds_grid_dataSource.read();
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
        /*settingModel.ds_grid_dataSource.transport.options.read.data.ID_PEKERJAAN = dataItem.id;*/
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
                protyAlat = obj.PROTY;
            } else {
                alert(result.Error);
            }
        }
    })
}

function setEstimasiJamKerja() {
    var volume = $("#txt_volume").val();
    //console.log(volume);
    var estimasi = volume / protyAlat;
    var est_st = estimasi.toString();
    var split = est_st.split(".");
    //console.log(split);
    $("#txt_estimasi_h").val(split[0]);
    var minute = "0." + split[1].toString();
    //console.log(minute);
    var m = minute * 60;
    $("#txt_estimasi_m").val(m.toFixed());
}

function submmit() {
    var grid = settingModel.ds_grid_dataSource.data();
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

            var check = $("[id='" + i_cls_data.NRP + "_CHECK']").is(":checked");
            if (check == true) {
                grid_obj = i_cls_data;
                //console.log(grid_obj);
            }
        }

        //console.log(grid_obj);
        var obj = {
            OPERATOR: grid_obj.NRP,
            ID_EQUIPMENT: $("#hd_rekomendasiAlat").val(),
            EQUIPMENT: $("#txt_rekomendasiAlat").val(),
            ID_PEKERJAAN: $("#txt_pekerjaan").val(),
            ID_SEAM: $("#txt_seam").val(),
            VOLUME: $("#txt_volume").val(),
            STAR_WORK_HOUR: $("#txt_startJamKerja").val(), 
            TIME_H: $("#txt_estimasi_h").val(),
            TIME_M: $("#txt_estimasi_m").val(),
            INPUT_BY: $("#hd_userLogin").val(),
            DISTRICT: $("#hd_district").val()
            //GRADE: "A",
        }
        //console.log(obj);
        $.ajax({
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            url: $("#hd_path").val() + "api/SettingUnit/submitOperator",
            data: JSON.stringify(obj),
            success: function (result) {
                if (result.Status == true) {
                    alert("Success");
                    getListOperator();
                } else {
                    alert(result.Error);
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