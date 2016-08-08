(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // name has changed in Webkit
                                      window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());
$(function(){
	String.format=function(){var h=arguments,j=h.length;if(j==0){return""}if(j==1){return h[0]}var k=/{(\d+)?}/g,g,l;if(h[1] instanceof Array){g=h[1];l=h[0].replace(k,function(a,b){return g[parseInt(b)]})}else{g=h;l=h[0].replace(k,function(a,b){return g[parseInt(b)+1]})}return l};
	
	var mySwiper = null;
	var myScrollIndex = null;
	var myScroll = null;
	function initSwiper(){
		mySwiper = new Swiper('.swiper-container',{
			speed: 1000,
			loop:true,
			autoplay: 2000,
			autoplayDisableOnInteraction: false,
			prevButton:'.swiper-button-prev',
			nextButton:'.swiper-button-next'
		})
	}
	function initScroll( sClass ){
		myScroll = new IScroll(sClass,{
            vScroll: true,
            bounce: true,
            checkDOMChanges: true,
            resizeScrollbars: true,
            click: true
        });
	}

	function preloadimages(obj, complete_cb, progress_cb) {
        var loaded = 0;
        var toload = 0;
        var images = obj instanceof Array ? [] : {};
        toload = obj.length;
        for (var i = 0; i < obj.length; i++) {
            images[i] = new Image();
            images[i].src = obj[i];
            images[i].onload = load;
            images[i].onerror = load;
            images[i].onabort = load;
        }
        if (obj.length == 0) {
            complete_cb(images);
        }

        function load() {
            ++loaded;
            if (progress_cb) {
                progress_cb(loaded / toload);
            }
            if (loaded >= toload) {
                complete_cb(images);
            }
        }
    }

	var preloadImageList = [
		'1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','371_1453779101.png','912_1453779104.png',
		'1093_1453854255.png','1536_1453779105.png','2062_1453779100.png','2115_1453779103.png',
		'2214_1453779105.png','2407_1453779106.png','2488_1453779103.png','2740_1453779102.png',
		'3046_1453779101.png','3375_1453854403.png','4169_1453779106.png','4505_1453779105.png',
		'4536_1453779106.png','4575_1453779105.png','4814_1453854252.png','5844_1453779104.png',
		'5865_1453779098.png','6240_1453779101.png','6253_1453779102.png','7030_1453856838.png',
		'7705_1453779100.png','8268_1453779103.png','8279_1453779085.png','8696_1453854253.png',
		'9228_1453779104.png','commen_close.png','layer_info_checked.png','layer_info_select.jpg',
		'layer_info_submit.png','layer_prize.png','layer_prize_none.png','layer_select_bg.png',
		'page1_btn_next.png','page1_btn_pic.png','page1_btn_pic_active.png','page1_btn_prev.png',
		'page1_btn_share.png','page1_btn_video.png','page1_btn_video_active.png','page1_k4.png',
		'page1_main_bg.jpg','page1_nav_active.png','page1_tab_bg.jpg','page1_top_bg.jpg',
		'page1_video_poster.png','page2_bg.jpg','page2_btn_intro.png','page2_btn_start.png'	,
		'page3_bg.jpg',	'page3_btn_start.png','page3_choosed_bg.png','page5_bg.jpg','share.jpg',
		'loading_bg.jpg','loading_clock.png','loading_pointer.png'
	];
	for(var i= 1;i<=235;i++){
		preloadImageList.push('video/che_'+i+'.jpg');
	}
    for (var i = 0; i < preloadImageList.length; i++) {
        preloadImageList[i] = 'images/' + preloadImageList[i];
    }

    var loadingDeg = -140;

    preloadimages(preloadImageList, function () {
    	$("#loading").hide();
    	$("#page1").show();
		initScroll( '.scrollWrapperIndex' );
    }, function (progress) {
    	progress = parseInt( progress*100);
    	var baseDeg = 1.9;
    	loadingDeg += (baseDeg*(progress/100));
    	$("#loading .pointer").css('-webkit-transform','rotate('+loadingDeg+'deg)');
    	$("#loading .percent").text(''+progress+'%');
    });

	function isApp() {
        var ua = navigator.userAgent;
        if (ua.indexOf('Mtime_iPhone_Showtime') >= 0 || ua.indexOf('Mtime_Android_Showtime') >= 0) {
            return true;
        }
        return false;
    }

	if( isApp() ){
		$("#page1 .share_btn").show();
	}

	$("#page1 .share_btn").click(function(){
		var href = String.format('http://m.mtime.cn/?title={0}&url={1}&summary={2}&pic={3}#!/share/',
						encodeURIComponent('悦达起亚K4邀你看电影'),
						encodeURIComponent('http://Mtime-k4.dev.izhida.cn'),
						// todo change link above;
						encodeURIComponent('这是赌王送你的筹码，快来试试手气吧'),
						encodeURIComponent('http://Mtime-k4.dev.izhida.cn/Public/static/images/share.jpg'));
			window.location.href= href;
	})

	$('.to_video').click(function(){
		myScroll.scrollTo(0,-27*window.base);
	});
	$('.tab_nav_pic').click(function(){
		$('.tab_nav_video').removeClass().addClass('tab_nav_video'); 
		$(this).removeClass().addClass('tab_nav_pic active');
		$('.tab_con_video').hide();
		$('.tab_con_pic').show();
		document.getElementById('video_mp4').pause();
		$(".video_poster").show();
		initSwiper();
	});
	$('.tab_nav_video').click(function(){
		$('.tab_nav_pic').removeClass().addClass('tab_nav_pic');
		$(this).removeClass().addClass('tab_nav_video active');
		$('.tab_con_video').show();
		$('.tab_con_pic').hide();
		if( mySwiper ){
			mySwiper.destroy(true,false);
		}
	});

	$(".video_poster").click(function(){
		document.getElementById('video_mp4').play();
		$(this).hide();
	})
	document.getElementById('video_mp4').onended = function(){
		play = false;
		$(".video_poster").show();
	}

	$('.js_detail').click(function(){
		$('#layer_detail').show();
		document.getElementById('video_mp4').pause();
		$(".video_poster").show();
		initScroll('.scrollWrap1');
	});

	$('.js_list').click(function(){
		// $.post('', {}, function(resp) {
			resp ={data:[{name:'xxx',tel:'18833336666'}]} 
			if(resp.errcode != 0){
				my_notify('网络异常，请稍后重试');
				return;
			}else{
				for( var i =0;i<resp.data.length;i++ ){
					var sLi = '<li class="clearfix"><span class="name fl">'+resp.data[i].name+'</span><span class="tel fl">'+resp.data[i].tel+'</span><span class="prize fl">获得观影票2张</span></li>';
					$('#layer_list .scroller ul').append(sLi);
				}
			}
		// });
		$('#layer_list').show();
		document.getElementById('video_mp4').pause();
		$(".video_poster").show();
		initScroll('.scrollWrap2');
	});

	$('.js_toLayerInfo').click(function(){
		$("#layer_info").show();
		document.getElementById('video_mp4').pause();
		$(".video_poster").show();
	})

	$('.js_close_this').click(function(){
		if( $(this).closest('.layer').hasClass('prize') ){
			// window.location.href = location.origin;
			window.location.href = '';
		}else{
			$(this).closest('.layer').hide();
		}
		
		if(myScroll){
			myScroll.destroy();
			myScroll = null;
		}
		initScroll( '.scrollWrapperIndex' );
		$(".indicator").css({ 
			'-webkit-transform':'rotate(3deg)',
			'-webkit-transition':'none'
		});
	});
	
	$('input[type=radio]').click(function(){
		$('input[type=radio]').removeClass();
		$(this).addClass('checked');
	});

	$('.js_close_info').click(function(){
		$(this).closest('.layer').hide();
	})
	// ====================================
	$("#layer_info .js_submit").click(function(){
		var yuyue = true;
		var name = $('input[name=name]').val();
		var tel = $('input[name=tel]').val();
		var province = $('#province').val();
		var city = $("#city").val();
		var agency = $('#agency').val();
		var model = $("#model").val();
		var time = $("#time").val();
		var data;
		if($('.checked').val()=='yes'){
			yuyue = true;
			if(!( yuyue && name && tel && province && city && agency && model )){
				my_notify('请填写完整信息');
				return;
			}
			if(!tel.match(/^1\d{10}$/)){
				my_notify('请输入正确的手机号码');
				return;
			}
			data = {
				name: name,
                tel: tel,
                province: province,
                city: city,
                agency: agency,
                model: model,
                time: time
			};
			// TODO
			// $.post('', data, function(resp) {
				resp = { errcode:0 }
				if(  resp.errcode === 0 ){
				// success
					my_notify('信息提交成功');
					setTimeout(function(){
						$('#layer_info,#page1').hide();
						$('#page2').show();
					},1300);
				}else{
					// fail
					my_notify('网络异常，请稍后重试');
				}
			// });
		}else{
			yuyue = false;
			data = {name: name, tel: tel};
			if(!(  name && tel  )){
				my_notify('请填写完整信息');
				return;
			}
			if(!tel.match(/^1\d{10}$/)){
				my_notify('请输入正确的手机号码');
				return;
			}
			// TODO
			// $.post('', data, function(resp) {
				resp = { errcode:0 }
				if(  resp.errcode === 0 ){
				// success
					my_notify('信息提交成功');
					setTimeout(function(){
						$('#layer_info,#page1').hide();
						$('#page2').show();
					},1300);
				}else{
					// fail
					my_notify('网络异常，请稍后重试');
				}
			// });
		}
	})
	// ====================================
	$("#page2 .btn_intro").click(function(){
		$(this).closest('.page').hide();
		$("#page3").show();
	})

	// page3 show details
	// $('#page3 .choice_up').click(function(){
	// 	$('#page3 .choice').removeClass('choosed')
	// 	$(this).addClass('choosed');
	// 	$('#page3 .details').hide();
	// 	$("#page3 .details_up").show();
	// });
	// $('#page3 .choice_shift').click(function(){
	// 	$('#page3 .choice').removeClass('choosed')
	// 	$(this).addClass('choosed');
	// 	$('#page3 .details').hide();
	// 	$("#page3 .details_shift").show();
	// });
	// $('#page3 .choice_airbags').click(function(){
	// 	$('#page3 .choice').removeClass('choosed')
	// 	$(this).addClass('choosed');
	// 	$('#page3 .details').hide();
	// 	$("#page3 .details_airbags").show();
	// });
	// $('#page3 .choice_motor').click(function(){
	// 	$('#page3 .choice').removeClass('choosed')
	// 	$(this).addClass('choosed');
	// 	$('#page3 .details').hide();
	// 	$("#page3 .details_motor").show();
	// });

	$('.choice').each(function(index,val){
		$(val).click(function(){
			//改变按钮的样式
			//显示相应的内容，隐藏其他
			$('.choice').removeClass('choosed');
			$(this).addClass('choosed');
			$('.details').hide();
			$('.details').eq(index).show();
		})
	})

	$("#page3 .btn_start,#page2 .btn_start").click(function(){
		$(this).closest('.page').hide();
		$("#page4").show();
		setTimeout(function(){
			$("#page4 .mask,#page4 .tip").hide();
		},1200);
	});
	
	// 长按播放视频
	var activeIndex = 0;
	var timer = null;
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	var img = new Image();
	var requestId = null;
	img.onload = function(){
		ctx.drawImage(img,0,0,window.canvasWidth,window.canvasHeight);
	}
	img.src = 'images/video/che_1.jpg';
	var imageMap = {};
	var imageSrcList = [];
    for (var i = 1; i <= 235; i++) {
        var tmp = new Image();
        imageSrcList[i] = tmp;
        tmp.src = 'images/video/che_'+i+'.jpg';
        // imageMap[imageList[i]].src = imageList[i];
    }

    var last = 0;
	function videoPlay(){
		requestId = requestAnimationFrame(videoPlay);
		var now = (new Date()).getTime();
		if (now - last < 1000/16) {
			console.log(1);
			return;
		}
		last = now;
		activeIndex++;
		if(activeIndex>235){
			cancelAnimationFrame(requestId);
			return;
		}
		ctx.drawImage(imageSrcList[activeIndex], 0, 0, window.canvasWidth, window.canvasHeight);
		// img.onload = function(){
			// ctx.drawImage(img,0,0,window.canvasWidth,window.canvasHeight);
		// }
		// img.src = './images/video/che_'+activeIndex+'.jpg';
	}
	canvas.addEventListener('touchstart',function(e){
		if(activeIndex>=235){
			return;
		}
		console.log(1);
		videoPlay();
		e.preventDefault();
	},false);
	canvas.addEventListener('touchend',function(){
		console.log(1);
		cancelAnimationFrame(requestId);
		if(activeIndex>=235){
			$("#page4").hide();
			$('#page5').show();
		}
	},false);

	// 轮盘test
	var times = 0;
	var baseDeg = 360/37;
	var tempDeg = 3;
	
	$('.js_bet').click(function(){
		var bet_point = $('select').val();
		if( bet_point == '' ){
			my_notify('请先选择点数');
			return;
		}
		// $.post('', {bet_point: bet_point}, function(resp) {
			resp = {
				errcode : 0,
				data:{
					prize: 1
				}
			}
			if(resp.errcode != 0){
				my_notify('网络异常，请稍后重试');
				return;
			}
			if(resp.data.prize == null){
				var degArray = [
					35,18,10,16,31,22,
					6,28,2,30,26,8,
					24,0,14,33,20,4,
					15,36,17,3,29,32,
					19,11,23,7,5,27,
					1,13,34,21,9,25
				];
				// prize none
				degArray.splice(parseInt(bet_point),6);
				var randNum = parseInt(Math.random()*30);
				var destiDeg = 1080 + degArray[randNum]*baseDeg + tempDeg;
				// tempDeg = destiDeg;
				$('.indicator').css({
					'-webkit-transform': 'rotate('+destiDeg+'deg)',
					'-webkit-transition': '6s ease-in-out'
				})
				setTimeout(function(){
					$('#layer_prize_none').show();
				},6300)
			}else{
			// prize
				var degArray = [
					35,18,10,16,31,22,
					6,28,2,30,26,8,
					24,0,14,33,20,4,
					15,36,17,3,29,32,
					19,11,23,7,5,27,
					1,13,34,21,9,25
				];
				degArray = degArray.splice(parseInt(bet_point),6);
				var randNum = parseInt(Math.random()*6);
				var destiDeg = 1080 + degArray[randNum]*baseDeg + tempDeg;
				// tempDeg = destiDeg;
				$('.indicator').css({
					'-webkit-transform': 'rotate('+destiDeg+'deg)',
					'-webkit-transition': '6s ease-in-out'
				});
				setTimeout(function(){
					$('#layer_prize').show();
				},6300);
			}
		// });
	});

	$(".layer .js_share").click(function(){
		if( isApp() ){
			var href = String.format('http://m.mtime.cn/?title={0}&url={1}&summary={2}&pic={3}#!/share/',
						encodeURIComponent('悦达起亚K4邀你看电影'),
						encodeURIComponent('http://Mtime-k4.dev.izhida.cn'),
						// todo change link above;
						encodeURIComponent('这是赌王送你的筹码，快来试试手气吧'),
						encodeURIComponent('http://Mtime-k4.dev.izhida.cn/images/share.jpg'));
			window.location.href= href;
		}else{
			$('#layer_share').show();
		}
	});

	$("#layer_share").click(function(){
		$(this).hide();
	})
// test
})	
