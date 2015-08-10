
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

$(function () {
    $('#disk_readops_datapoints').highcharts({
        chart: {
            type: 'spline'
        },
        title: {
            text: 'disk_readops_datapoints'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: 'Date and time'
            }
        },
        tooltip: {
            headerFormat: '<b>{series.name}:</b> {point.y:.2f}<br>',
            pointFormat: '{point.x:%Y-%m-%d %H:%M}'
        },
        yAxis: {
            title: {
                text: ''
            },
            min: 0
        },


        series: [{
            name: 'disk_readops_datapoints',
            data: [
                {% for value in disk_readops_datapoints|make_json_sorted %}
                    [Date.UTC({{value|dict_get:"Timestamp"|format_datetime_special|dict_get:"year"}}, {{value|dict_get:"Timestamp"|format_datetime_special|dict_get:"month"|substract_one}}, {{value|dict_get:"Timestamp"|format_datetime_special|dict_get:"day"}}, {{value|dict_get:"Timestamp"|format_datetime_special|dict_get:"hour"}}, {{value|dict_get:"Timestamp"|format_datetime_special|dict_get:"minute"}}, {{value|dict_get:"Timestamp"|format_datetime_special|dict_get:"second"}}), {{value|dict_get:"Average"}}],
                {% endfor %}
            ]
        }
    ]
    });
});


$(function () {
    $('#disk_writeops_datapoints').highcharts({
        chart: {
            type: 'spline'
        },
        title: {
            text: 'disk_writeops_datapoints'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: 'Date and time'
            }
        },
        tooltip: {
            headerFormat: '<b>{series.name}:</b> {point.y:.2f}<br>',
            pointFormat: '{point.x:%Y-%m-%d %H:%M}'
        },
        yAxis: {
            title: {
                text: ''
            },
            min: 0
        },

        series: [{
            name: 'disk_writeops_datapoints',
            data: [
                {% for value in disk_writeops_datapoints|make_json_sorted %}
                    [Date.UTC({{value|dict_get:"Timestamp"|format_datetime_special|dict_get:"year"}}, {{value|dict_get:"Timestamp"|format_datetime_special|dict_get:"month"|substract_one}}, {{value|dict_get:"Timestamp"|format_datetime_special|dict_get:"day"}}, {{value|dict_get:"Timestamp"|format_datetime_special|dict_get:"hour"}}, {{value|dict_get:"Timestamp"|format_datetime_special|dict_get:"minute"}}, {{value|dict_get:"Timestamp"|format_datetime_special|dict_get:"second"}}), {{value|dict_get:"Average"}}],
                {% endfor %}
            ]
        }
    ]
    });
});

$(function () {
    $('#disk_readbytes_datapoints').highcharts({
        chart: {
            type: 'spline'
        },
        title: {
            text: 'disk_readbytes_datapoints'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: 'Date and time'
            }
        },
        tooltip: {
            headerFormat: '<b>{series.name}:</b> {point.y:.2f}<br>',
            pointFormat: '{point.x:%Y-%m-%d %H:%M}'
        },
        yAxis: {
            title: {
                text: ''
            },
            min: 0
        },

        series: [{
            name: 'disk_readbytes_datapoints',
            data: [
                {% for value in disk_readbytes_datapoints|make_json_sorted %}
                    [Date.UTC({{value|dict_get:"Timestamp"|format_datetime_special|dict_get:"year"}}, {{value|dict_get:"Timestamp"|format_datetime_special|dict_get:"month"|substract_one}}, {{value|dict_get:"Timestamp"|format_datetime_special|dict_get:"day"}}, {{value|dict_get:"Timestamp"|format_datetime_special|dict_get:"hour"}}, {{value|dict_get:"Timestamp"|format_datetime_special|dict_get:"minute"}}, {{value|dict_get:"Timestamp"|format_datetime_special|dict_get:"second"}}), {{value|dict_get:"Average"}}],
                {% endfor %}
            ]
        }
    ]
    });
});

$(function () {
    $('#disk_writebytes_datapoints').highcharts({
        chart: {
            type: 'spline'
        },
        title: {
            text: 'disk_writebytes_datapoints'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: 'Date and time'
            }
        },
        tooltip: {
            headerFormat: '<b>{series.name}:</b> {point.y:.2f}<br>',
            pointFormat: '{point.x:%Y-%m-%d %H:%M}'
        },
        yAxis: {
            title: {
                text: ''
            },
            min: 0
        },

        series: [{
            name: 'disk_writebytes_datapoints',
            data: [
                {% for value in disk_writebytes_datapoints|make_json_sorted %}
                    [Date.UTC({{value|dict_get:"Timestamp"|format_datetime_special|dict_get:"year"}}, {{value|dict_get:"Timestamp"|format_datetime_special|dict_get:"month"|substract_one}}, {{value|dict_get:"Timestamp"|format_datetime_special|dict_get:"day"}}, {{value|dict_get:"Timestamp"|format_datetime_special|dict_get:"hour"}}, {{value|dict_get:"Timestamp"|format_datetime_special|dict_get:"minute"}}, {{value|dict_get:"Timestamp"|format_datetime_special|dict_get:"second"}}), {{value|dict_get:"Average"}}],
                {% endfor %}
            ]
        }
    ]
    });
});
