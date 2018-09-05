var map = new BMap.Map("allmap");
var plys = [];
var consData = {};
var city = "贵阳市"// 创建中心点坐标

var app = new Vue({
    el: '#conditions',
    data: {
        selectedArea: {name: "所在地区", value: ""},
        selectedMoney: {name: "注册资本", value: ""},
        selectedDate: {name: "注册时间", value: ""},
        selectedWork: {name: "所属行业", value: ""},
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
            {name: '0万-100万', value: "0,100"},
            {name: '100万-200万', value: "100,200"},
            {name: '200万-500万', value: "200,500"},
            {name: '500万-1000万', value: "500,1000"},
            {name: '1000万以上', value: "1000,99999999"},
        ],
        dateList: [
            {name: '全部', value: ""},
            {name: '成立1年内', value: "1"},
            {name: '成立1-5年', value: "1-5"},
            {name: '成立5-10年', value: "5-10"},
            {name: '成立10-15年', value: "10-15"},
            {name: '成立15年以上', value: "15"},
        ],
        workList: [],
        secondWorkList: []
    },
    mounted: function () {
        this.getWorkList();
    },
    methods: {
        getWorkList: function (item) {
            var vm = this;
            $.ajax({
                url: '/guiyang/static/js/workList.json',
                type: "GET",
                dataType: "json",
                success: function (data, status) {
                    var tmpData = {
                        "id": null,
                        "name": "全部",
                        "pid": 0,
                        "list": []
                    };
                    vm.workList.push(tmpData);
                    for (var i = 0; i < data.length; i++) {
                        vm.workList.push(data[i])
                    }
                }
            });
        },
        changeArea: function (item) {
            this.selectedArea = item;
            consData.district = item.value;
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
        changeWork: function (item) {
            $(".second-dropdown").hide();
            this.selectedWork = item;
            consData.industry = item.id;
            consData.industry_type = item.pid == 0 ? 1 : 2;
            updateData();
        },
        showSecondWork: function (item) {
            if (item.id) {
                this.secondWorkList = item.list;
                $(".second-dropdown").show();
            }
            else {
                $(".second-dropdown").hide();
            }

        },
        reset: function (item) {
            consData = {};
            this.selectedArea = {name: "所在地区", value: ""};
            this.selectedMoney = {name: "注册资本", value: ""};
            this.selectedDate = {name: "注册时间", value: ""};
            this.selectedWork = {name: "所属行业", value: ""};
            updateData();
        },
    }
})

function initMap() {
    /*初始化*/
    //  map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
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
        numSpan.appendChild(document.createTextNode(this._number));


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
                fillColor: "#16a085",
                fillOpacity: 0.2
            });
            plys.push(ply);
            map.addOverlay(ply);  //添加覆盖物
        }
    });
}

//更新数据
function updateData() {
    $.ajax({
        url: 'http://192.168.0.78/api/index/accountlist',
        type: "GET",
        dataType: "json",
        data: consData,
        success: function (data, status) {
            if (data && data.list) {
                if (!consData.district) {
                    map.clearOverlays();
                    map.centerAndZoom(city, 10); // 初始化地图，设置中心点坐标和地图级别
                    //更新百度地图上的覆盖物
                    for (var i = 0; i < data.list.length; i++) {
                        var point = new BMap.Point(data.list[i].lng, data.list[i].lat);
                        var mySquare = new customOverlay(point, 80, "#3D82DA", data.list[i].city, data.list[i].total);
                        map.addOverlay(mySquare);
                    }
                    addFunctionsForCO();
                }
                else {
                    map.centerAndZoom(app.selectedArea.name, 13); // 初始化地图，设置中心点坐标和地图级别
                    map.clearOverlays();
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
        for (var i = 0; i < plys.length; i++) {
            plys[i].hide();
        }
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
        updateData();
    });
}

$(function () {
    initMap();
    initMapFunctions();
    updateData();
});

