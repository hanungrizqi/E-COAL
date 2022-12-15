var settingModel;

$(document).ready(function () {
    settingModel = kendo.observable({
        grade: "",
    })
})

$("#txt_seam").kendoDropDownList({
    dataTextField: "ID_IN_SITU",
    dataValueField: "ID_IN_SITU",
    dataSource: {
        type: "json",
        transport: {
            read: {
                url: $("#hd_path").val() + "api/InputCoal/getListSeamInSitu",
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
        $("#txt_grade").val("Grade " + dataItem.GRADE);
        settingModel.set("grade", dataItem.GRADE);
    }
});

function getTotalTonase() {
    var tara = $("#txt_beratTaraUnit").val();
    var bruto = $("#txt_beratBrutoUnit").val();
    console.log(tara);
    console.log(bruto);
    var tonase = bruto - tara;
    console.log(tonase);
    $("#txt_totalTonase").val(tonase);
}

function submmit() {
    var get = settingModel.get();
    var obj = {
        ID_OUT_ROM: $("#txt_seam").val(),
        /*LOCATION: $("#txt_lokasi").val(),*/
        ID_IN_SITU_SEAM: $("#txt_seam").val(),
        JAM: $("#txt_jam").val(),
        GRADE: get.grade,
        /*LOADER: $("#txt_loader").val(),*/
        NO_UNIT_DT: $("#txt_noUnitDt").val(),
        BERAT_TARA_UNIT_KG: $("#txt_beratTaraUnit").val(),
        BERAT_BRUTO_UNIT_KG: $("#txt_beratBrutoUnit").val(),
        TOTAL_TONASE: $("#txt_totalTonase").val(),
        TANGGAL: $("#txt_tanggal").val(),
        /*DISTRICT: $("#hd_district").val(),*/
        INPUT_BY: $("#hd_userLogin").val()
    }

    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        url: $("#hd_path").val() + "api/InputCoal/submmitOutRom",
        data: JSON.stringify(obj),
        success: function (result) {
            if (result.Status == true) {
                $("#id_outRom").append($("#txt_seam").val());
                $("#vol_tonase").append($("#txt_totalTonase").val());
                $("#notif_success").show();
                $("#id_outRom").css("color", "red");
                $("#vol_tonase").css("color", "red");
            } else {
                alert(result.Error);
            }
        }
    })
}