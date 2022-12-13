var settingModel;

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
        /*OPERATOR: grid_obj.EMPLOYEE_ID,
        ID_EQUIPMENT: $("#hd_rekomendasiAlat").val(),
        EQUIPMENT: $("#txt_rekomendasiAlat").val(),
        ID_PEKERJAAN: $("#txt_pekerjaan").val(),
        ID_SEAM: $("#txt_seam").val(),
        VOLUME: $("#txt_volume").val(),
        TIME_H: $("#txt_estimasi_h").val(),
        TIME_M: $("#txt_estimasi_m").val(),
        GRADE: "A",*/
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

    /*var grid = settingModel.ds_grid_dataAsset.data();
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
    }*/
}