function ININ_ALL() {

		Chack_Mobi();
		initializeImage();
		ItemInIt();
		// 动画函数
		requestNextAnimationFrame(animate);
		// 初始化网络
		window.addEventListener("load", init_socket, false);
		TimerInit();
}

function Chack_Mobi() {

	// 检查是不是用手机访问
	var ua = navigator.userAgent;
	var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
		isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
		isAndroid = ua.match(/(Android)\s+([\d.]+)/),
		isMobile = isIphone || isAndroid;
	if(isMobile) {
		alert("手机无法访问，请用PC web访问！！！");
		location.href = 'http://www.babaliuliu.com';
	}
	if (screen.width < 1200){
		alert("官方浏览器屏幕最低宽度为1200");
		location.href = 'http://www.babaliuliu.com';
	}
}