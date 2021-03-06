var map = L.map('map', {
	// crs: crs,
	// center: [29.231858, 120.105835],
	// zoom: 6
	// crs:L.CRS.CustomEPSG4326,
	center: {lon:120.33999, lat:29.231858},
	zoom:6,
	inertiaDeceleration:15000,
	maxZoom:13
});

/* 国家天地图WMTS服务 img_c/cia_c/vec_c/cva_c为EPSG4326坐标系，img_w/cia_w/vec_w/cva_w为EPSG3857坐标系   */
// 影像底图
// var img = L.tileLayer("http://t{s}.tianditu.cn/ter_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=ter&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles", {
// 	subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"]
// });
var img = L.tileLayer("http://t{s}.tianditu.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles", {
	subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"]
});
// 影像地名标注
var img_lab = L.tileLayer("http://t{s}.tianditu.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles", {
	subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"]
});
// 边界
var img_boundary = L.tileLayer("http://t{s}.tianditu.cn/ibo_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=ibo&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles", {
	subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"]
});

// 影像底图图层组
var imgLayerGroup = L.layerGroup([img,img_lab,img_boundary]);
map.addLayer(imgLayerGroup);

// 添加打印控件
var printer = L.easyPrint({
	tileLayer: imgLayerGroup,
	sizeModes: ['Current'],
	// sizeModes: ['Current', 'A4Landscape', 'A4Portrait'],
	filename: 'myMap',
	exportOnly: true,
	hideControlContainer: true
}).addTo(map);

// 添加风场图
var velocityLayer,dataSource;

function changeOpt() {
	if(dataSource!=undefined){
		map.removeLayer(velocityLayer);
		var minVelocity = $("#sliderMinValue .layui-slider-tips").text();
		var maxVelocity = $("#sliderMaxValue .layui-slider-tips").text();
		var velocityScale = $("#sliderSpeed .layui-slider-tips").text()*0.01;
		velocityLayer = L.velocityLayer({
			displayValues: true,
			displayOptions: {
				velocityType: '世界风场',
				displayPosition: 'bottomleft',
				displayEmptyString: 'No wind data'
			},
			data: dataSource,
			// OPTIONAL
			minVelocity: minVelocity,          // used to align color scale
			maxVelocity: maxVelocity,         // used to align color scale
			velocityScale: velocityScale,    // modifier for particle animations, arbitrarily defaults to 0.005
			// colorScale: []
			// var defaulColorScale = ["rgb(36,104, 180)", "rgb(60,157, 194)", "rgb(128,205,193 )", "rgb(151,218,168 )", "rgb(198,231,181)", "rgb(238,247,217)", "rgb(255,238,159)", "rgb(252,217,125)", "rgb(255,182,100)", "rgb(252,150,75)", "rgb(250,112,52)", "rgb(245,64,32)", "rgb(237,45,28)", "rgb(220,24,32)", "rgb(180,0,35)"];
		});
		velocityLayer.addTo(map);
	}
}

// var isClickOpt = false;

$("#opt-btn").click(function () {
	if($("#opt-btn").attr('isClick')=="false"){
		$(".optsDiv").css("display","block");
		$(".optsDiv").animate({bottom:"30px"},500);
		$("#opt-btn").attr('isClick',"true");
	}else {
		$(".optsDiv").animate({bottom:"0px"},500);
		$(".optsDiv").css("display","none");
		$("#opt-btn").attr('isClick',"false");
	}
});

// $("#sliderMinValue .layui-slider").change(function () {
// 	if(dataSource!=undefined){
// 		changeOpt();
// 	}
// });
//
// $("#sliderMaxValue").on({
// 	keyup : function() {
// 		if(dataSource!=undefined){
// 			changeOpt();
// 		}
// 	},
// 	slideStop:function () {
// 		if(dataSource!=undefined){
// 			changeOpt();
// 		}
// 	}
// });
//
// $("#sliderSpeed").on({
// 	keyup : function() {
// 		if(dataSource!=undefined){
// 			changeOpt();
// 		}
// 	},
// 	slideStop:function () {
// 		if(dataSource!=undefined){
// 			changeOpt();
// 		}
// 	}
// });

layui.use(['layer','upload','slider'], function(){
	var $ = layui.jquery, layer=layui.layer, upload = layui.upload,slider = layui.slider;
	layer.open({
		type: 1,
		title: ['上传可视化数据'],
		shadeClose: false,
		skin:"layui-layer-lan",
		shade: 0,
		area:['400px','300px'],
		// area:['600px','370px'],
		content:
		'<div class="layui-form" lay-filter="userDataField" id="userDataField">'+
		'<div id="shpFileUploadControl" class="layui-upload-drag">\n' +
		'<i class="layui-icon layui-icon-upload-drag"></i>\n' +
		'<p>点击或拖拽上传文件</p>\n' +
		'</div>\n' +
		'</div>'
	});

	// 设置滑块的值域范围
	slider.render({
		elem: '#sliderMinValue'
		,min: 0 //最小值
		,max: 15 //最大值
		,value:0
		,change: function(value){
			console.log(value); //动态获取滑块数值
			if(dataSource!=undefined){
				changeOpt();
			}
		}
	});
	slider.render({
		elem: '#sliderMaxValue'
		,min: 0 //最小值
		,max: 15 //最大值
		,value:8
		,change: function(value){
			console.log(value); //动态获取滑块数值
			if(dataSource!=undefined){
				changeOpt();
			}
		}
	});

	slider.render({
		elem: '#sliderSpeed'
		,min: 0 //最小值
		,max: 20 //最大值
		,value:2
		,step: 0.5
		,change: function(value){
			console.log(value); //动态获取滑块数值
			if(dataSource!=undefined){
				changeOpt();
			}
		}
	});


	// 拖拽上传
	upload.render({
		elem: '#shpFileUploadControl',
		url: './servlet/fileUploadServlet',
		auto: true,
		accept: 'file', //普通文件
		exts: 'json|geojson', //只允许上传压缩文件
		// bindAction: '#shpLoadConfirmBtn',
		done: function(res){
			console.log(res);
			var dataUrl = res.saveFilePath;
			fetch(dataUrl).then(response=>response.json())
			.then(data=>{
				dataSource = data;
				velocityLayer = L.velocityLayer({
					displayValues: true,
					displayOptions: {
						velocityType: '世界风场',
						displayPosition: 'bottomleft',
						displayEmptyString: 'No wind data'
					},
					data: dataSource,
					// OPTIONAL
					minVelocity: 0,          // used to align color scale
					maxVelocity: 8,         // used to align color scale
					velocityScale: 0.0125,    // modifier for particle animations, arbitrarily defaults to 0.005
					// colorScale: []
				});
				velocityLayer.addTo(map);
			});
			// 上传完毕后自动关闭上传窗口
			layer.close(layer.index);
		}
	});
});





