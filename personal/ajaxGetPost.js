/*
 * obj.type
 * obj.url
 * obj.data
 * obj.success
 * obj.error
 */

function AJAX(obj){
	if(obj.dataType == "jsonp"){
		//这里的callback必须是全局变量，保证函数消失的时候，变量依然存在
		//callBack = obj.success;
		//处理函数名（防止多个网络请求，函数名字相同，出现紊乱的情况）
		var name = "callBack" + "_" + new Date().getTime() + "_" + String(Math.random()).replace(".","");
			
		window[name] = obj.success;
		var sc = document.createElement("script");
		sc.src = obj.url + "?" + "cb=" + name;			
		document.body.appendChild(sc);
		document.body.removeChild(sc);
		return;
	}
	var readytowar = null;
	if(window.XMLHttpRequest){
		readytowar = new XMLHttpRequest();
	}else{
		readytowar = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	obj.type = obj.type.toUpperCase() || "GET";
	//如果是get请求，并且需要传递参数，则需要给url给后面拼接参数
	
	if (obj.type == "POST") {
		//
		var arr = [];//定义数组
		for (var a in obj.data) {
			arr.push(a + "=" + obj.data[a]);			
		};
		var str = arr.join("&");
		readytowar.open(obj.type,obj.url,true);
		//头部必须在open之下
		readytowar.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		readytowar.send(str);		
//		console.log(obj.url);
	}else{
		var arr = [];
		for (var a in obj.data) {
			arr.push(a + "=" + obj.data[a]);			
		};
		var str = arr.join("&");
		obj.url = obj.url + "?" + str;
		readytowar.open(obj.type,obj.url,true);
		readytowar.send();
	}
	
	readytowar.onreadystatechange = function(){
		if(readytowar.readyState >= 4){
			if(readytowar.status >= 200 && readytowar.status < 300 || readytowar.status == 304){
				//请求成功
				//ajaxObject.responseText;
				//因为通用性，避免xml出现的情况，不封装解码方法
				obj.success(readytowar.responseText);
			} else{
				obj.error1(readytowar.status); 
			}
		}
	}

}
