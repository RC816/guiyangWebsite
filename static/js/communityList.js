var map = new BMap.Map("allmap");
var plys = [];
var consData = {};
var city = "贵阳市"// 创建中心点坐标
var heatmapOverlay = "";
var pointCollection = "";
var currentPoint = "";


var app = new Vue({
    el: '#customTools',
    data: {
        currentZoom: 10,
        selectedShow: 3,
        selectedArea: {name: "所在地区", value: ""},
        selectedMoney: {name: "楼盘价格", value: ""},
        selectedDate: {name: "建筑时间", value: ""},
        selectedType: {name: "楼盘类别", value: ""},
        areaList: [
            {name: '全部', value: ""},
            {name: '南明区', value: "2571"},
            {name: '云岩区', value: "2572"},
            {name: '花溪区', value: "2573"},
            {name: '乌当区', value: "2574"},
            {name: '白云区', value: "2575"},
            {name: '观山湖区', value: "2576"},
            {name: '开阳县', value: "2577"},
            {name: '息烽县', value: "2578"},
            {name: '修文县', value: "2579"},
            {name: '清镇市', value: "2580"},
        ],
        moneyList: [
            {name: '全部', value: ""},
            {name: '5000千以下', value: "0,5000"},
            {name: '5000千-1万', value: "5000,10000"},
            {name: '1万-2万', value: "10000,20000"},
            {name: '2万-3万', value: "20000,30000"},
            {name: '3万以上', value: "30000,99999999"},
        ],
        dateList: [
            {name: '全部', value: ""},
            {name: '1年内', value: "1"},
            {name: '1-5年', value: "1-5"},
            {name: '5-10年', value: "5-10"},
            {name: '10-15年', value: "10-15"},
            {name: '15年以上', value: "15"},
        ],
        typeList: [
            {name: '全部', value: ""},
            {name: '普通住宅', value: "普通住宅"},
            {name: '公寓', value: "公寓"},
            {name: '商铺', value: "商铺"},
            {name: '写字楼', value: "写字楼"},
            {name: '公司企业', value: "公司企业"},
            {name: '城市综合体', value: "城市综合体"},
            {name: '其它', value: "其它"},
        ],
    },
    watch: {
        currentZoom: function (val) {
            var vm = this;
            currentPoint = new BMap.Point(map.getCenter().lng, map.getCenter().lat);
            var gc = new BMap.Geocoder();
            gc.getLocation(currentPoint, function (rs) {
                var addComp = rs.addressComponents;
                if (addComp.city != city) {
                    vm.reset();
                }
                else if (val <= 11) {
                    vm.selectedShow = 3;
                    vm.selectedArea = {name: "所在地区", value: ""};
                    consData.district = null;
                }
                else if (val > 11) {
                    if (vm.selectedShow == 3) {
                        vm.selectedShow = 1;
                    }

                    if (!consData.district) {
                        map.centerAndZoom(city + addComp.district, val);
                        for (var i = 0; i < app.areaList.length; i++) {
                            if (app.areaList[i].name == addComp.district) {
                                app.selectedArea = app.areaList[i];
                                consData.district = app.areaList[i].value;
                            }
                        }
                    }
                }
                updateData();
            });
        },
        selectedShow: function (val) {
            if (val == 1 && heatmapOverlay && pointCollection) {
                closeHeatmap();
                openPointCollection();
            }
            else if (val == 2 && heatmapOverlay && pointCollection) {
                openHeatmap();
                closePointCollection();
            }
        },
    },
    methods: {
        changeArea: function (item) {
            this.selectedArea = item;
            consData.district = item.value;
            if (!item.value) {
                map.centerAndZoom(city, 10);
            }
            else {
                map.centerAndZoom(city + item.name, 12);
            }
            updateData();
        },
        changeMoney: function (item) {
            this.selectedMoney = item;
            consData.registeredCapital = item.value;
            updateData();
        },
        changeDate: function (item) {
            this.selectedDate = item;
            consData.establishedDate = item.value;
            updateData();
        },
        changeType: function (item) {
            $(".second-dropdown").hide();
            this.selectedType = item;
            consData.propertyCategory = item.value;
            updateData();
        },
        reset: function (item) {
            consData = {};
            this.selectedArea = {name: "所在地区", value: ""};
            this.selectedMoney = {name: "楼盘价格", value: ""};
            this.selectedDate = {name: "建筑时间", value: ""};
            this.selectedType = {name: "楼盘类别", value: ""};
            map.centerAndZoom(city, 10);
            updateData();
        },
    }
})

