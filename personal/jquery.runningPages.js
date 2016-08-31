/*
 * @file overview: focus img
 * @author YK
 * @version v1
 * @build 2016.06
 */
(function($) {
	//$.fn是指jquery的命名空间，加上fn上的方法及属性，会对jquery实例每一个有效
	$.fn.slide = function(config) {
		//默认配置参数
		var defaults = {
			isAuto: true, //是否自动轮播
			hasNext: true, //是否有下一个按钮
			hasPrev: true, //是否有上一个按钮
			activeIndex: 0, //当前展示图片索引，默认0
			speed: 300, //动画速度
			time: 3000 //间隔时间
		};
		
		var config = $.extend(defaults, config); //合并参数
		
		var that = $(this);
		var oWidth = that.width();
		var activeIndex = config.activeIndex;
		var picBox = that.find(".focus_bd");
		var btnBox;
		var picLists;
		var btnLists;
		var timer;
		//如果没有图片或者图片数量小于2张，则返回
		if (!picBox.find("li") || picBox.find("li").length < 2) {
			return;
		}
		//渲染DOM结构
		var render = function() {
			btnBox = that.find(".focus_btn");
			//添加触点
			var len = picBox.find("li").length;
			var tpl = "";
			for (var i = 1; i <= len; i++) {
				tpl += "<li>" + i + "</li>";
			}
			btnBox.html(tpl);
			btnLists = that.find(".focus_btn > li");
			btnLists.eq(config.activeIndex).addClass("on");//给当前触点添加类名
			//图片列表设置样式
			var _width = oWidth * len;
			picBox.css("width", _width);
			picLists = picBox.find("li");
			picLists.css("width", oWidth);
			//如果有上一个按钮则添加DOM结构  这个是大于号
			if(config.hasPrev){
				that.append("<a href='javascript:;' class='btn_prev'>&lt;</a>");
			}
			//如果有下一个按钮则添加DOM结构  这个是小于号
			if(config.hasNext){
				that.append("<a href='javascript:;' class='btn_next'>&gt;</a>");
			}
		};
		//滑动函数
		var move = function(index) {
			btnLists.eq(index).addClass("on").siblings().removeClass("on");
			picBox.stop().animate({
				left: -oWidth * index
			}, config.speed);
			activeIndex = index;
		};
		//开始
		var starMove = function() {
			if (activeIndex == picLists.length - 1) {
				activeIndex = 0;
			} else {
				activeIndex++;
			}
			move(activeIndex);
		};
		//自动播放
		var autoMove = function() {
			timer = setInterval(starMove, config.time);
		};
		//事件绑定
		var bindEvent = function() {
			//鼠标滑到数字上切换到对应的图片
			btnLists.mouseenter(function() {
				var that = $(this);
				activeIndex = that.index();
				move(activeIndex);
			});
			//鼠标移出轮播图区域，开始自动播放；移进轮播区域，停止自动播放
			if (config.isAuto) {
				that.mouseover(function() {
					timer = clearInterval(timer);
				}).mouseout(function() {
					timer = clearInterval(timer);
					autoMove();
				});
			}
			//如果存在上一个按钮，则点击上一个按钮切换到上一张
			if(config.hasPrev){
				that.find(".btn_prev").on("click",function(){
					var toIndex = activeIndex - 1;
					toIndex = toIndex < 0 ? picLists.length - 1 : toIndex;
					move(toIndex);
				});
			}
			//如果存在下一个按钮，则点击下一个按钮切换到下一张
			if(config.hasNext){
				that.find(".btn_next").on("click",function(){
					var toIndex = activeIndex + 1;
					toIndex = toIndex > picLists.length - 1 ? 0 : toIndex;
					move(toIndex);
				});
			}
		};
		//初始化 不需要在每一个函数后面都调用本函数
		var init = function() {
			render();
			if (config.isAuto) {
				autoMove();
			}
			bindEvent();
		};
		init();
		return this;
	}
})(jQuery);
