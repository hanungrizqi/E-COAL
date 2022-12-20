var settingModel;

$(document).ready(function () {
    settingModel = kendo.observable({
        ID_PAIRING: "",
        NRP_OP: "",

        ds_grid_dataSource: new kendo.data.DataSource({
            transport: {
                read: {
                    type: "GET",
                    contentType: "application/json",
                    cache: false,
                    url: $("#hd_path").val() + "api/RatingOperator/getListPenilaian",
                    //data: {
                    //    ID_PEKERJAAN: "",
                    //}
                },
            },
            schema: {
                data: "Data",
                total: "Total",
                model: {
                    id: "ID",
                    fields: {
                        ID: { type: "string", editable: false, sortable: true },
                        OPERATOR: { type: "string", editable: false, sortable: true },
                        NAMA: { type: "string", editable: false, sortable: true },
                        ID_EQUIPMENT: { type: "string", editable: false, sortable: true },
                        EQUIPMENT: { type: "string", editable: false, sortable: true },
                        ID_PEKERJAAN: { type: "string", editable: false, sortable: true },
                        PEKERJAAN: { type: "string", editable: false, sortable: true },
                        ID_SEAM: { type: "string", editable: false, sortable: true },
                        SEAM: { type: "string", editable: false, sortable: true },
                        VOLUME: { type: "string", editable: false, sortable: true },
                        START_WORK_HOUR: { type: "string", editable: false, sortable: true },
                        TIME_H: { type: "string", editable: false, sortable: true },
                        TIME_M: { type: "string", editable: false, sortable: true },
                        STATUS: { type: "string", editable: false, sortable: true },
                        NILAI: { type: "string", editable: false, sortable: true }
                    }
                }
            },
            pageSize: 50,
        })
    })

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
            { title: 'Action', width: 50, template: $("#tmp_open").html() },
            { field: 'OPERATOR', title: 'NRP', width: 80 },
            { field: 'NAMA', title: 'Name', width: 100 },
            { field: 'PEKERJAAN', title: 'Pekerjaan', width: 100 },
            { field: 'NILAI', title: 'Nilai', width: 50 },
        ]
    }).data("kendoGrid");
})

function OpenModal(id_pairing) {
    $.ajax({
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        url: $("#hd_path").val() + "api/RatingOperator/getDetailOperator?idPairing=" + id_pairing,
        success: function (result) {
            if (result.Status == true) {
                var obj = result.Data;
                console.log(obj);
                settingModel.set("ID_PAIRING", obj.ID);
                settingModel.set("NRP_OP", obj.OPERATOR);
                $("#txt_operator").val(obj.NAMA);
                $("#txt_pekerjaan").val(obj.NAMA_PEKERJAAN);
                $("#txt_volume").val(obj.VOLUME);

                $("#modalUpdate").modal('show');       
            } else {
                alert(result.Remark);
            }
        }
    })
}

var arrPoin = [
    { poin: 1 }, { poin: 2 }, { poin: 3 }, { poin: 4 }, { poin: 5 }, { poin: 6 }, { poin: 7 }, { poin: 8 }, { poin: 9 }, { poin: 10 }
]

$("#txt_safety").kendoDropDownList({
    dataTextField: "poin",
    dataValueField: "poin",
    dataSource: arrPoin,
    optionLabel: "Pilih",
    select: function (e) {

    }
});

$("#txt_komunikasi").kendoDropDownList({
    dataTextField: "poin",
    dataValueField: "poin",
    dataSource: arrPoin,
    optionLabel: "Pilih",
    select: function (e) {

    }
});

$("#txt_metodeKerja").kendoDropDownList({
    dataTextField: "poin",
    dataValueField: "poin",
    dataSource: arrPoin,
    optionLabel: "Pilih",
    select: function (e) {

    }
});

function NilaiOperator() {
    var get = settingModel.get();
    var obj = {
        ID_PAIRING: get.ID_PAIRING
        , NRP: get.NRP_OP
        , SAFETY: $("#txt_safety").val()
        , KOMUNIKASI: $("#txt_komunikasi").val()
        , METODE_KERJA: $("#txt_metodeKerja").val()
        , VOLUME: $("#txt_volume").val()
        , INPUT_BY: $("#hd_userLogin").val()
        //, DISTRICT: $("#hd_district").val()
    }
    console.log(obj);
    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        url: $("#hd_path").val() + "api/RatingOperator/nilaiOperator",
        data: JSON.stringify(obj),
        success: function (result) {
            if (result.Status == true) {
                alert("Penilaian Berhasil!!");
                $('#modalUpdate').modal('hide');
                settingModel.ds_grid_dataSource.read();
            } else {
                alert(result.Remark);
            }
        }
    })
}