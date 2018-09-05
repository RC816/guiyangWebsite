var areaList = ['南明区', '云岩区', '花溪区', '乌当区', '白云区', '观山湖区', '开阳县', '息烽县', '修文县', '清镇市'];
var industryList = ['电力、热力、燃气及水生产和供应业', '建筑业', '批发和零售业', '交通运输、仓储和邮政业', '农、林、牧、渔业', '采矿业'
    , '制造业', '租赁和商务服务业', '科学研究和技术服务业', '水利、环境和公共设施管理业', '居民服务、修理和其他服务业', '住宿和餐饮业',
    '信息传输、软件和信息技术服务业', '金融业', '房地产业', '国际组织', '卫生和社会工作', '教育', '公共管理、社会保障和社会组织', '文化、体育和娱乐业'];
var selectIndustryList = {
    '电力、热力、燃气及水生产和供应业': true,
    '建筑业': true,
    '批发和零售业': true,
    '交通运输、仓储和邮政业': true,
    '农、林、牧、渔业': true,
    '采矿业': false,
    '制造业': false,
    '租赁和商务服务业': false,
    '科学研究和技术服务业': false,
    '水利、环境和公共设施管理业': false,
    '居民服务、修理和其他服务业': false,
    '住宿和餐饮业': false,
    '信息传输、软件和信息技术服务业': false,
    '金融业': false,
    '房地产业': false,
    '国际组织': false,
    '卫生和社会工作': false,
    '教育': false,
    '公共管理、社会保障和社会组织': false,
    '文化、体育和娱乐业': false
};
var typeList = ['有限责任公司', '股份有限公司', '集体所有制', '国有企业', '个人独资企业', '有限合伙', '普通合伙', '外商投资企业', '港、澳、台', '联营企业', '私营企业'];
var selectTypeList = {
    '有限责任公司': true,
    '股份有限公司': true,
    '集体所有制': true,
    '国有企业': true,
    '个人独资企业': true,
    '有限合伙': false,
    '普通合伙': false,
    '外商投资企业': false,
    '港、澳、台': false,
    '联营企业': false,
    '私营企业': false,
};
var city = "贵阳市";

//近5年新注册企业
var lc1 = echarts.init(document.getElementById('leftChart1'));
var lc1Option = {
    title: {
        text: '近5年新注册企业',
        x: 'center',
        textStyle: {
            color: "#ffffff"
        },
        padding: [15, 0, 0, 0]
    },
    tooltip: {
        trigger: 'axis',
        formatter: function (params) {
            return params[0].seriesName + ": " + params[0].value;
        },
    },
    grid: {
        left: '3%',
        right: '3%',
        bottom: '10%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        splitLine: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: "#ffffff",
                width: "1"
            }
        },
        data: ['2014', '2015', '2016', '2017', '2018']
    },
    yAxis: {
        type: 'value',
        splitLine: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: "#ffffff",
                width: "1"
            }
        },
    },
    series: [
        {
            name: '企业数',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210],
            itemStyle: {
                normal: {
                    lineStyle: {
                        color: '#e0a734'
                    }
                }
            },
        }
    ]
};
lc1.setOption(lc1Option);

//近5年关闭企业
var lc2 = echarts.init(document.getElementById('leftChart2'));
var lc2Option = {
    title: {
        text: '近5年关闭企业',
        x: 'center',
        textStyle: {
            color: "#ffffff"
        },
        padding: [15, 0, 0, 0]
    },
    tooltip: {
        trigger: 'axis',
        formatter: function (params) {
            return params[0].seriesName + ": " + params[0].value;
        },
    },
    grid: {
        left: '3%',
        right: '3%',
        bottom: '10%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        splitLine: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: "#ffffff",
                width: "1"
            }
        },
        data: ['2014', '2015', '2016', '2017', '2018']
    },
    yAxis: {
        type: 'value',
        splitLine: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: "#ffffff",
                width: "1"
            }
        },
    },
    series: [
        {
            name: '企业数',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210],
            itemStyle: {
                normal: {
                    lineStyle: {
                        color: '#e04c8f'
                    }
                }
            },
        }
    ]
};
lc2.setOption(lc2Option);