function initMap() {
    /*初始化*/
    map.centerAndZoom(city, 10); // 初始化地图，设置中心点坐标和地图级别
    //map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    /*添加控件*/
    map.addControl(new BMap.ScaleControl()); //比例尺
    map.disableDoubleClickZoom()//禁止双击
}

//初始化自定义覆盖物的原型函数
function initMapFunctions() {
    // 继承API的BMap.Overlay
    customOverlay.prototype = new BMap.Overlay();

    // 实现初始化方法
    customOverlay.prototype.initialize = function (map) {
        // 保存map对象实例
        this._map = map;
        // 创建div元素，作为自定义覆盖物的容器
        var div = document.createElement("div");
        div.className = "note-container";
        div.style.position = "absolute";
        // 可以根据参数设置元素外观
        div.style.width = this._length + "px";
        div.style.height = this._length + "px";
        div.style.background = this._color;
        div.style.borderRadius = "100%";
        div.style.opacity = "0.8";

        var nameSpan = this._span = document.createElement("span");
        nameSpan.className = "note-name";
        div.appendChild(nameSpan);
        nameSpan.appendChild(document.createTextNode(this._location));
        var numSpan = this._span = document.createElement("span");
        numSpan.className = "note-num";
        div.appendChild(numSpan);
        numSpan.appendChild(document.createTextNode(this._number + "个"));


        // 将div添加到覆盖物容器中
        map.getPanes().markerPane.appendChild(div);
        // 保存div实例
        this._div = div;
        // 需要将div元素作为方法的返回值，当调用该覆盖物的show、
        // hide方法，或者对覆盖物进行移除时，API都将操作此元素。
        return div;
    }

    // 实现绘制方法
    customOverlay.prototype.draw = function () {
        // 根据地理坐标转换为像素坐标，并设置给容器
        var position = this._map.pointToOverlayPixel(this._center);
        this._div.style.left = position.x - this._length / 2 + "px";
        this._div.style.top = position.y - this._length / 2 + "px";
    }

    // 添加自定义方法
    customOverlay.prototype.toggle = function () {
        if (this._div) {
            if (this._div.style.display == "") {
                this.hide();
            }
            else {
                this.show();
            }
        }
    }

    map.addEventListener("zoomend", function () {
            app.currentZoom = this.getZoom();
        }
    );
}

// 定义自定义覆盖物的构造函数
function customOverlay(center, length, color, location, number) {
    this._center = center;
    this._length = length;
    this._color = color;
    this._location = location;
    this._number = number;
}

//绘画边界，行政区块
function drawBoundaries(name) {
    if (name == "贵阳市观山湖区")
        return false;
    var bdary = new BMap.Boundary();
    bdary.get(name, function (rs) {
        var count = rs.boundaries.length;
        //建立多边形覆盖物
        for (var i = 0; i < count; i++) {
            var ply = new BMap.Polygon(rs.boundaries[i], {
                strokeWeight: 2,
                strokeOpacity: 0.8,
                StrokeStyle: "solid",
                strokeColor: "#1abc9c",
                fillColor: "red",
                fillOpacity: 0.2
            });
            plys.push(ply);
            map.addOverlay(ply);  //添加覆盖物
        }
    });
}

