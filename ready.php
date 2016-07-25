<?php
	mysql_connect("127.0.0.1:3306","root","");
	mysql_select_db("bjh160303");

	$access_token = $_GET["name"];
	$openid = $_GET["age"];
		
	$userAPI = "https://api.weixin.qq.com/sns/userinfo?access_token={$access_token}&openid={$openID}&lang=zh_CN";
	
	$rsb = httpGet($userAPI);
	$rsbArray = json_decode($rsb,true);
	
	$name = $rsbArray["nickname"];
	
	$rs = "insert into zhaoxuzheng(name) values ('$name')";
	
	mysql_query($rs);
?>