//近5年增长最快的行业Top10
var lc3 = echarts.init(document.getElementById('leftChart3'));
var lc3Option = {
    title: {
        text: '近5年增长最快的行业Top10',
        x: 'center',
        textStyle: {
            color: "#ffffff",
            fontSize: '14'
        },
        padding: [15, 0, 0, 0]
    },
    tooltip: {
        trigger: 'axis',
    },

    grid: {
        left: '3%',
        right: '3%',
        bottom: '10%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        splitLine: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: "#ffffff",
                width: "1"
            }
        },
        data: ['2014', '2015', '2016', '2017', '2018']
    },
    yAxis: {
        type: 'value',
        splitLine: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: "#ffffff",
                width: "1"
            }
        },
    },
    series: [
        {
            name: '行业1',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
            name: '行业2',
            type: 'line',
            stack: '总量',
            data: [220, 112, 112, 144, 55, 25, 21],
        },
        {
            name: '行业3',
            type: 'line',
            stack: '总量',
            data: [20, 123, 213, 21, 123, 123, 245],
        },
        {
            name: '行业4',
            type: 'line',
            stack: '总量',
            data: [67, 678, 456, 3, 123, 235, 214],
        },
        {
            name: '行业5',
            type: 'line',
            stack: '总量',
            data: [223, 123, 456, 667, 345, 325, 123],
        },
        {
            name: '行业6',
            type: 'line',
            stack: '总量',
            data: [3, 435, 454, 546, 435, 425, 221],
        },
        {
            name: '行业7',
            type: 'line',
            stack: '总量',
            data: [220, 112, 112, 144, 55, 25, 21],
        },
        {
            name: '行业8',
            type: 'line',
            stack: '总量',
            data: [220, 112, 112, 144, 55, 25, 21],
        },
        {
            name: '行业9',
            type: 'line',
            stack: '总量',
            data: [220, 112, 112, 144, 55, 25, 21],
        },
        {
            name: '行业10',
            type: 'line',
            stack: '总量',
            data: [220, 112, 112, 144, 55, 25, 21],
        },
    ]
};
lc3.setOption(lc3Option);

