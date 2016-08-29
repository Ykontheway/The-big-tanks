   $(function () {

     /*  FastClick.attach(document.body);
       var attchFastClick=require('fastclick');
       attchFastClick(document.body);*/

       var _h=$(".swipe").length;
       var submitBol=true;
       $(".inner").css("height",""+_h*100+"%").attr("_h",$(".inner").height()+"px").height($(".inner").attr("_h"));
       $(".swipe").css("height",""+1/_h*100+"%").attr("_h",$(".swipe").height()+"px").height($(".swipe").attr("_h"));


       $("#man").parent().css({"background":'url("img/checked.png") 62.5% center no-repeat',"background-size":"27.97202797202797% 62.5%"});
       $("#h5 #man").parent().css({"background":'url("img/checked1.png") 62.5% center no-repeat',"background-size":"27.97202797202797% 62.5%"});

       $(".customRadio").on("click", function () {
           if($(this).parents(".swipe").hasClass("h5")){
               $(".customRadio").css({"background":'url("img/check1.png") 62.5% center no-repeat',"background-size":"27.97202797202797% 62.5%"});
               $(this).css({"background":'url("img/checked1.png") 62.5% center no-repeat',"background-size":"27.97202797202797% 62.5%"});
           }else{
               $(".customRadio").css({"background":'url("img/check.png") 62.5% center no-repeat',"background-size":"27.97202797202797% 62.5%"});
               $(this).css({"background":'url("img/checked.png") 62.5% center no-repeat',"background-size":"27.97202797202797% 62.5%"});
           }

       });

       $(".submit").on("click", function () {
           if(submitBol){
               submitBol=false;
               $(' <div class="submit_ok">'+
                   ' <h3 class="thanks">感谢您的参与</h3>'+
                   '</div>').insertAfter($(this).parent());

               setTimeout(function () {
                   $(".submit_ok").css({opacity:0,"transition":"1s"});

               },800);
               setTimeout(function () {
                   $(".submit_ok").remove();
                   submitBol=true;
               },1500);
           }
       });


       var aSwipeLen=$(".swipe:first").height();
       var swipeSpeed=400;
       var swipeBol=true;
       var index=1;
       var startY=0;
       var endY=0;
       var dis=50;
       $(".inner").attr("index",1);
       $(".swipe").attr("animateBol",1);
       $(".swipe:last").insertBefore($(".swipe:first"));

       $(".inner").css("top",-aSwipeLen+"px");


       $.fn.extend({
           fnLoad: function (arr,callback) {
               $('<div id="loading">'+
                   '<p id="load_percent">0%</p>'+
                   '<p id="load_wrap"><span id="load_time"></span></p>'+
               '</div>').insertBefore($(".wrap"));
               var imgs=[];

               var index=0;

               for (var i=0; i<arr.length; i++){

                   var imgObj=new Image();

                   imgObj.src="img/"+arr[i];

                   imgObj.onload=function (){

                       index++;
                       $("#load_time").css("left",parseInt((index/arr.length-1)*100)+"%");
                       $("#load_percent").html(parseInt(index/arr.length*100)+"%");
                       imgs.push(this);
                       if (index==arr.length){
                           //全部加载完毕
                           $("#loading").remove();
                           $("label,.cityLabel,.customRadio").css({"line-height": $(".fm p:first").height() + "px"});
                           var _mh=$(".fm input:first").height();
                           $(".fm input").css({"min-height":_mh});
                           callback&&callback();
                       }
                   }
               }
           },
           fnSwipe: function (callback) {
               $(document).on("touchstart", function () {
                   startY=event.touches[0].pageY;
//               event.preventDefault();
               });
               $(document).on("touchmove", function () {
                   endY=event.touches[0].pageY;
                   event.preventDefault();
               });
               $(document).on("touchend", function () {
                   if(startY&&endY){
                       if(endY-startY>dis){
                           swipeUp(callback);
                       }
                       if(startY-endY>dis){
                           swipeDown(callback);
                       }
                   }
                   startY=0;
                   endY=0;
//               event.preventDefault();
               });
           }
       });
          function swipeDown(callback) {
               if(swipeBol){
                   index++;
                   if(index>_h){
                       index=1;
                   }
                   $(".inner").attr("index",index);
                   swipeBol=false;
                   setTimeout(function () {
                       swipeBol=true;
                   },swipeSpeed);
                   $(".swipe:first").insertAfter($(".swipe:last"));
                   $(".inner").css("top","0px").animate({"top":-aSwipeLen+"px"},swipeSpeed,"swing");
                   callback&&callback();
               }
           }
           function swipeUp(callback) {
               if(swipeBol){
                   index--;
                   if(index<1){
                       index=_h;
                   }
                   $(".inner").attr("index",index);
                   swipeBol=false;
                   setTimeout(function () {
                       swipeBol=true;
                   },swipeSpeed);
                   $(".swipe:last").insertBefore($(".swipe:first"));
                   $(".inner").css("top",-aSwipeLen*2+"px").animate({"top":-aSwipeLen+"px"},swipeSpeed,"swing");
               }
               callback&&callback();
           }

   });
