var settingModel;

$(document).ready(function () {
    settingModel = kendo.observable({
        ds_gridInSitu: new kendo.data.DataSource({
            transport: {
                read: {
                    type: "GET",
                    contentType: "application/json",
                    cache: false,
                    url: $("#hd_path").val() + "api/Dashboard/getListInSitu",//?ID_PEKERJAAN=" + ID_PEKERJAAN,//$("#txt_pekerjaan").val(),
                    data: {
                        TANGGAL_AWAL: "",
                        TANGGAL_AKHIR: ""
                    }
                },
            },
            schema: {
                data: "Data",
                total: "Total",
                model: {
                    fields: {
                        IN_SITU: { type: "string", editable: false, sortable: true },
                        TANGGAL: { type: "date", editable: false, sortable: true },
                        TOTAL_TONASE: { type: "decimal", editable: false, sortable: true },
                        COAL_CONDITION: { type: "string", editable: false, sortable: true }
                    }
                }
            },
            pageSize: 50,
        }),

        ds_gridAnomaliInSitu: new kendo.data.DataSource({
            transport: {
                read: {
                    type: "GET",
                    contentType: "application/json",
                    cache: false,
                    url: $("#hd_path").val() + "api/Dashboard/getListAnomaliInSitu",//?ID_PEKERJAAN=" + ID_PEKERJAAN,//$("#txt_pekerjaan").val(),
                    data: {
                        TANGGAL_AWAL: "",
                        TANGGAL_AKHIR: ""
                    }
                },
            },
            schema: {
                data: "Data",
                total: "Total",
                model: {
                    fields: {
                        ID_IN_SITU: { type: "string", editable: false, sortable: true },
                        COAL_CONDITION: { type: "string", editable: false, sortable: true },
                        TOTAL_TONASE: { type: "string", editable: false, sortable: true },
                        TANGGAL: { type: "string", editable: false, sortable: true },
                        STATUS: { type: "string", editable: false, sortable: true },
                        IN_SITU: { type: "string", editable: false, sortable: true }
                    }
                }
            },
            pageSize: 50,
        }),

        ds_gridInOutRom: new kendo.data.DataSource({
            transport: {
                read: {
                    type: "GET",
                    contentType: "application/json",
                    cache: false,
                    url: $("#hd_path").val() + "api/Dashboard/getListInOutRom",//?ID_PEKERJAAN=" + ID_PEKERJAAN,//$("#txt_pekerjaan").val(),
                    data: {
                        TANGGAL_AWAL: "",
                        TANGGAL_AKHIR: ""
                    }
                },
            },
            schema: {
                data: "Data",
                total: "Total",
                model: {
                    fields: {
                        ID_IN_SITU_SEAM: { type: "string", editable: false, sortable: true },
                        IN_SITU_ROM: { type: "string", editable: false, sortable: true },
                        TANGGAL: { type: "string", editable: false, sortable: true },
                        TOTAL_TONASE: { type: "string", editable: false, sortable: true },
                        ROM: { type: "string", editable: false, sortable: true }
                    }
                }
            },
            pageSize: 50,
        }),

        ds_gridRequestCoalApproval: new kendo.data.DataSource({
            transport: {
                read: {
                    type: "GET",
                    contentType: "application/json",
                    cache: false,
                    url: $("#hd_path").val() + "api/Dashboard/getRequestCoalApproval",//?ID_PEKERJAAN=" + ID_PEKERJAAN,//$("#txt_pekerjaan").val(),
                    /*data: {
                        TANGGAL_AWAL: "",
                        TANGGAL_AKHIR: ""
                    }*/
                },
            },
            schema: {
                data: "Data",
                total: "Total",
                model: {
                    fields: {
                        ID: { type: "int", editable: false, sortable: true },
                        MOMCOST: { type: "string", editable: false, sortable: true },
                        VOLUMECOAL: { type: "decimal", editable: false, sortable: true },
                        TARGETGCV: { type: "decimal", editable: false, sortable: true },
                        DEADLINE: { type: "date", editable: false, sortable: true },
                        STATUS: { type: "int", editable: false, sortable: true },
                        REQUEST_COAL: { type: "string", editable: false, sortable: true }
                    }
                }
            },
            pageSize: 50,
        })
    })

    $("#gridInSitu").kendoGrid({
        dataSource: settingModel.ds_gridInSitu,
        resizable: "true",
        editable: "inline",
        scrollable: "true",
        sortable: "true",
        filterable: "true",
        pageable: "true",
        height: "400px",
        columns: [
            //{ title: 'Action', width: 50, template: $("#tmp_action").html() },
            { title: 'In SITU (GCV | Ton)', template: $('#tmp_inSitu').html(), width: 100 }
        ]
    }).data("kendoGrid");

    $("#gridAnomaliInSitu").kendoGrid({
        dataSource: settingModel.ds_gridAnomaliInSitu,
        resizable: "true",
        editable: "inline",
        scrollable: "true",
        sortable: "true",
        filterable: "true",
        pageable: "true",
        height: "400px",
        columns: [            
            { title: 'Anomali Data', template: $('#tmp_AnomaliInSitu').html(), width: 100 },
            { title: 'Action', width: 50, template: $("#tmp_AnomaliAction").html() },
        ]
    }).data("kendoGrid");

    $("#gridInOutRom").kendoGrid({
        dataSource: settingModel.ds_gridInOutRom,
        resizable: "true",
        editable: "inline",
        scrollable: "true",
        sortable: "true",
        filterable: "true",
        pageable: "true",
        height: "400px",
        columns: [
            { title: 'In Out ROM (GCV | Ton)', template: $('#tmp_InOutRom').html(), width: 100 }
        ]
    }).data("kendoGrid");

    $("#gridRequestCoalApproval").kendoGrid({
        dataSource: settingModel.ds_gridRequestCoalApproval,
        resizable: "true",
        editable: "inline",
        scrollable: "true",
        sortable: "true",
        filterable: "true",
        pageable: "true",
        height: "400px",
        columns: [
            /*{ title: 'Request Coal List', template: $('#tmp_RequestCoalApproval').html(), width: 100 },*/
            { field: 'MOMCOST', title: 'Mom Cost', width: 50 },
            { field: 'VOLUMECOAL', title: 'Volume Coal', width: 50 },
            { field: 'TARGETGCV', title: 'Target GCV', width: 50 },
            { field: 'DEADLINE', title: 'Deadline', width: 50, format: "{0: dd MMM yyyy}" },
            { title: 'Action', width: 50, template: $("#tmp_RequestCoalAction").html() },
        ]
    }).data("kendoGrid");

    setGambar();
    getCGV();
    setDateNow();
    //setChart();

})