//企业分布-按地区
var rc1 = echarts.init(document.getElementById('rightChart1'));
var rc1Option = {
    title: {
        text: '企业分布-按地区',
        x: 'center',
        textStyle: {
            color: "#ffffff",
        },
        padding: [15, 0, 0, 0]
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    xAxis: {
        axisTick: {show: false},
        data: areaList,
        axisLabel: {
            interval: 0,
            rotate: 45,
            fontSize: 10,
        },
        axisLine: {
            lineStyle: {
                color: "#ffffff",
                width: "1"
            }
        },
        type: 'category',
    },
    yAxis: {
        type: 'value',
        axisLine: {
            lineStyle: {
                color: "#ffffff",
                width: "1"
            }
        },
    },
    series: [{
        name: '企业',
        type: 'bar',
        barGap: 0,
        itemStyle: {
            normal: {
                color: '#1ec9d8'
            }
        },
        data: [320, 332, 301, 334, 390, 232, 301, 324, 20, 123]
    }]
};
rc1.setOption(rc1Option);

//企业分布-按行业
var rc2 = echarts.init(document.getElementById('rightChart2'));
var rc2Option = {
    title: {
        text: '企业分布-按行业',
        x: 'center',
        textStyle: {
            color: "#ffffff",
        },
        padding: [15, 0, 0, 0]
    },
    color: ['#dd6b66', '#759aa0', '#e69d87', '#8dc1a9', '#ea7e53', '#eedd78', '#73a373', '#73b9bc', '#7289ab', '#91ca8c', '#f49f42'],
    tooltip: {
        trigger: 'item',
        textStyle: {
            color: '#ffffff'
        },
    },
    legend: {
        textStyle: {
            color: '#ffffff',
            fontSize: 11
        },
        pageIconColor: {
            color: '#ffffff'
        },
        pageTextStyle: {
            color: '#ffffff'
        },
        type: 'scroll',
        top: 40,
        orient: 'vertical',
        x: 'left',
        data: industryList,
        selected: selectIndustryList
    },
    series: [{
        name: '企业',
        type: 'pie',
        radius: '55%',
        center: ['70%', '60%'],
        data: [
            {value: 10, name: '电力、热力、燃气及水生产和供应业'},
            {value: 5, name: '建筑业'},
            {value: 15, name: '批发和零售业'},
            {value: 25, name: '交通运输、仓储和邮政业'},
            {value: 20, name: '农、林、牧、渔业'},
            {value: 35, name: '采矿业'},
            {value: 30, name: '制造业'},
            {value: 40, name: '租赁和商务服务业'},
            {value: 42, name: '科学研究和技术服务业'},
            {value: 22, name: '水利、环境和公共设施管理业'},
            {value: 22, name: '居民服务、修理和其他服务业'},
            {value: 10, name: '住宿和餐饮业'},
            {value: 5, name: '信息传输、软件和信息技术服务业'},
            {value: 15, name: '金融业'},
            {value: 25, name: '房地产业'},
            {value: 20, name: '国际组织'},
            {value: 35, name: '卫生和社会工作'},
            {value: 30, name: '教育'},
            {value: 40, name: '公共管理、社会保障和社会组织'},
            {value: 42, name: '文化、体育和娱乐业'},
        ],
        itemStyle: {
            normal: {
                label: {
                    show: false   //隐藏标示文字
                },
            },
        }
    }]
};
rc2.setOption(rc2Option);

//企业分布-按所有制
var rc3 = echarts.init(document.getElementById('rightChart3'));
var rc3Option = {
    title: {
        text: '企业分布-按所有制',
        x: 'center',
        textStyle: {
            color: "#ffffff",
        },
        padding: [15, 0, 0, 0]
    },
    color: ['#dd6b66', '#759aa0', '#e69d87', '#8dc1a9', '#ea7e53', '#eedd78', '#73a373', '#73b9bc', '#7289ab', '#91ca8c', '#f49f42'],
    tooltip: {
        trigger: 'item',
        textStyle: {
            color: '#ffffff'
        },
    },
    legend: {
        textStyle: {
            color: '#ffffff'
        },
        pageIconColor: {
            color: '#ffffff'
        },
        pageTextStyle: {
            color: '#ffffff'
        },
        type: 'scroll',
        top: 40,
        orient: 'vertical',
        x: 'left',
        data: typeList,
        selected: selectTypeList
    },
    series: [{
        name: '企业',
        type: 'pie',
        radius: '55%',
        center: ['70%', '60%'],
        data: [
            {value: 10, name: '有限责任公司'},
            {value: 5, name: '股份有限公司'},
            {value: 15, name: '集体所有制'},
            {value: 25, name: '国有企业'},
            {value: 20, name: '个人独资企业'},
            {value: 35, name: '有限合伙'},
            {value: 30, name: '普通合伙'},
            {value: 40, name: '外商投资企业'},
            {value: 42, name: '港、澳、台'},
            {value: 22, name: '联营企业'},
            {value: 22, name: '私营企业'}
        ],
        itemStyle: {
            normal: {
                label: {
                    show: false   //隐藏标示文字
                },
            },
        },
    }]
};
rc3.setOption(rc3Option);

//地图
var myStyle = {
    styleJson: [
        {
            "featureType": "land",
            "elementType": "all",
            "stylers": {
                "color": "#0b2c60ff"
            }
        },
        {
            "featureType": "highway",
            "elementType": "all",
            "stylers": {
                "color": "#e0a734ff"
            }
        },
        {
            "featureType": "arterial",
            "elementType": "all",
            "stylers": {
                "color": "#e0a734ff"
            }
        },
        {
            "featureType": "local",
            "elementType": "all",
            "stylers": {
                "color": "#e0a734ff"
            }
        }
    ]
};

var mapChart = echarts.init(document.getElementById("map"));
mapOption = {
    // 加载 bmap 组件
    bmap: {
        // 百度地图中心经纬度
        center: [106.63658, 26.753324],
        // 百度地图缩放
        zoom: 9,
        // 是否开启拖拽缩放，可以只设置 'scale' 或者 'move'
        roam: true,
        // 百度地图的自定义样式，见 http://developer.baidu.com/map/jsdevelop-11.htm
        mapStyle: myStyle
    },
};
mapChart.setOption(mapOption);
var bmap = mapChart.getModel().getComponent('bmap').getBMap();
var heatmapOverlay = "";

//绘画边界，行政区块
function drawBoundaries(name) {
    var bdary = new BMap.Boundary();
    bdary.get(name, function (rs) {
        var count = rs.boundaries.length;
        //建立多边形覆盖物
        for (var i = 0; i < count; i++) {
            var ply = new BMap.Polygon(rs.boundaries[i], {
                strokeWeight: 2,
                strokeOpacity: 0.8,
                StrokeStyle: "solid",
                strokeColor: "#f47213",
                fillColor: "none",
                fillOpacity: 0
            });
            bmap.addOverlay(ply);  //添加覆盖物
        }
    });
}

//绘热力图
function drawHeatmap(points) {
    heatmapOverlay = new BMapLib.HeatmapOverlay({
        "radius": 20,
        "gradient":
            {
                .2: 'rgb(163,82,221)',
                .5: 'rgb(224,76,143)',
                .8: 'rgb(200,29,106)'
            }
    });
    bmap.addOverlay(heatmapOverlay);
    heatmapOverlay.setDataSet({data: points, max: 50});
}

//更新数据
function updateData() {
    $.ajax({
        url: 'http://192.168.0.132/api/index/propertylist',
        type: "GET",
        dataType: "json",
        success: function (data, status) {
            if (data && data.list) {
                var points = [];  // 添加海量点数据
                for (var j = 0; j < data.list.length; j++) {
                    var dataList = data.list[j].list;
                    for (var i = 0; i < dataList.length; i++) {
                        points.push(new BMap.Point(dataList[i].Longitude, dataList[i].Latitude));
                    }
                }
                drawHeatmap(points);
            }
        }
    });
}

drawBoundaries(city);
updateData();








