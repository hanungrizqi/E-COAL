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
                alert(result.Remark);
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
        if (parseInt(garActual) >= parseInt(get.GAR_MIN) && parseInt(garActual) < parseInt(get.GAR_MAX)) {
            $("#txt_kondisiCoal").val("Normal");
        } else {
            $("#txt_kondisiCoal").val("Anomali");
        }
    } else if (get.GRADE == "C") {
        if (parseInt(garActual) >= parseInt(get.GAR_MIN) && parseInt(garActual) < parseInt(get.GAR_MAX)) {
            $("#txt_kondisiCoal").val("Normal");
        } else {
            $("#txt_kondisiCoal").val("Anomali");
        }
    } else if (get.GRADE == "Reject") {
        if (parseInt(garActual) < parseInt(get.GAR_MIN)) {
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
    }
    //console.log(obj);
    $.ajax({
        type: "POST", 
        dataType: "json",
        contentType: "application/json",
        url: $("#hd_path").val() + "api/InputCoal/submmitInSitu",
        data: JSON.stringify(obj),
        success: function (result) {
            if (result.Status == true) {
                $("#id_inSitu").append(setId());
                $("#vol_tonase").append($("#txt_totalTonase").val());

                if ($("#txt_kondisiCoal").val() == "Normal") {
                    $("#id_inSitu").css("color", "green");
                    $("#vol_tonase").css("color", "green");
                } else {
                    $("#id_inSitu").css("color", "red");
                    $("#vol_tonase").css("color", "red");
                }

                $("#notif_success").show();
            } else {
                alert(result.Remark);
            }
        }
    })    
}