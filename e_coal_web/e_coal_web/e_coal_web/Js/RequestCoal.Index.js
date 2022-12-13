function submmit() {
    var obj = {
        
        MOMCOST: $("#txt_momcost").val(),
        VOLUMECOAL: $("#txt_volumecoal").val(),
        TARGETCGV: $("#txt_targetgcv").val(),
        DEADLINE: $("#txt_deadline").val()
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
                alert("Success");
            } else {
                alert(result.Remark);
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