
var server = $('input[name="hwaddr"]').val();           // server identifier

$(document).ready(function() {
    var activeCharts = {};
    var serverCharts = {
        "cpu_usage": {
            "div": "cpu_utilization_datapoints",
            "type": "cpu_usage"
        },
        "inbound_traffic": {
            "div": "networkin_datapoints",
            "type": "inbound_traffic"
        },
        "outbound_traffic": {
            "div": "networkout_datapoints",
            "type": "outbound_traffic"
        },
        "disk_readops_datapoints": {
            "div": "disk_readops_datapoints",
            "type": "disks"
        },
        "disk_writeops_datapoints": {
            "div": "disk_writeops_datapoints",
            "type": "disks"
        },
        "disk_readbytes_datapoints": {
            "div": "disk_readbytes_datapoints",
            "type": "disks"
        },
        "disk_writebytes_datapoints": {
            "div": "disk_writebytes_datapoints",
            "type": "disks"
        }
    };

    $.each(serverCharts, function(chartMp, chartType) {
        activeCharts[chartType["div"]] = new Chart();
        var chartOpt = chartOptions[chartType.type];
        chartOpt["chart"]["renderTo"] = chartType["div"];
        activeCharts[chartType["div"]]["div"] = chartType["div"];
        activeCharts[chartType["div"]]["chartOptions"] = chartOpt;
        activeCharts[chartType["div"]]["mountPoint"] = chartMp;
        activeCharts[chartType["div"]]["address"] = "/ajax/aws/" + server + "/metrics/" + chartType["type"] + "/";
        activeCharts[chartType["div"]].init();
    });
});
