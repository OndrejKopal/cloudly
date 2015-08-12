/**
 * Set chart base options by type
 */
var chartOptions = {
    cpu_usage: {
        chart: {
            renderTo: ''
        },
        title: {
            text: 'CPU Utilisation'
        },
        subtitle: {
            text: 'Percentage of CPU usage across all cores'
        },
        xAxis: {
            type: 'datetime',
            labels: {
                formatter: function() {
                    return Highcharts.dateFormat('%H:%M:%S', this.value * 1000);    // chart need value in milisecond
                }
            }
        },
        yAxis: {
            title: {
                text: 'CPU Usage value %'
            }
        },
        tooltip: {
            formatter: function () {
                return '<strong>' + Highcharts.numberFormat(this.y, 2,'.',',')
                    + ' in average</strong> (' + this.series.name + ')<br/>'
                    + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x*1000);
            }
        },
        legend: {
            enabled: false
        },
        series: [{
            name: 'Average',
            data: []
        }]
    },
    inbound_traffic: {
        chart: {
            renderTo: ''
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        legend: {
            enabled: false
        },
        xAxis: {
            type: 'datetime',
            labels: {
                formatter: function() {
                    return Highcharts.dateFormat('%H:%M:%S', this.value * 1000);    // chart need value in milisecond
                }
            }
        },
        yAxis: {
            title: {
                text: 'Inbound'
            },
            min: 0
        },
        tooltip: {
            formatter: function () {
                return '<strong>' + Highcharts.numberFormat(this.y/1024, 0, '.', ',') + ' KB/s '
                    + 'input traffic</strong><br/>'
                    + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x*1000);
            }
        },
        series: [
            {
                name: 'Inbound Traffic',
                data: []
            }
        ]
    },
    outbound_traffic: {
        chart: {
            renderTo: ''
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        legend: {
            enabled: false
        },
        xAxis: {
            type: 'datetime',
            labels: {
                formatter: function() {
                    return Highcharts.dateFormat('%H:%M:%S', this.value * 1000);    // chart need value in milisecond
                }
            }
        },
        yAxis: {
            title: {
                text: 'Outbound'
            }
        },
        tooltip: {
            formatter: function () {
                return '<strong>' + Highcharts.numberFormat(this.y/1024, 0, '.', ',') + ' KB/s '
                    + 'output traffic</strong><br/>'
                    + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x*1000);
            }
        },
        series: [
            {
                name: 'Outbound Traffic',
                data: []
            }
        ]
    },
    disks: {
        chart: {
            renderTo: '',
        },
        title: {
            text: ''
        },
        legend: {
            enabled: false
        },
        xAxis: {
            type: 'datetime',
            labels: {
                formatter: function() {
                    return Highcharts.dateFormat('%H:%M:%S', this.value * 1000);    // chart need value in milisecond
                }
            }
        },
        yAxis: {
            title: {
                text: 'Disk usage'
            },
            labels: {
                formatter: function () {
                   return Highcharts.numberFormat((this.value / 1024 / 1000), 0, '.', ',') + ' MB';
                }
            }
        },
        tooltip: {
            formatter: function () {
                return '<strong>' + Highcharts.numberFormat((this.y/1024/1000), 0, '.', ',') + ' MB '
                    + 'used</strong><br/>'
                    + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x*1000);
            }
        },
        series: [{
            name: 'Disks',
            data: []
        }]
    }
}
