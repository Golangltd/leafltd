var FangXiang = "";
var TeSuBoom = false;
var Boom = false;
// 小按钮操作函数
// 主要是干扰弹的发射
function XiaoAnNiu() {
	console.log("干扰弹的发射");
	TeSuBoom = true;
	CaoZuoXinXi();
	TeSuBoom = false;
	return
}

// 大按钮操作函数
// 主要是炮弹的发射
function DaAnNiu() {
	console.log("炮弹的发射");
	Boom = true;
	CaoZuoXinXi();
	Boom = false;
	return
}

// 左-->方向
function ZuoAnNiu() {
	console.log("after左-->方向");
	FangXiang = "after";
	CaoZuoXinXi();
	return
}

//右-->方向
function YouAnNiu() {
	console.log("before右-->方向");
	FangXiang = "before";
	CaoZuoXinXi();
	return
}

//上-->方向
function ShangAnNiu() {
	console.log("right上-->方向");
	FangXiang = "right";
	CaoZuoXinXi();
	return
}

//下-->方向
function XiaAnNiu() {
	console.log("left下-->方向");
	FangXiang = "left";
	CaoZuoXinXi();
	return
}

//发送给服务器操作信息
function CaoZuoXinXi() {
    console.log(Socket_ClentID_MD5)
	var ddd = FangXiang + "|" + TeSuBoom + "|" + Boom
	// 发送数据给服务器
	var json = {
		Protocol: 3,
		Protocol2: 14,
		Type: 2,
		MuBiaoID: Socket_ClentID_MD5, // 服务器和客户端的ID组合
		RoleNum: Role_Num, // 选择的角色的ID
		Data: ddd, // 方向|特殊武器使用|攻击武器使用 
		// 方向-- ['before', 'left', 'right', 'after'];
		// 特殊武器使用 = true 后者false 
		// 攻击武器使用 = true 后者false 
	};
	var goServerJson = JSON.stringify(json);
	doSend(goServerJson);

	return
}

function XuanZheRole1() {
	if(ServerID_MD5 == null) {
		alert("serveId 为空");
		return
	};
	Role_Num = "1";
	if(true) {
		var ShowItemHub = document.getElementById('Boom');
		ShowItemHub.style.display = "none";
	}
	if(true) {
		var ShowItemHub = document.getElementById('rongqi');
		ShowItemHub.style.display = "block";
	}
	CaoZuoXinXi();
}

function XuanZheRole2() {
	if(ServerID_MD5 == null) {
		alert("serveId 为空");
		return
	};
	Role_Num = "2";
	if(true) {
		var ShowItemHub = document.getElementById('Boom');
		ShowItemHub.style.display = "none";
	}
	if(true) {
		var ShowItemHub = document.getElementById('rongqi');
		ShowItemHub.style.display = "block";
	}
	CaoZuoXinXi();
}

function XuanZheRole3() {
	if(ServerID_MD5 == null) {
		alert("serveId 为空");
		return
	};
	Role_Num = "3";
	if(true) {
		var ShowItemHub = document.getElementById('Boom');
		ShowItemHub.style.display = "none";
	}
	if(true) {
		var ShowItemHub = document.getElementById('rongqi');
		ShowItemHub.style.display = "block";
	}
	CaoZuoXinXi();

}

function XuanZheRole4() {
	if(ServerID_MD5 == null) {
		alert("serveId 为空");
		return
	};
	Role_Num = "4";
	if(true) {
		var ShowItemHub = document.getElementById('Boom');
		ShowItemHub.style.display = "none";
	}
	if(true) {
		var ShowItemHub = document.getElementById('rongqi');
		ShowItemHub.style.display = "block";
	}
	CaoZuoXinXi();
}