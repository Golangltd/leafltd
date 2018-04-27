// websocket 网络链接函数
var IsDebug = true;

var https_IIS_IP = "192.168.199.12";

//var https_IIS_IP = "192.168.0.9";

var ws_socket;
// 链接的信息
var ws_url = "ws://:8866/BaBaLiuLiu?data={'Protocol':3,'Protocol2':1,'OpenID'='ww'}";

// 服务器ID的服务器返回的数据ID
var ServerID_MD5 = "";
//客户端ID
var ClentID = "";
// 传输ID
var Socket_ClentID_MD5 = "";

// 选择角色的ID
var Role_Num = "";

// 手机浏览器测试--- http://192.168.199.12:8020/babaliuliumobi/index.html?Time=1515636191542

// 初始化网络接口
function init_socket() {

	// 测试环境
	if(IsDebug) {
		ws_url = "ws://"+https_IIS_IP+":8866/BaBaLiuLiu?data={'Protocol':3,'Protocol2':1,'OpenID'='ww'}";
	}

	console.log(ws_url)
	ws_socket = new WebSocket(ws_url);
	ws_socket.onopen = function(evt) {
		onOpen(evt)
	};
	ws_socket.onclose = function(evt) {
		onClose(evt)
	};
	ws_socket.onmessage = function(evt) {
		onMessage(evt)
	};
	ws_socket.onerror = function(evt) {
		onError(evt)
	};

	return
}

// 捂手函数
function onOpen(evt) {
	//console.log("CONNECTED");
	// 获取URL传递过来的参数--PC的参数数据
	ServerID_MD5 = GetQueryString("Time");
	console.log(ServerID_MD5);

	var myDate = new Date();
	var Player_Data = "";
	ClentID = myDate.getTime() + myDate.getMilliseconds() + Player_Data
	// 链接网络
	login();
}

// 关闭网络接口函数
function onClose(evt) {
	console.log("DISCONNECTED");
	alert("网络链接失败，请刷新网页重新链接！！！");
}

// 消息处理函数
function onMessage(evt) {
	var data = evt.data;
	//console.log("data=" + data);
	var d = base64decode(data);
	//console.log(d);
	var zhuana = utf8to16(d);
	var obj = eval('(' + zhuana + ')');
	// var obj = str.parseJSON(); //由JSON字符串转换为JSON对象

	switch(obj.Protocol2) {
		case 13: // 报名协议
			{
				if(obj.Type == "4") {
					alert("游戏未开启！！！")
					return
				} else if(obj.Type == "3") {
					console.log("报名成功！！！");
					//传输时候的ID
					Socket_ClentID_MD5 = obj.StrBaoMing;
				}
			}
			break;
		case 14: // 转发协议
			{
				if(obj.Type == "2") { // 手机发给PC的，否则不处理
					var data = obj.Data // 手机发的数据信息，多为移动和射击信息
				}
			}
			break;
		case 15: //手机报名成功 推送给PC
			{

			}
			break;
		case 1: //心跳协议
			{
				//console.log(obj.OpenID);
			}
			break;
		default:
			break;
	}
}

// 错误日志函数
function onError(evt) {
	console.log('<span style="color: red;">ERROR:</span> ' + evt.data);
}

// 发送数据函数
function doSend(message) {
	//console.log("SENT: " + message);
	//console.log('<span style="color: blue;">RESPONSE: ' + base64encode(message) + '</span>');
	ws_socket.send(message);
}

// 登陆用户
function login() {

	if(ServerID_MD5 == null) {
		alert("serveId 为空");
		ws_socket.close();
		return
	}

	// 发送数据给服务器
	var json = {
		Protocol: 3,
		Protocol2: 13,
		Type: "2",
		StrBaoMing: ClentID,
		ServerID: ServerID_MD5, // 服务器ID
		RoleNum: "",
		Name: "test",
	};
	var goServerJson = JSON.stringify(json);
	doSend(goServerJson);
}

// 获取url参数
// 调用方法
// GetQueryString("参数名1")
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}