//是否显示行政区块
function openBoundaries() {
    for (var i = 0; i < plys.length; i++) {
        plys[i].show();
    }
}

function closeBoundaries() {
    for (var i = 0; i < plys.length; i++) {
        plys[i].hide();
    }
}

//绘聚合点
function drawMarkerClusterer() {
    var markers = [];
    var pt = null;
    for (var i = 0; i < dataList.length; i++) {
        pt = new BMap.Point(dataList[i].Longitude, dataList[i].Latitude);
        markers.push(new BMap.Marker(pt));
    }
    var markerClusterer = new BMapLib.MarkerClusterer(map, {markers: markers});
}

//绘海量点
function drawPointCollection(points) {
    if (document.createElement('canvas').getContext) {  // 判断当前浏览器是否支持绘制海量点
        var options = {
            size: BMAP_POINT_SIZE_SMALL,
            shape: BMAP_POINT_SHAPE_STAR,
            color: '#d340c3'
        }
        pointCollection = new BMap.PointCollection(points, options);  // 初始化PointCollection
        map.addOverlay(pointCollection);  // 添加Overlay
        pointCollection.show()
        pointCollection.hide()
    } else {
        alert('请在chrome、safari、IE8+以上浏览器查看本示例');
    }
}

//是否显示海量图
function openPointCollection() {
    pointCollection.show();
}

function closePointCollection() {
    pointCollection.hide();
}

//绘热力图
function drawHeatmap(points) {
    heatmapOverlay = new BMapLib.HeatmapOverlay({"radius": 20});
    map.addOverlay(heatmapOverlay);
    heatmapOverlay.setDataSet({data: points, max: 14});
}

//是否显示热力图
function openHeatmap() {
    heatmapOverlay.show();
}

function closeHeatmap() {
    heatmapOverlay.hide();
}

//更新数据
function updateData() {
    $.ajax({
        url: 'http://192.168.0.161/api/index/propertylist',
        type: "GET",
        dataType: "json",
        data: consData,
        success: function (data, status) {
            if (data && data.list) {
                map.clearOverlays();
                if (!consData.district) {
                    //更新百度地图上的覆盖物
                    for (var i = 0; i < data.list.length; i++) {
                        var point = new BMap.Point(data.list[i].lng, data.list[i].lat);
                        var mySquare = new customOverlay(point, 80, "#3D82DA", data.list[i].city, data.list[i].total);
                        map.addOverlay(mySquare);
                    }
                    addFunctionsForCO();
                }
                else {
                    var dataList = data.list[0].list;
                    var points = [];  // 添加海量点数据
                    for (var i = 0; i < dataList.length; i++) {
                        points.push(new BMap.Point(dataList[i].Longitude, dataList[i].Latitude));
                    }
                    drawPointCollection(points);
                    drawHeatmap(points);
                    if (app.selectedShow == 1) {
                        closeHeatmap();
                        openPointCollection();
                    }
                    else if (app.selectedShow == 2) {
                        openHeatmap();
                        closePointCollection();
                    }
                }
            }
        }
    });
}

//给覆盖物加方法
function addFunctionsForCO() {
    $(".note-container").bind("mouseenter", function () {
        $(this).addClass("hover-container");
        drawBoundaries("贵阳市" + $(this).find(".note-name").text());
    });

    $(".note-container").bind("mouseleave", function () {
        $(this).removeClass("hover-container");
        closeBoundaries();
    });

    $(".note-container").bind("click", function () {
        var cityName = $(this).find(".note-name").text();
        for (var i = 0; i < app.areaList.length; i++) {
            if (app.areaList[i].name == cityName) {
                app.selectedArea = app.areaList[i];
                if (app.areaList[i].value)
                    consData.district = app.areaList[i].value;
            }
        }
        map.centerAndZoom(city + cityName, 12);
        updateData();
    });
}

$(function () {
    initMap();
    initMapFunctions();
    updateData();
});

