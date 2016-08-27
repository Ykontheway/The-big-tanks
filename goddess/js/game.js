

var game = {

	imgPath: ["img/leftHand.png","img/rightHand.png","img/game_bg.png","img/cross_bg.png",
	"img/goddess0.png","img/goddess1.png","img/goddess2.png","img/goddess3.png","img/goddess4.png",
	"img/goddess5.png","img/goddess6.png","img/goddess7.png"],

	getId:function (_id){
		return document.getElementById(_id);
	},

	loading:function (){
		var imgs = [];
		var loadView = game.getId("load");
		var point = game.getId("point");
		var ani = game.getId("ani");
		var aniSlider = game.getId("aniSlider");
		var windowWidth = document.documentElement.clientWidth;
		ani.style.width = windowWidth*0.8 + "px";
		var aniWidth = ani.offsetWidth;
		ani.style.marginLeft = -aniWidth/2 + "px";
		for (var i = 0; i < game.imgPath.length; i++) {
            var aImg = new Image();
            aImg.src = game.imgPath[i];
            aImg.onload = function () {
                imgs.push(this);
                var poiter = (imgs.length / game.imgPath.length);
                point.innerHTML = Math.round(poiter * 100);
                aniSlider.style.width = Math.round((aniWidth-15) * poiter) + "px";
                if (imgs.length == game.imgPath.length) {
                    setTimeout(function(){
                    	loadView.style.display = "none";
                    },300); 
                }
            }
        }
	},

	init:function (){
		//游戏层对象
		var gameUI = game.getId("gameUI");
		var gameView = game.getId("gameView");
		var gamePause = game.getId("gamePause");
		var gameOver = game.getId("gameOver");
		var goddesView = game.getId("goddesView");
		//游戏按钮
		var playBtn = game.getId("playBtn");
		var pauseBtn = game.getId("pauseBtn");
		var contBtn = game.getId("contBtn");
		var resetBtn = game.getId("resetBtn");
		var shareBtns = document.getElementsByClassName("share");
		//游戏信息
		var scoreUI = game.getId("score");
		var timeUI = game.getId("gameTime");
		var goddessUI = game.getId("goddessImg");
		var goddessList = goddessUI.getElementsByTagName("li");
		var result = game.getId("result");
		var rank = game.getId("rank");
		var goddessMsg = game.getId("goddessMsg");
		var gameUIMsg = gameUI.getElementsByTagName("p");
		var gamePauseMsg = gamePause.getElementsByTagName("p");
		var gameOverMsg = gameOver.getElementsByTagName("p");
		//游戏音乐
		var godMusic = game.getId("godMusic");
		var handMusic = game.getId("handMusic");
		//游戏数据
		var playGame = false;
		var score = 0;
		var gameTime = 31;
		var goddessIndex = 0;
		var handSpeed = 10;	//产生手掌的时间间隔 ,值越小间隔越短
		var handMiss = 1.0; //手掌的移动速率，默认，值越大速度越大
		var handNum = 10;
		var handIndex = 0;  
		var hands = [];
		var goddessTimer = null;
		var startTimer = null;
		var timeTimer = null;

		var windowWidth = document.documentElement.clientWidth;
		var windowHeight = document.documentElement.clientHeight;
		//初始化样式
		document.body.style.fontSize = "100%";
		gameUIMsg[0].style.marginTop = windowHeight/3 +"px";
		gamePauseMsg[0].style.marginTop = windowHeight/3 + "px";
		gameOverMsg[0].style.marginTop = windowHeight/3 + "px";
		game.setMarginLeft(playBtn,windowWidth);
		game.setMarginLeft(shareBtns,windowWidth);
		game.setMarginLeft(contBtn,windowWidth);
		game.setMarginLeft(resetBtn,windowWidth);
		if(windowWidth>windowHeight){
			gameView.style.backgroundImage = "url('img/cross_bg.png')";
			goddessUI.style.display = "none";
		}else{
			gameView.style.backgroundImage = "url('img/game_bg.png')";
			goddessUI.style.display = "block";
			goddessUI.style.width = windowWidth + "px";
			goddessUI.style.height = windowHeight + "px";
			goddesView.style.width = 0.6*windowHeight + "px";
			goddesView.style.height = windowHeight + "px";
			goddesView.style.marginLeft = (windowWidth - goddesView.offsetWidth)/2 + "px";

		}
		if(windowWidth<windowHeight){
			//创建女神动画
			function createGoddess(){
				for(var i = 0;i<8;i++){
					var e = document.createElement("li");
					e.style.backgroundImage = "url('img/goddess"+i+".png')";
					e.style.width = 0.6*windowHeight +"px";
					e.style.height = goddessUI.offsetHeight + "px";
					goddesView.appendChild(e);
				}
			}
			createGoddess();
		}
		if(windowWidth<windowHeight){
			var wl = goddesView.offsetLeft;
			var ww = goddesView.offsetWidth;
			var wh = goddesView.offsetHeight;
			var goddessPos = [
				{x:wl+0.5*ww,y:0.15*wh},{x:wl+0.552*ww,y:0.175*wh},{x:wl+0.5729*ww,y:0.25625*wh},
				{x:wl+0.7042*ww,y:0.3225*wh},{x:wl+0.6146*ww,y:0.39375*wh},{x:wl+0.5625*ww,y:0.6125*wh},
				{x:wl+0.5417*ww,y:0.81875*wh},{x:wl+0.5*ww,y:0.83125*wh},{x:wl+0.4479*ww,y:0.81875*wh},
				{x:wl+0.4667*ww,y:0.6125*wh},{x:wl+0.4167*ww,y:0.48125*wh},{x:wl+0.40625*ww,y:0.4125*wh},
				{x:wl+0.3021*ww,y:0.325*wh},{x:wl+0.4375*ww,y:0.25*wh},{x:wl+0.4479*ww,y:0.175*wh}
			];
		}else{
			var ww = windowWidth;
			var wh = windowHeight;
			var goddessPos = [
				{x:0.8433*ww,y:0},{x:0.6707*ww,y:0.2343*wh},{x:0.6988*ww,y:0.3328*wh},
				{x:0.6285*ww,y:wh},{x:0.4127*ww,y:wh},{x:0.3752*ww,y:0.7031*wh},
				{x:0.3564*ww,y:0.4531*wh},{x:0.3752*ww,y:0.3906*wh},{x:0.1782*ww,y:0}
			];
		}
		//初始化手掌
		for(var i = 0;i<14;i++){
			var newHand = document.createElement("div");
			newHand.style.display = "none";
			newHand.isShow = false;
			newHand.LorR = 0;
			newHand.endOf = null;
			newHand.move = null;
			newHand.add = 0;
			newHand.arrPos = null;
			newHand.className = "hand";
			gameView.appendChild(newHand);
			newHand.addEventListener("touchstart",function(){
				if(!playGame){
					return;
				}
				this.style.display = "none";
				this.isShow = false;
				handMusic.currentTime = 0;
				handMusic.play();
				score+=1;
				scoreUI.innerHTML = score;
			},false);
			hands.push(newHand);

		}
		game.show(gameUI);
		game.hid(gameView,gameOver,gamePause);
		//事件
		document.addEventListener("touchstart",function(){
			return false;
		},false);
		playBtn.addEventListener("touchstart",function(){
			playGame = true;
			windowWidth<windowHeight&&goddessAnimate();
			startGame();
			timer();
			game.hid(gameUI);
			game.show(gameView);
		},false);
		pauseBtn.addEventListener("touchstart",function(){
			playGame = false;
			game.show(gamePause);
		},false);
		contBtn.addEventListener("touchstart",function(){
			playGame = true;
			game.hid(gamePause);
			clearTimeout(startTimer);
			clearTimeout(goddessTimer);
			clearTimeout(setTimer);
			goddessAnimate();
			startGame();
			timer();
		},false);
		resetBtn.addEventListener("touchstart",function(){
			playGame = true;
			score = 0;
			gameTime = 31;
			goddessIndex = 0;
			handSpeed = 10;
			handMiss = 1.0;
			handNum = 10;
			handIndex = 0;
			scoreUI.innerHTML = score;
			timeUI.innerHTML = gameTime;
			game.hid(gameOver);
			clearTimeout(startTimer);
			clearTimeout(goddessTimer);
			clearTimeout(setTimer);
			goddessAnimate();
			startGame();
			timer();
		},false);
		function timer(){
			gameTime--;
			switch(gameTime){
				case 25:
					handMiss = 1.4;
					handSpeed = 9;
					break;
				case 20:
					handSpeed = 8;
					handNum = 12;
					break;
				case 15:
					handMiss = 1.7;
					handSpeed = 7;
					break;
				case 10:
					handSpeed = 7;
					handNum = 14;
					break;
				case  5:
					handSpeed = 5;
					handMiss = 2.0;
					break;
				case  0:
					playGame = false;
					gameOverResult();
					break;
			}
			if(gameTime<10){
				gameTime = "0" + gameTime;
			}
			timeUI.innerHTML = gameTime;
			if(playGame){
				setTimer = setTimeout(timer,1000);
			}
		}
		function startGame(){
			for(var i = 0;i<handNum;i++){
				var hand = hands[i];
				if(hand.isShow){
					hand.style.left = hand.offsetLeft + hand.move.x*handMiss +"px";
					hand.add+=hand.move.y*handMiss;
					if(Math.abs(hand.add)>1){
						hand.style.top = hand.offsetTop + hand.add +"px";
						hand.add = 0;
					}
					var hl = hand.offsetLeft;
					var ht = hand.offsetTop;
					var hw = hand.offsetWidth;
					var hh = hand.offsetHeight;
					if(hand.LorR == 1){
						hand.arrPos = [
							{x:hl+0.4235*hw,y:ht},{x:hl+0.9411*hw,y:ht+0.0833*hh},
							{x:hl+0.9705*hw,y:ht+0.2222*hh},{x:hl,y:ht+0.2222*hh},
							{x:hl,y:ht+0.4444*hh},{x:hl+0.9882*hw,y:ht+0.6388*hh},
							{x:hl+0.2352*hw,y:ht+hh},{x:hl,y:ht+hh},{x:hl,y:ht}
						];
					}else{
						hand.arrPos = [
							{x:hl+0.1765*hw,y:ht},{x:hl+hw,y:ht},
							{x:hl+hw,y:ht+hh},{x:hl+0.4118*hw,y:ht+0.9722*hh},
							{x:hl+0.1176*hw,y:ht+0.5556*hh},{x:hl+0.0176*hw,y:ht+0.3555*hh},
							{x:hl,y:ht+0.1888*hh},{x:hl+0.0588*hw,y:ht+0.0444*hh}
						];
					}
					moveCollision(hand);
				}
			}
			if(handIndex%handSpeed == 0){
				for(var i = 0;i<handNum;i++){
					var hand = hands[i];
					if(!hand.isShow){
						var randX = game.getRand(-0.1*windowWidth,1.1*windowWidth);
						while(randX>0&&randX<windowWidth){
							randX = game.getRand(-0.1*windowWidth,windowWidth+100);
						}
						var randY = game.getRand(0,windowHeight);
						var w = windowWidth>windowHeight?windowHeight:windowWidth;
						if(randX<=0){
							hand.style.width = 0.18*w +"px";
							hand.style.height = 0.1555*w +"px";
							hand.style.backgroundImage = "url(img/rightHand.png)";
							hand.LorR = 1;
						}else{
							hand.style.width = 0.16*w +"px";
							hand.style.height = 0.16852*w +"px";
							hand.style.backgroundImage = "url(img/leftHand.png)";
							hand.LorR = 2;
						}
						if(randY<0.3125*windowHeight){
							hand.endOf = {x:0.5*windowWidth,y:0.35*windowHeight};
						}else if(randY<0.5625*windowHeight){
							hand.endOf = {x:0.5*windowWidth,y:0.45*windowHeight};
						}else{
							hand.endOf = {x:0.5*windowWidth,y:0.55*windowHeight};
						}
						if(windowWidth>windowHeight){
							hand.endOf = {x:0.5*windowWidth,y:0.5*windowHeight};
						}
						var x = hand.endOf.x - randX;
						var y = hand.endOf.y - randY;
						var n = Math.sqrt(x*x + y*y);
						var vX = x/n;
						var vY = y/n;
						vX = Math.abs(vX)<0.1?(vX<0?-0.1:0.1):vX;
						vY = Math.abs(vY)<0.1?(vY<0?-0.1:0.1):vY;
						hand.move = {x:vX,y:vY};
						hand.style.display = "block";
						hand.style.left = randX +"px";
						hand.style.top = randY +"px";
						hand.isShow = true;
						break;
					}
				}
			}
			handIndex++;
			if(handIndex>handSpeed*1000){
				handIndex = 0;
			}
			if(playGame){
				startTimer = setTimeout(startGame,30);
			}
		}
		function goddessAnimate(){
			goddessIndex++;
			if(goddessIndex>=goddessList.length){
				goddessIndex = 0;
			}
			for(var i = 0;i<goddessList.length;i++){
				goddessList[i].style.display = "none";
			}
			goddessList[goddessIndex].style.display ="block";
			if(playGame){
				goddessTimer = setTimeout(goddessAnimate,150);
			}
		}
		function moveCollision(obj){
			for(var a = 0;a<obj.arrPos.length;a++){
				var b = a+1;
				if(b==obj.arrPos.length){
					b = 0;
				}
				for(var c = 0;c<goddessPos.length;c++){
					var d = c+1;
					if(d==goddessPos.length){
						d=0;
					}
					if(game.vectorCollision(obj.arrPos[a].x,obj.arrPos[a].y,
							obj.arrPos[b].x,obj.arrPos[b].y,
							goddessPos[c].x,goddessPos[c].y,
							goddessPos[d].x,goddessPos[d].y)){
						gameOverResult();
					}
				}
			}
		}
		function gameOverResult(){
			playGame = false;
			godMusic.play();
			game.show(gameOver);
			for(var i = 0;i<hands.length;i++){
				hands[i].style.display = "none";
				hands[i].isShow = false;
			}
			result.innerHTML = score;
		}
	},
	
	setMarginLeft:function (obj,wrapWidth){
		if(obj.length){
			for(var i = 0;i<obj.length;i++){
				obj[i].style.marginLeft = (wrapWidth - obj[i].offsetWidth)/2 + "px";
			}
		}else{
			obj.style.marginLeft = (wrapWidth - obj.offsetWidth)/2 + "px";
		}
	},

	getRand:function(min,max){
		return Math.floor(Math.random()*(max-min)+min);
	},

	show:function(){
		for (var i = 0; i < arguments.length; i++) {
        	arguments[i].style.display = "block";
    	}
	},

	hid:function (){
		for (var i = 0; i < arguments.length; i++) {
        	arguments[i].style.display = "none";
    	}
	},

	vectorCollision:function(ax,ay,bx,by,cx,cy,dx,dy){
		var ACB = (cx-ax)*(by-ay)-(bx-ax)*(cy-ay);
		var ADB = (dx-ax)*(by-ay)-(bx-ax)*(dy-ay);
		var CAD = (ax-cx)*(dy-cy)-(dx-cx)*(ay-cy);
		var CBD = (bx-cx)*(dy-cy)-(dx-cx)*(by-cy);
		if(ACB*ADB<0 && CAD*CBD<0){
			return true;
		}else{
			return false;
		}
	}
}
window.onload = function (){
	game.loading();
	game.init();
}
window.onresize = function (){
	// location.reload(false);
	window.location.href=window.location.href;
}