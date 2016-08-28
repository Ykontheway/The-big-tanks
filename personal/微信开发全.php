<?php
	function httpGet($url) {
	    $curl = curl_init();
	    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	    curl_setopt($curl, CURLOPT_TIMEOUT, 500);
	    // 为保证第三方服务器与微信服务器之间数据传输的安全性，所有微信接口采用https方式调用，
	    //必须使用下面2行代码打开ssl安全校验。
	    // 如果在部署过程中代码在此处验证失败，请到 http://curl.haxx.se/ca/cacert.pem 下载新的证书判别文件。
	    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, true);
		//curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, true);//验证证书，没有购买不得使用，假设就是安全
	    curl_setopt($curl, CURLOPT_URL, $url);
	
	    $res = curl_exec($curl);
	    curl_close($curl);
	 
	    return $res;
	  }
	
	//第一步：取出code
	$code = $_GET["code"];
	//第二步： 根据第一步获取的code去获得一个特殊的access_token（这里需要注意，	
	//这个access_token和基础里面获得不是一个
	
	$appid = "wx93d6fddcae0d118d";
	$secret = "f661b81fbfd990d9e732e47fdcccb7af";
	
	$accessTokenAPI = "https://api.weixin.qq.com/sns/oauth2/access_token?appid={$appid}&secret={$secret}&code={$code}&grant_type=authorization_code";
	
	//获取传回来的数据
	$rsa = httpGet($accessTokenAPI);
	
	$rsaArray = json_decode($rsa,true);
	
	$access_token = $rsaArray["access_token"];
	$openID = $rsaArray["openid"];
	
	//第三步拉取用户信息
	$userAPI = "https://api.weixin.qq.com/sns/userinfo?access_token={$access_token}&openid={$openID}&lang=zh_CN";
	
	$rsb = httpGet($userAPI);
	$rsbArray = json_decode($rsb,true);
	
	echo "<img src=".$rsbArray['headimgurl']."/>";	
?>