function setGambar() {
    $.ajax({
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        url: $("#hd_path").val() + "api/Cgv/getImgCgv",
        //data: JSON.stringify(obj),
        success: function (result) {
            if (result.Status == true) {
                var data = result.Data;
                $("#DisplayImage").show();
                $("#img_cgv").attr("src", "/UploadImage/" + data.IMAGE_TITLE);
            } else {
                alert(result.Error);
            }
        }
    })
}

var UploadImage = function () {
    var file = $("#SelectImage").get(0).files;
    var data = new FormData;
    data.append("ImageFile", file[0]);
    $.ajax({
        type: "POST",
        url: '/Home/ImageUpload',
        data: data,
        contentType: false,
        processData: false,
        success: function (imgID) {
            console.log(imgID);
            $("#DisplayImage").show();
            $("#img_cgv").attr("src", "/UploadImage/" + imgID);

        }
    })
}


function setDateNow() {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);

    $.ajax({
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        url: $("#hd_path").val() + "api/Dashboard/getDate",
        success: function (result) {
            if (result.Status == true) {
                var data = result.Data;
                console.log(today);
                console.log(data.max_date);
                $("#txt_tanggalAwal").val(data.min_date);
                $("#txt_tanggalAkhir").val(today);
                fillter();
            } else {
                alert(result.Error);
            }
        }
    })
}

function fillter() {
    settingModel.ds_gridInSitu.transport.options.read.data.TANGGAL_AWAL = $("#txt_tanggalAwal").val();
    settingModel.ds_gridInSitu.transport.options.read.data.TANGGAL_AKHIR = $("#txt_tanggalAkhir").val();
    settingModel.ds_gridInSitu.read();

    settingModel.ds_gridAnomaliInSitu.transport.options.read.data.TANGGAL_AWAL = $("#txt_tanggalAwal").val();
    settingModel.ds_gridAnomaliInSitu.transport.options.read.data.TANGGAL_AKHIR = $("#txt_tanggalAkhir").val();
    settingModel.ds_gridAnomaliInSitu.read();

    settingModel.ds_gridInOutRom.transport.options.read.data.TANGGAL_AWAL = $("#txt_tanggalAwal").val();
    settingModel.ds_gridInOutRom.transport.options.read.data.TANGGAL_AKHIR = $("#txt_tanggalAkhir").val();
    settingModel.ds_gridInOutRom.read();

}

