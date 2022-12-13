var settingModel;

$(document).ready(function () {
    settingModel = kendo.observable({
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
            //{ title: 'Action', width: 50, template: $("#tmp_action").html() },
            { field: 'OPERATOR', title: 'NRP', width: 80 },
            { field: 'NAMA', title: 'Name', width: 100 },
            { field: 'PEKERJAAN', title: 'Pekerjaan', width: 100 },
            { field: 'NILAI', title: 'Nilai', width: 50 },
        ]
    }).data("kendoGrid");
})




