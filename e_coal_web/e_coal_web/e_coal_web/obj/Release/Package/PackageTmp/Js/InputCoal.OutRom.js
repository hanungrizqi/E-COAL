var settingModel;

$(document).ready(function () {
    settingModel = kendo.observable({
        grade: "",
        total_tonase_seam: ""
    })

    callSeam();
})

function callSeam() {
    $("#txt_seam").kendoDropDownList({
        dataTextField: "ID_IN_SITU_SEAM",
        dataValueField: "ID_IN_SITU_SEAM",
        dataSource: {
            type: "json",
            transport: {
                read: {
                    url: $("#hd_path").val() + "api/InputCoal/getListSeamInRom",
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

            getAvaliableTonase(dataItem.ID_IN_SITU_SEAM);
        }
    });
}

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

    if (obj.JAM == "" || obj.ID_IN_SITU_SEAM == "Pilih" || obj.NO_UNIT_DT == "" || obj.BERAT_TARA_UNIT_KG == "" || obj.BERAT_BRUTO_UNIT_KG == "" || obj.TANGGAL == "") {
        alert("Lenkapi data!!");
    }
    else {
        if (obj.TOTAL_TONASE > get.total_tonase_seam) {
            alert("Total Tonase melebihi ketersedian Tonase dari In ROM")
        } else {
            if ($("#txt_totalTonase").val() > 0) {
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

                            callSeam();
                        } else {
                            alert(result.Error);
                        }
                    }
                })
            } else {
                alert("Total Tonase tidak boleh kurang dari 0");
            }
        }  
    }
}

function getAvaliableTonase(id_inSitu) {
    $.ajax({
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        url: $("#hd_path").val() + "api/InputCoal/getAvaliableTonaseInRom?id_inSitu=" + id_inSitu,
        //data: JSON.stringify(obj),
        success: function (result) {
            if (result.Status == true) {
                var data = result.Data;
                //console.log(data);
                settingModel.set("total_tonase_seam", data.AVALIABLE_TONASE_IN_ROM);

                $("#seam").empty();
                $("#tonase_inRom").empty();
                $("#tonase_outRom").empty();
                $("#avaliable_tonase").empty();

                $("#seam").append(data.ID_IN_SITU_SEAM);
                $("#tonase_inRom").append(data.TOTAL_TONASE_IN_ROM);
                $("#tonase_outRom").append(data.TOTAL_TONASE_OUT_ROM);
                $("#avaliable_tonase").append(data.AVALIABLE_TONASE_IN_ROM);

                $("#forn_tonase").show();
            } else {
                alert(result.Error);
            }
        }
    })
}


function Reset() {
    $("#txt_jam").val("");
    $("#txt_seam").val("");
    $("#txt_grade").val("");
    $("#txt_noUnitDt").val("");
    $("#txt_beratTaraUnit").val("");
    $("#txt_beratBrutoUnit").val("");
    $("#txt_totalTonase").val("");
    $("#txt_tanggal").val("");
    $("#txt_seam").data("kendoDropDownList").value(-1);

    settingModel.set("grade", "");
    settingModel.set("total_tonase_seam", "");

    $("#seam").empty();
    $("#tonase_inRom").empty();
    $("#tonase_outRom").empty();
    $("#avaliable_tonase").empty();
    $("#forn_tonase").hide();

    $("#id_outRom").empty;
    $("#vol_tonase").empty;
    $("#notif_success").hide();
}