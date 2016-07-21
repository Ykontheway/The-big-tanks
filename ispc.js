function deviceReady() {
			function IsPc() {
				var userAgentInfo = navigator.userAgent;
				var Agents = new Array("Android", "iPhone", "iPad", "SymbianOS", "Windows Phone");
				var index = true;		
				for(var i = 0; i < Agents.length; i++) {
					if(userAgentInfo.indexOf(Agents[i]) > 0) {
						index = false;				
						break;				
					}
				}
				return index;
			}	
			if(IsPc()) {
				var deviceArray = [375, 667];
				return deviceArray;
			} else {
				var deviceArray = [document.documentElement.clientWidth, document.documentElement.clientHeight];
				return deviceArray;
			}
		}
deviceReady();
