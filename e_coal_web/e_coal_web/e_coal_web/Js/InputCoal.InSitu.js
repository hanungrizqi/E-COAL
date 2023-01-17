var settingModel;

$(document).ready(function () {
    settingModel = kendo.observable({
        GRADE: "",
        GAR_MIN: "",
        GAR_MAX: "",
        INITIAL_SEAM: ""
    })
})

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
        $("#txt_estimasiGar").val("Grade " + dataItem.GRADE);
        settingModel.set("INITIAL_SEAM", dataItem.INITIAL);

        getGarFromGrade(dataItem.GRADE)
    }
});

function getGarFromGrade(grade) {
    $.ajax({
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        url: $("#hd_path").val() + "api/InputCoal/getGar?grade=" + grade,
        //data: JSON.stringify(obj),
        success: function (result) {
            if (result.Status == true) {
                var data = result.Data;
                settingModel.set("GRADE", data.GRADE);
                settingModel.set("GAR_MIN", data.GAR_MIN);
                settingModel.set("GAR_MAX", data.GAR_MAX);
            } else {
                alert(result.Error);
            }
        }
    })
}

function setKondisiCoal() {
    var get = settingModel.get();
    var garActual = $("#txt_garActual").val();
    if (get.GRADE == "A") {
        if (parseInt(garActual) >= parseInt(get.GAR_MIN)) {
            $("#txt_kondisiCoal").val("Normal");
        } else {
            $("#txt_kondisiCoal").val("Anomali");
        }
    } else if (get.GRADE == "B") {
        if (parseInt(garActual) >= parseInt(get.GAR_MIN) && parseInt(garActual) <= parseInt(get.GAR_MAX)) {
            $("#txt_kondisiCoal").val("Normal");
        } else {
            $("#txt_kondisiCoal").val("Anomali");
        }
    } else if (get.GRADE == "C") {
        if (parseInt(garActual) >= parseInt(get.GAR_MIN) && parseInt(garActual) <= parseInt(get.GAR_MAX)) {
            $("#txt_kondisiCoal").val("Normal");
        } else {
            $("#txt_kondisiCoal").val("Anomali");
        }
    } else if (get.GRADE == "Reject") {
        if (parseInt(garActual) <= parseInt(get.GAR_MIN)) {
            $("#txt_kondisiCoal").val("Normal");
        } else {
            $("#txt_kondisiCoal").val("Anomali");
        }
    }
}

function setId() {
    var get = settingModel.get();
    var id = get.INITIAL_SEAM + "|G." + get.GRADE + " " + $("#txt_garActual").val(); 
    return id;
}

function submmit() {
    var get = settingModel.get();
    var obj = {
        ID_IN_SITU: setId()
        , ID_SEAM: $("#txt_seam").val()
        , GRADE: get.GRADE
        , GAR_ACTUAL: $("#txt_garActual").val()
        , COAL_CONDITION: $("#txt_kondisiCoal").val()
        , TOTAL_TONASE: $("#txt_totalTonase").val()
        , TANGGAL: $("#txt_tanggal").val()
        , INPUT_BY: $("#hd_userLogin").val()
        , STATUS: $("#txtStatus").val()
    }

    //var statusIn = $("#txtStatus").val();
    //if (obj.COAL_CONDITION == 'Normal') {
    //    statusIn == 1;
    //} else {
    //    statusIn == 0;
    //}

    //console.log(obj);
    if (obj.ID_SEAM == "Pilih" || obj.GRADE == "" || obj.GAR_ACTUAL == "" || obj.COAL_CONDITION == "" || obj.TOTAL_TONASE == "" || obj.TANGGAL == "") {
        alert("Lengkapi Data!!");
    }
    else {
        $.ajax({
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            url: $("#hd_path").val() + "api/InputCoal/submmitInSitu",
            data: JSON.stringify(obj),
            success: function (result) {
                if (result.Status == true) {
                    $("#id_inSitu").empty();
                    $("#vol_tonase").empty();

                    $("#id_inSitu").append(setId());
                    $("#vol_tonase").append($("#txt_totalTonase").val());

                    if ($("#txt_kondisiCoal").val() == "Normal") {
                        /*$("txtStatus").val(1);*/
                        $("#id_inSitu").css("color", "green");
                        $("#vol_tonase").css("color", "green");
                    } else {
                        /*$("txtStatus").val(0);*/
                        $("#id_inSitu").css("color", "red");
                        $("#vol_tonase").css("color", "red");
                    }

                    $("#notif_success").show();
                    Reset(true);
                } else {
                    alert(result.Error);
                }
            }
        })    
    }
}

function Reset(isInput) {
    $("#txt_estimasiGar").val("");
    $("#txt_garActual").val("");
    $("#txt_kondisiCoal").val("");
    $("#txt_totalTonase").val("");
    $("#txt_tanggal").val("");
    $("#txt_seam").data("kendoDropDownList").value(-1);
    /*$("#txtStatus").val("");*/

    settingModel.set("grade", "");
    settingModel.set("total_tonase_seam", "");

    if (isInput != true) {
        $("#id_inSitu").empty();
        $("#vol_tonase").empty();
        $("#notif_success").hide();
    }

    settingModel.set("GRADE", "");
    settingModel.set("GAR_MIN", "");
    settingModel.set("GAR_MAX", "");
    settingModel.set("INITIAL_SEAM", "");
}