function anomaliApprove(inSitu) {
    var obj = {
        IN_SITU: inSitu
    }
    //console.log(obj);
    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        url: $("#hd_path").val() + "api/Dashboard/approveAnomali",
        data: JSON.stringify(obj),
        success: function (result) {
            if (result.Status == true) {
                fillter();
            } else {
                alert(result.Error);
            }
        }
    })
}

function anomaliReject(inSitu) {
    var obj = {
        IN_SITU: inSitu
    }

    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        url: $("#hd_path").val() + "api/Dashboard/rejectAnomali",
        data: JSON.stringify(obj),
        success: function (result) {
            if (result.Status == true) {
                fillter();
            } else {
                alert(result.Error);
            }
        }
    })
}

function getCGV() {
    var district = $("#hd_district").val();
    $.ajax({
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        url: $("#hd_path").val() + "api/Dashboard/getCGVInROM?district=" + district,
        //data: JSON.stringify(obj),
        success: function (result) {
            if (result.Status == true) {
                var data = result.Data;
                $("#tonase").append(data.TOTAL_TONASE_ALL);
                $("#grade_a").append(data.TOTAL_TONASE_A);
                $("#grade_b").append(data.TOTAL_TONASE_B);
                $("#grade_c").append(data.TOTAL_TONASE_C);

                $("#total_tonase").append(data.TOTAL_TONASE_ALL);
                $("#sumproductGar").append(data.SUM_P);
            } else {
                alert(result.Error);
            }
        }
    })
}

function setChart() {
    Codebase.onLoad(
        class {
            static initChartsChartJS() {
                (Chart.defaults.color = "#818d96"),
                    (Chart.defaults.scale.grid.color = "rgba(0,0,0,.04)"),
                    (Chart.defaults.scale.grid.zeroLineColor = "rgba(0,0,0,.1)"),
                    (Chart.defaults.scale.beginAtZero = !0),
                    (Chart.defaults.elements.line.borderWidth = 2),
                    (Chart.defaults.elements.point.radius = 5),
                    (Chart.defaults.elements.point.hoverRadius = 7),
                    (Chart.defaults.plugins.tooltip.radius = 3),
                    (Chart.defaults.plugins.legend.labels.boxWidth = 12);
                let 
                    l,
                    h = document.getElementById("gradeInRom"),                    
                    g = {
                        labels: ["Earnings", "Sales", "Tickets"],
                        datasets: [
                            { data: [50, 25, 25], backgroundColor: ["rgba(101, 163, 13, 1)", "rgba(217, 119, 6, 1)", "rgba(220, 38, 38, 1)"], hoverBackgroundColor: ["rgba(101, 163, 13, .5)", "rgba(217, 119, 6, .5)", "rgba(220, 38, 38, .5)"] },
                        ],
                    };
                    null !== h && (l = new Chart(h, { type: "doughnut", data: g }));
            }
            static initRandomEasyPieChart() {
                document.querySelectorAll(".js-pie-randomize").forEach((a) => {
                    a.addEventListener("click", (t) => {
                        a.closest(".block")
                            .querySelectorAll(".pie-chart")
                            .forEach((a) => {
                                jQuery(a)
                                    .data("easyPieChart")
                                    .update(Math.floor(100 * Math.random() + 1));
                            });
                    });
                });
            }
            static init() {
                this.initRandomEasyPieChart(), this.initChartsChartJS();
            }
        }.init()
    );
    //var chart = document.getElementById("gradeInRom");
    //new Chart(chart, {
    //    type: "doughnut",
    //    data: {
    //        labels: ["Grade A", "Grade B", "Grade C"],
    //        datasets: [
    //            { data: [50, 25, 25], backgroundColor: ["rgba(101, 163, 13, 1)", "rgba(217, 119, 6, 1)", "rgba(220, 38, 38, 1)"], hoverBackgroundColor: ["rgba(101, 163, 13, .5)", "rgba(217, 119, 6, .5)", "rgba(220, 38, 38, .5)"] },
    //        ],
    //    }
    //})
}

function requestApprove(requestCoal) {
    var obj = {
        ID_REQUESTCOAL: requestCoal
    }
    console.log(obj)
    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        url: $("#hd_path").val() + "api/Dashboard/approveRequestCoal",
        data: JSON.stringify(obj),
        success: function (result) {
            if (result.Status == true) {
                settingModel.ds_gridRequestCoalApproval.read();
            } else {
                alert(result.Error);
            }
        }
    })
}