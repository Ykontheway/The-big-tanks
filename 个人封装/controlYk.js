function controlYk(index){
	 document.onkeydown = function(event){	 	
	 	var ev = event || window.event;	 	
			if (ev.preventDafault){
				ev.preventDefault();
			} else{
				ev.returnValue = false;
			}
	 	switch (ev.keyCode){
	 		case 37:
	 			index.direction = 0;	 			
	 			break;
	 		case 38:
	 			index.direction = 2;	 			
	 			break;
	 		case 39:
	 			index.direction = 1;	 			
	 			break;	
	 		case 40:
	 			index.direction = 3;	 			
	 			break;
	 		default:
	 			break;
	 	}
	 }
	 document.onkeyup = function(event){
	 	var ev = event || window.event;		
	 	switch (ev.keyCode){
	 		case 37:
	 			index.direction = -1;
	 			break;
	 		case 38:
	 			index.direction = -1;
	 			break;
	 		case 39:
	 			index.direction = -1;
	 			break;	
	 		case 40:
	 			index.direction = -1;
	 			break;
	 		default:
	 			break;
	 	}
	 }
}
