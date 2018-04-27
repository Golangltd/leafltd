//http://tool.oschina.net/jscompress?type=3
// true 本地测试
var IsDebug = false;
// 本地测试阿帕奇后者IIS服务器地址
var https_IIS_IP = "192.168.199.12";
//var https_IIS_IP = "192.168.0.15";
// 本地http服务器开启的端口
var https_IIS_port = "8020"

var ws_socket;
// 链接的信息
var ws_url = "ws://:8866/BaBaLiuLiu?data={'Protocol':3,'Protocol2':1,'OpenID'='ww'}";

// 服务器ID
var ServerID = "";
// 服务器ID的服务器返回的数据ID
// 心跳开关
var XinTiaoKaiGuan = false;

// 游戏时间
var GameTime = 0;

// 初始化网络接口
function init_socket() {
	//console.log("初始化网络！！！");
	// 测试环境
	if(IsDebug) {
		ws_url = "ws://" + https_IIS_IP + ":8866/BaBaLiuLiu?data={'Protocol':3,'Protocol2':1,'OpenID'='ww'}";
	}
	//0 初始化数据
	var Player_Data = new Object;
	Player_Data.type = "player";
	Player_Data.type2 = "FeiJi";
	Player_Data.Name = "";
	Player_Data.Hp = 2000;
	Player_Data.OpenID = "";
	Player_Data.kuang = "90";
	Player_Data.gao = "90";
	Player_Data.Posx = 30;
	Player_Data.Posy = 120;
	Player_Data.ImgNum = 1; // 选择1号角色
	Player_Data.ImgDC = new Image();
	Player_Data.ImgDC.src = "img/feijiP.png";
	//	Player_Data.ImgDC.onload = function(){  
	//  Player_Data.Ready = true;  
	//  } 
	Player_Data.XuanZhaun = "1";
	Player_Data.IsHead = false;
	Player_Data.EntryTX = true; // 新加入的特效，播放后直接就false

	//加入到人物数组列表
	PlayerList.push(Player_Data);

	//1 第二个认
	var Player_Data2 = new Object;
	Player_Data2.type = "player";
	Player_Data2.type2 = "Tank";
	Player_Data2.Name = "";
	Player_Data2.Hp = 2000;
	Player_Data2.OpenID = "";
	Player_Data2.kuang = "80";
	Player_Data2.gao = "80";
	Player_Data2.Posx = 20;
	Player_Data2.Posy = 200;
	Player_Data2.ImgNum = 1; // 选择1号角色
	Player_Data2.ImgDC = new Image();
	Player_Data2.ImgDC.src = "img/runner-small.png";
	Player_Data2.XuanZhaun = "0";
	Player_Data2.IsHead = false;
	Player_Data2.EntryTX = true; // 新加入的特效，播放后直接就false

	PlayerList.push(Player_Data2);

	//2 boss 坦克
	var Player_Data21 = new Object;
	Player_Data21.type = "d_boss";
	Player_Data21.type2 = "";
	Player_Data21.Name = "test2";
	Player_Data21.Hp = 10000;
	Player_Data21.OpenID = "";
	Player_Data21.kuang = "100";
	Player_Data21.gao = "100";
	Player_Data21.Posx = 950;
	Player_Data21.Posy = 350;
	Player_Data21.ImgNum = 1; // 选择1号角色
	Player_Data21.ImgDC = new Image();
	Player_Data21.ImgDC.src = "img/tank.png";
	Player_Data21.XuanZhaun = "0";
	Player_Data21.IsHead = false;
	Player_Data21.EntryTX = true; // 新加入的特效，播放后直接就false

	PlayerList.push(Player_Data21);

	//3 巡逻飞机
	if(true) {

		var Player_Data21 = new Object;
		Player_Data21.type = "x_boss";
		Player_Data21.type2 = "";
		Player_Data21.Name = "test2";
		Player_Data21.Hp = 2000;
		Player_Data21.OpenID = "sasdadakdada2";
		Player_Data21.kuang = "60";
		Player_Data21.gao = "60";
		Player_Data21.Posx = 800;
		Player_Data21.Posy = Math.floor(Math.random() * 780);
		Player_Data21.ImgNum = 1; // 选择1号角色
		Player_Data21.ImgDC = new Image();
		Player_Data21.ImgDC.src = "img/feiji.png";
		Player_Data21.XuanZhaun = "0";
		Player_Data21.IsHead = false;
		Player_Data21.EntryTX = true; // 新加入的特效，播放后直接就false

		PlayerList.push(Player_Data21);
	}

	//4 d_boss的炮弹
	if(true) {
		var Player_Data21 = new Object;
		Player_Data21.type = "x_boss_boom";
		Player_Data21.type2 = "";
		Player_Data21.Name = "test2";
		Player_Data21.Hp = 2000;
		Player_Data21.OpenID = "sasdadakdada2";
		Player_Data21.kuang = "30";
		Player_Data21.gao = "30";
		Player_Data21.Posx = 950;
		Player_Data21.Posy = 250;
		Player_Data21.ImgNum = 1; // 选择1号角色
		Player_Data21.ImgDC = new Image();
		Player_Data21.ImgDC.src = "img/d_boss_boom.png";
		Player_Data21.XuanZhaun = "0";
		Player_Data21.IsHead = false;
		Player_Data21.EntryTX = false; // 新加入的特效，播放后直接就false

		PlayerList.push(Player_Data21);
	}

	//5 d_boss的炮弹2
	if(true) {
		var Player_Data21 = new Object;
		Player_Data21.type = "x_boss_boom";
		Player_Data21.type2 = "";
		Player_Data21.Name = "test2";
		Player_Data21.Hp = 2000;
		Player_Data21.OpenID = "sasdadakdada2";
		Player_Data21.kuang = "30";
		Player_Data21.gao = "30";
		Player_Data21.Posx = 950;
		Player_Data21.Posy = 250;
		Player_Data21.ImgNum = 1; // 选择1号角色
		Player_Data21.ImgDC = new Image();
		Player_Data21.ImgDC.src = "img/d_boss_boom.png";
		Player_Data21.XuanZhaun = "0";
		Player_Data21.IsHead = false;
		Player_Data21.EntryTX = false; // 新加入的特效，播放后直接就false

		PlayerList.push(Player_Data21);
	}

	//6 雷达1
	if(true) {
		var Player_Data21 = new Object;
		Player_Data21.type = "JZ_leida";
		Player_Data21.type2 = "";
		Player_Data21.Name = "test2";
		Player_Data21.Hp = 2000;
		Player_Data21.OpenID = "sasdadakdada2";
		Player_Data21.kuang = "70";
		Player_Data21.gao = "70";
		Player_Data21.Posx = 860;
		Player_Data21.Posy = 15;
		Player_Data21.ImgNum = 1; // 选择1号角色
		Player_Data21.ImgDC = new Image();
		Player_Data21.ImgDC.src = "img/role/di_leida/impulsea000.png";
		Player_Data21.XuanZhaun = "0";
		Player_Data21.IsHead = false;
		Player_Data21.EntryTX = false; // 新加入的特效，播放后直接就false

		PlayerList.push(Player_Data21);
	}

	//7 雷达2
	if(true) {
		var Player_Data21 = new Object;
		Player_Data21.type = "JZ_leida";
		Player_Data21.type2 = "";
		Player_Data21.Name = "test2";
		Player_Data21.Hp = 2000;
		Player_Data21.OpenID = "sasdadakdada2";
		Player_Data21.kuang = "70";
		Player_Data21.gao = "70";
		Player_Data21.Posx = 860;
		Player_Data21.Posy = 700;
		Player_Data21.ImgNum = 1; // 选择1号角色
		Player_Data21.ImgDC = new Image();
		Player_Data21.ImgDC.src = "img/role/di_leida/impulsea000.png";
		Player_Data21.XuanZhaun = "0";
		Player_Data21.IsHead = false;
		Player_Data21.EntryTX = false; // 新加入的特效，播放后直接就false

		PlayerList.push(Player_Data21);
	}

	//8 雷达1波
	if(true) {
		var Player_Data21 = new Object;
		Player_Data21.type = "leidabo1";
		Player_Data21.type2 = "";
		Player_Data21.Name = "test2";
		Player_Data21.Hp = 2000;
		Player_Data21.OpenID = "sasdadakdada2";
		Player_Data21.kuang = "50";
		Player_Data21.gao = "120";
		Player_Data21.Posx = 880;
		Player_Data21.Posy = 666;
		Player_Data21.ImgNum = 1; // 选择1号角色
		Player_Data21.ImgDC = new Image();
		Player_Data21.ImgDC.src = "img/leidabo.png";
		Player_Data21.XuanZhaun = "0";
		Player_Data21.IsHead = false;
		Player_Data21.EntryTX = false; // 新加入的特效，播放后直接就false

		PlayerList.push(Player_Data21);
	}

	//9 雷达2波
	if(true) {
		var Player_Data21 = new Object;
		Player_Data21.type = "leidabo2";
		Player_Data21.type2 = "";
		Player_Data21.Name = "test2";
		Player_Data21.Hp = 2000;
		Player_Data21.OpenID = "sasdadakdada2";
		Player_Data21.kuang = "50";
		Player_Data21.gao = "120";
		Player_Data21.Posx = 880;
		Player_Data21.Posy = 1;
		Player_Data21.ImgNum = 1; // 选择1号角色
		Player_Data21.ImgDC = new Image();
		Player_Data21.ImgDC.src = "img/leidabo.png";
		Player_Data21.XuanZhaun = "0";
		Player_Data21.IsHead = false;
		Player_Data21.EntryTX = false; // 新加入的特效，播放后直接就false

		PlayerList.push(Player_Data21);
	}

	//10 防空炮1
	if(true) {
		var Player_Data21 = new Object;
		Player_Data21.type = "fangkp1";
		Player_Data21.type2 = "";
		Player_Data21.Name = "test2";
		Player_Data21.Hp = 2000;
		Player_Data21.OpenID = "sasdadakdada2";
		Player_Data21.kuang = "80";
		Player_Data21.gao = "80";
		Player_Data21.Posx = 925;
		Player_Data21.Posy = 10;
		Player_Data21.ImgNum = 1; // 选择1号角色
		Player_Data21.ImgDC = new Image();
		Player_Data21.ImgDC.src = "img/fangkp.png";
		Player_Data21.XuanZhaun = "0";
		Player_Data21.IsHead = false;
		Player_Data21.EntryTX = false; // 新加入的特效，播放后直接就false

		PlayerList.push(Player_Data21);
	}

	//11 防空炮2
	if(true) {
		var Player_Data21 = new Object;
		Player_Data21.type = "fangkp2";
		Player_Data21.type2 = "";
		Player_Data21.Name = "test2";
		Player_Data21.Hp = 2000;
		Player_Data21.OpenID = "sasdadakdada2";
		Player_Data21.kuang = "80";
		Player_Data21.gao = "80";
		Player_Data21.Posx = 920;
		Player_Data21.Posy = 660;
		Player_Data21.ImgNum = 1; // 选择1号角色
		Player_Data21.ImgDC = new Image();
		Player_Data21.ImgDC.src = "img/fangkp.png";
		Player_Data21.XuanZhaun = "0";
		Player_Data21.IsHead = false;
		Player_Data21.EntryTX = false; // 新加入的特效，播放后直接就false

		PlayerList.push(Player_Data21);
	}
	//12 巡航导弹1
	if(true) {
		var Player_Data21 = new Object;
		Player_Data21.type = "xunhd1";
		Player_Data21.type2 = "";
		Player_Data21.Name = "test2";
		Player_Data21.Hp = 2000;
		Player_Data21.OpenID = "sasdadakdada2";
		Player_Data21.kuang = "80";
		Player_Data21.gao = "80";
		Player_Data21.Posx = 1120;
		Player_Data21.Posy = 580;
		Player_Data21.ImgNum = 1; // 选择1号角色
		Player_Data21.ImgDC = new Image();
		Player_Data21.ImgDC.src = "img/xunhd.png";
		Player_Data21.XuanZhaun = "0";
		Player_Data21.IsHead = false;
		Player_Data21.EntryTX = false; // 新加入的特效，播放后直接就false

		PlayerList.push(Player_Data21);
	}

	//13 巡航导弹2
	if(true) {
		var Player_Data21 = new Object;
		Player_Data21.type = "xunhd2";
		Player_Data21.type2 = "";
		Player_Data21.Name = "test2";
		Player_Data21.Hp = 2000;
		Player_Data21.OpenID = "sasdadakdada2";
		Player_Data21.kuang = "80";
		Player_Data21.gao = "80";
		Player_Data21.Posx = 1110;
		Player_Data21.Posy = 150;
		Player_Data21.ImgNum = 1; // 选择1号角色
		Player_Data21.ImgDC = new Image();
		Player_Data21.ImgDC.src = "img/xunhd.png";
		Player_Data21.XuanZhaun = "0";
		Player_Data21.IsHead = false;
		Player_Data21.EntryTX = false; // 新加入的特效，播放后直接就false

		PlayerList.push(Player_Data21);
	}

	//14 palyer
	if(true) {

		var Player_Data21 = new Object;
		Player_Data21.type = "player";
		Player_Data21.type2 = "";
		Player_Data21.Name = "test2";
		Player_Data21.Hp = 2000;
		Player_Data21.OpenID = "sasdadakdada2";
		Player_Data21.kuang = "80";
		Player_Data21.gao = "80";
		Player_Data21.Posx = 20;
		Player_Data21.Posy = 400;
		Player_Data21.ImgNum = 3; // 选择3号角色
		Player_Data21.ImgDC = new Image();
		Player_Data21.ImgDC.src = "img/runner-small2.png";
		Player_Data21.XuanZhaun = "0";
		Player_Data21.IsHead = false;
		Player_Data21.EntryTX = true; // 新加入的特效，播放后直接就false

		PlayerList.push(Player_Data21);
	}

	//15 player
	if(true) {

		var Player_Data21 = new Object;
		Player_Data21.type = "player";
		Player_Data21.type2 = "";
		Player_Data21.Name = "test2";
		Player_Data21.Hp = 2000;
		Player_Data21.OpenID = "sasdadakdada2";
		Player_Data21.kuang = "110";
		Player_Data21.gao = "110";
		Player_Data21.Posx = 30;
		Player_Data21.Posy = 450;
		Player_Data21.ImgNum = 4; // 选择4号角色
		Player_Data21.ImgDC = new Image();
		Player_Data21.ImgDC.src = "img/feijiP2.png";
		Player_Data21.XuanZhaun = "0";
		Player_Data21.IsHead = false;
		Player_Data21.EntryTX = true; // 新加入的特效，播放后直接就false

		PlayerList.push(Player_Data21);
	}

	//16  特效篝火
	if(true) {

		var Player_Data21 = new Object;
		Player_Data21.type = "TX_gouhuo";
		Player_Data21.type2 = "";
		Player_Data21.Name = "test2";
		Player_Data21.Hp = 2000;
		Player_Data21.OpenID = "sasdadakdada2";
		Player_Data21.kuang = "50";
		Player_Data21.gao = "50";
		Player_Data21.Posx = 1050;
		Player_Data21.Posy = 40;
		Player_Data21.ImgNum = 4; // 选择4号角色
		Player_Data21.ImgDC = new Image();
		Player_Data21.ImgDC.src = "img/texiao/gouhuo/86-1.png";
		Player_Data21.XuanZhaun = "0";
		Player_Data21.IsHead = false;
		Player_Data21.EntryTX = true; // 新加入的特效，播放后直接就false

		PlayerList.push(Player_Data21);
	};

	//17  特效爆炸
	if(true) {

		var Player_Data21 = new Object;
		Player_Data21.type = "TX_baozha";
		Player_Data21.type2 = "";
		Player_Data21.Name = "test2";
		Player_Data21.Hp = 2000;
		Player_Data21.OpenID = "sasdadakdada2";
		Player_Data21.kuang = "60";
		Player_Data21.gao = "60";
		Player_Data21.Posx = 600;
		Player_Data21.Posy = 40;
		Player_Data21.ImgNum = 4; // 选择4号角色
		Player_Data21.ImgDC = new Image();
		Player_Data21.ImgDC.src = "img/texiao/baozha/220000.png";
		Player_Data21.XuanZhaun = "0";
		Player_Data21.IsHead = false;
		Player_Data21.EntryTX = false; // 新加入的特效，播放后直接就false

		PlayerList.push(Player_Data21);
	};

	//18 军车1
	if(true) {
		var Player_Data21 = new Object;
		Player_Data21.type = "junche";
		Player_Data21.type2 = "";
		Player_Data21.Name = "test2";
		Player_Data21.Hp = 2000;
		Player_Data21.OpenID = "sasdadakdada2";
		Player_Data21.kuang = "60";
		Player_Data21.gao = "60";
		Player_Data21.Posx = 1020;
		Player_Data21.Posy = 10;
		Player_Data21.ImgNum = 4; // 选择4号角色
		Player_Data21.ImgDC = new Image();
		Player_Data21.ImgDC.src = "img/junche.png";
		Player_Data21.XuanZhaun = "0";
		Player_Data21.IsHead = false;
		Player_Data21.EntryTX = true; // 新加入的特效，播放后直接就false
		PlayerList.push(Player_Data21);
	};

	//19 军车2
	if(true) {
		var Player_Data21 = new Object;
		Player_Data21.type = "junche";
		Player_Data21.type2 = "";
		Player_Data21.Name = "test2";
		Player_Data21.Hp = 2000;
		Player_Data21.OpenID = "sasdadakdada2";
		Player_Data21.kuang = "80";
		Player_Data21.gao = "80";
		Player_Data21.Posx = 920;
		Player_Data21.Posy = 720;
		Player_Data21.ImgNum = 4; // 选择4号角色
		Player_Data21.ImgDC = new Image();
		Player_Data21.ImgDC.src = "img/junche1.png";
		Player_Data21.XuanZhaun = "0";
		Player_Data21.IsHead = false;
		Player_Data21.EntryTX = true; // 新加入的特效，播放后直接就false
		PlayerList.push(Player_Data21);
	};

	//20 军车资源
	if(true) {
		var Player_Data21 = new Object;
		Player_Data21.type = "junche";
		Player_Data21.type2 = "";
		Player_Data21.Name = "test2";
		Player_Data21.Hp = 2000;
		Player_Data21.OpenID = "sasdadakdada2";
		Player_Data21.kuang = "100";
		Player_Data21.gao = "100";
		Player_Data21.Posx = 990;
		Player_Data21.Posy = 700;
		Player_Data21.ImgNum = 4; // 选择4号角色
		Player_Data21.ImgDC = new Image();
		Player_Data21.ImgDC.src = "img/junziyuan.png";
		Player_Data21.XuanZhaun = "0";
		Player_Data21.IsHead = false;
		Player_Data21.EntryTX = true; // 新加入的特效，播放后直接就false
		PlayerList.push(Player_Data21);
	};

	//21 敌对坦克1
	if(true) {

		var Player_Data21 = new Object;
		Player_Data21.type = "AI_Tank";
		Player_Data21.type2 = "";
		Player_Data21.Name = "test2";
		Player_Data21.Hp = 2000;
		Player_Data21.OpenID = "sasdadakdada2";
		Player_Data21.kuang = "80";
		Player_Data21.gao = "80";
		Player_Data21.Posx = 1050;
		Player_Data21.Posy = 290;
		Player_Data21.ImgNum = 4; // 选择4号角色
		Player_Data21.ImgDC = new Image();
		Player_Data21.ImgDC.src = "img/role/di1_tank/unittank22base004.png";
		Player_Data21.XuanZhaun = "0";
		Player_Data21.IsHead = false;
		Player_Data21.EntryTX = true; // 新加入的特效，播放后直接就false

		PlayerList.push(Player_Data21);
	};

	//22 敌对坦克2
	if(true) {

		var Player_Data21 = new Object;
		Player_Data21.type = "AI_Tank";
		Player_Data21.type2 = "";
		Player_Data21.Name = "test2";
		Player_Data21.Hp = 2000;
		Player_Data21.OpenID = "sasdadakdada2";
		Player_Data21.kuang = "80";
		Player_Data21.gao = "80";
		Player_Data21.Posx = 1050;
		Player_Data21.Posy = 320;
		Player_Data21.ImgNum = 4; // 选择4号角色
		Player_Data21.ImgDC = new Image();
		Player_Data21.ImgDC.src = "img/role/di2_tank/unittank2base004.png";
		Player_Data21.XuanZhaun = "0";
		Player_Data21.IsHead = false;
		Player_Data21.EntryTX = true; // 新加入的特效，播放后直接就false

		PlayerList.push(Player_Data21);
	};

	//23 敌--地对空2
	if(true) {

		var Player_Data21 = new Object;
		Player_Data21.type = "TX_gouhuo";
		Player_Data21.type2 = "";
		Player_Data21.Name = "test2";
		Player_Data21.Hp = 2000;
		Player_Data21.OpenID = "sasdadakdada2";
		Player_Data21.kuang = "80";
		Player_Data21.gao = "80";
		Player_Data21.Posx = 920;
		Player_Data21.Posy = 160;
		Player_Data21.ImgNum = 4; // 选择4号角色
		Player_Data21.ImgDC = new Image();
		Player_Data21.ImgDC.src = "img/role/di4_diduikong/unitbmr4base004.png";
		Player_Data21.XuanZhaun = "0";
		Player_Data21.IsHead = false;
		Player_Data21.EntryTX = true; // 新加入的特效，播放后直接就false

		PlayerList.push(Player_Data21);
	};

	//24 敌--地对空2
	if(true) {

		var Player_Data21 = new Object;
		Player_Data21.type = "TX_gouhuo";
		Player_Data21.type2 = "";
		Player_Data21.Name = "test2";
		Player_Data21.Hp = 2000;
		Player_Data21.OpenID = "sasdadakdada2";
		Player_Data21.kuang = "80";
		Player_Data21.gao = "80";
		Player_Data21.Posx = 900;
		Player_Data21.Posy = 600;
		Player_Data21.ImgNum = 4; // 选择4号角色
		Player_Data21.ImgDC = new Image();
		Player_Data21.ImgDC.src = "img/role/di3_diduikong/unitbmr3base004.png";
		Player_Data21.XuanZhaun = "0";
		Player_Data21.IsHead = false;
		Player_Data21.EntryTX = true; // 新加入的特效，播放后直接就false

		PlayerList.push(Player_Data21);
	};

	//25敌--坦克炮弹1
	if(true) {

		var Player_Data21 = new Object;
		Player_Data21.type = "TK_Boom_AI_1";
		Player_Data21.type2 = "";
		Player_Data21.Name = "test2";
		Player_Data21.Hp = 2000;
		Player_Data21.OpenID = "sasdadakdada2";
		Player_Data21.kuang = "15";
		Player_Data21.gao = "15";
		Player_Data21.Posx = 110;
		Player_Data21.Posy = 110;
		Player_Data21.ImgNum = 4; // 选择4号角色
		Player_Data21.ImgDC = new Image();
		Player_Data21.ImgDC.src = "img/d_boss_boom.png";
		Player_Data21.XuanZhaun = "0";
		Player_Data21.IsHead = false;
		Player_Data21.EntryTX = true; // 新加入的特效，播放后直接就false

		PlayerList.push(Player_Data21);
	};

	//26敌--坦克炮弹2
	if(true) {

		var Player_Data21 = new Object;
		Player_Data21.type = "TK_Boom_AI_2";
		Player_Data21.type2 = "";
		Player_Data21.Name = "test2";
		Player_Data21.Hp = 2000;
		Player_Data21.OpenID = "sasdadakdada2";
		Player_Data21.kuang = "15";
		Player_Data21.gao = "15";
		Player_Data21.Posx = 110;
		Player_Data21.Posy = 110;
		Player_Data21.ImgNum = 4; // 选择4号角色
		Player_Data21.ImgDC = new Image();
		Player_Data21.ImgDC.src = "img/d_boss_boom.png";
		Player_Data21.XuanZhaun = "0";
		Player_Data21.IsHead = false;
		Player_Data21.EntryTX = true; // 新加入的特效，播放后直接就false

		PlayerList.push(Player_Data21);
	};

	//27友1坦克--坦克炮弹1
	if(true) {

		var Player_Data21 = new Object;
		Player_Data21.type = "TK_Boom_1";
		Player_Data21.type2 = "";
		Player_Data21.Name = "test2";
		Player_Data21.Hp = 2000;
		Player_Data21.OpenID = "sasdadakdada2";
		Player_Data21.kuang = "15";
		Player_Data21.gao = "15";
		Player_Data21.Posx = -20;
		Player_Data21.Posy = -20;
		Player_Data21.ImgNum = 4; // 选择4号角色
		Player_Data21.ImgDC = new Image();
		Player_Data21.ImgDC.src = "img/d_boss_boom.png";
		Player_Data21.XuanZhaun = "0";
		Player_Data21.IsHead = false;
		Player_Data21.EntryTX = true; // 新加入的特效，播放后直接就false

		PlayerList.push(Player_Data21);
	};

	//28友14坦克--坦克炮弹1
	if(true) {

		var Player_Data21 = new Object;
		Player_Data21.type = "TK_Boom_2";
		Player_Data21.type2 = "";
		Player_Data21.Name = "test2";
		Player_Data21.Hp = 2000;
		Player_Data21.OpenID = "sasdadakdada2";
		Player_Data21.kuang = "15";
		Player_Data21.gao = "15";
		Player_Data21.Posx = -20;
		Player_Data21.Posy = -20;
		Player_Data21.ImgNum = 4; // 选择4号角色
		Player_Data21.ImgDC = new Image();
		Player_Data21.ImgDC.src = "img/d_boss_boom.png";
		Player_Data21.XuanZhaun = "0";
		Player_Data21.IsHead = false;
		Player_Data21.EntryTX = true; // 新加入的特效，播放后直接就false

		PlayerList.push(Player_Data21);
	};

	//29友0飞机--飞机炮弹1
	if(true) {

		var Player_Data21 = new Object;
		Player_Data21.type = "FJ_Boom_1";
		Player_Data21.type2 = "";
		Player_Data21.Name = "test2";
		Player_Data21.Hp = 2000;
		Player_Data21.OpenID = "sasdadakdada2";
		Player_Data21.kuang = "15";
		Player_Data21.gao = "15";
		Player_Data21.Posx = -20;
		Player_Data21.Posy = -20;
		Player_Data21.ImgNum = 4; // 选择4号角色
		Player_Data21.ImgDC = new Image();
		Player_Data21.ImgDC.src = "img/d_boss_boom_v2.png";
		Player_Data21.XuanZhaun = "0";
		Player_Data21.IsHead = false;
		Player_Data21.EntryTX = true; // 新加入的特效，播放后直接就false

		PlayerList.push(Player_Data21);
	};

	// 30友15飞机--飞机炮弹2
	if(true) {

		var Player_Data21 = new Object;
		Player_Data21.type = "FJ_Boom_2";
		Player_Data21.type2 = "";
		Player_Data21.Name = "test2";
		Player_Data21.Hp = 2000;
		Player_Data21.OpenID = "sasdadakdada2";
		Player_Data21.kuang = "15";
		Player_Data21.gao = "15";
		Player_Data21.Posx = -20;
		Player_Data21.Posy = -20;
		Player_Data21.ImgNum = 4; // 选择4号角色
		Player_Data21.ImgDC = new Image();
		Player_Data21.ImgDC.src = "img/d_boss_boom_v2.png";
		Player_Data21.XuanZhaun = "0";
		Player_Data21.IsHead = false;
		Player_Data21.EntryTX = true; // 新加入的特效，播放后直接就false

		PlayerList.push(Player_Data21);
	};

	//31  特效爆炸 0 飞机特效
	if(true) {

		var Player_Data21 = new Object;
		Player_Data21.type = "TX_baozha0";
		Player_Data21.type2 = "";
		Player_Data21.Name = "test2";
		Player_Data21.Hp = 2000;
		Player_Data21.OpenID = "sasdadakdada2";
		Player_Data21.kuang = "100";
		Player_Data21.gao = "100";
		Player_Data21.Posx = 600;
		Player_Data21.Posy = 40;
		Player_Data21.ImgNum = 4; // 选择4号角色
		Player_Data21.ImgDC = new Image();
		Player_Data21.ImgDC.src = "img/texiao/baozha/220000.png";
		Player_Data21.XuanZhaun = "0";
		Player_Data21.IsHead = false;
		Player_Data21.EntryTX = false; // 新加入的特效，播放后直接就false

		PlayerList.push(Player_Data21);
	};

	//32  特效爆炸 1 坦克特效
	if(true) {

		var Player_Data21 = new Object;
		Player_Data21.type = "TX_baozha1";
		Player_Data21.type2 = "";
		Player_Data21.Name = "test2";
		Player_Data21.Hp = 2000;
		Player_Data21.OpenID = "sasdadakdada2";
		Player_Data21.kuang = "100";
		Player_Data21.gao = "100";
		Player_Data21.Posx = 600;
		Player_Data21.Posy = 40;
		Player_Data21.ImgNum = 4; // 选择4号角色
		Player_Data21.ImgDC = new Image();
		Player_Data21.ImgDC.src = "img/texiao/baozha/220000.png";
		Player_Data21.XuanZhaun = "0";
		Player_Data21.IsHead = false;
		Player_Data21.EntryTX = false; // 新加入的特效，播放后直接就false

		PlayerList.push(Player_Data21);
	};

	//33  特效爆炸 14 坦克特效
	if(true) {

		var Player_Data21 = new Object;
		Player_Data21.type = "TX_baozha14";
		Player_Data21.type2 = "";
		Player_Data21.Name = "test2";
		Player_Data21.Hp = 2000;
		Player_Data21.OpenID = "sasdadakdada2";
		Player_Data21.kuang = "100";
		Player_Data21.gao = "100";
		Player_Data21.Posx = 600;
		Player_Data21.Posy = 40;
		Player_Data21.ImgNum = 4; // 选择4号角色
		Player_Data21.ImgDC = new Image();
		Player_Data21.ImgDC.src = "img/texiao/baozha/220000.png";
		Player_Data21.XuanZhaun = "0";
		Player_Data21.IsHead = false;
		Player_Data21.EntryTX = false; // 新加入的特效，播放后直接就false

		PlayerList.push(Player_Data21);
	};

	//34  特效爆炸 15 飞机特效
	if(true) {

		var Player_Data21 = new Object;
		Player_Data21.type = "TX_baozha15";
		Player_Data21.type2 = "";
		Player_Data21.Name = "test2";
		Player_Data21.Hp = 2000;
		Player_Data21.OpenID = "sasdadakdada2";
		Player_Data21.kuang = "60";
		Player_Data21.gao = "60";
		Player_Data21.Posx = 600;
		Player_Data21.Posy = 40;
		Player_Data21.ImgNum = 4; // 选择4号角色
		Player_Data21.ImgDC = new Image();
		Player_Data21.ImgDC.src = "img/texiao/baozha/220000.png";
		Player_Data21.XuanZhaun = "0";
		Player_Data21.IsHead = false;
		Player_Data21.EntryTX = false; // 新加入的特效，播放后直接就false

		PlayerList.push(Player_Data21);
	};

	//console.log(ws_url)
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
	// 二维码生成参数
	// 参数说明=时间 + 用户名ID
	var myDate = new Date();
	//  var Player_Data = "|"+"用户ID"+"|"+ myDate;
	var Player_Data = "";
	ServerID = myDate.getTime() + myDate.getMilliseconds() + Player_Data
	// console.log("-----------ServerID:", ServerID);
	GameTime = ServerID;
	//var EWMTime = "http://www.babaliuliu:8866/h5.html?Time=" + ServerID;
	//var EWMTime = "http://192.168.199.12:8020/babaliuliumobi/index.html?Time=" + ServerID;
	var EWMTime = "http://www.iyplay.com/babaliuliumobi/index.html?Time=" + ServerID;
	if(IsDebug) {
		EWMTime = "http://" + https_IIS_IP + ":" + https_IIS_port + "/babaliuliumobi/index.html?Time=" + ServerID;

	}
	// 二维码生产函数
	Auto_QRCode(EWMTime);
	// 链接网络
	login();
}

// 关闭网络接口函数
function onClose(evt) {
	console.log("DISCONNECTED");
	XinTiaoKaiGuan = false;
	alert("Link server failed, please refresh the browser relink!");
	location.href = 'http://www.babaliuliu.com';
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
					alert("Link server failed, please refresh the browser relink!");
					location.href = 'http://www.iyplay.com';
					return
				} else if(obj.Type == "3") {
					//console.log("报名成功！！！", obj.StrBaoMing);
					ServerID_MD5 = obj.StrBaoMing;
				}
			}
			break;
		case 14: // 转发协议
			{
				var Openid = obj.MuBiaoID // 自己的ID信息
				// 先获取是绑定的那个角色--是坦克还是飞机
				var palyerRole = obj.RoleNum; // 选择的角色账号
				if(obj.Type == "2") { // 手机发给PC的，否则不处理

					//console.log("手机操作角色移动RoleNum：", palyerRole);
					//console.log("手机操作角色移动Openid：", Openid);

					var Datalist = ChaiFenString(obj.Data, "|") // 方向|特殊武器使用|攻击武器使用 
					//console.log("手机操作角色移动Datalist：", Datalist);

					// PlayerList[0]:飞机    PlayerList[1]:坦克   PlayerList[14]:坦克   PlayerList[15]:飞机
					var id = 0;
					if(palyerRole == "1") {
						id = "0";
					} else if(palyerRole == "2") {
						id = "1";
					} else if(palyerRole == "3") {
						id = "14";
					} else if(palyerRole == "4") {
						id = "15";
					}
					// 1 移动方向
					if(Datalist[0] == 'before') {
						// 屏幕左方
						if(id == "0") {
							PlayerList[id].ImgDC.src = "img/role/you1_feiji/unitair11base000.png";
						} else if(id == "1") {
							PlayerList[id].ImgDC.src = "img/role/you3_tank/unitbmp2base000.png";
						} else if(id == "14") {
							PlayerList[id].ImgDC.src = "img/role/you4_tank/unitcannon3base000.png";
						} else if(id == "15") {
							PlayerList[id].ImgDC.src = "img/role/you2_feiji/unitair12base000.png";
						}
						// 数据移动
						PlayerList[id].Posx += 10;

					} else if(Datalist[0] == 'left') {
						// 屏幕下方
						if(id == "0") {
							PlayerList[id].ImgDC.src = "img/role/you1_feiji/unitair11base006.png";
						} else if(id == "1") {
							PlayerList[id].ImgDC.src = "img/role/you3_tank/unitbmp2base006.png";
						} else if(id == "14") {
							PlayerList[id].ImgDC.src = "img/role/you4_tank/unitcannon3base006.png";
						} else if(id == "15") {
							PlayerList[id].ImgDC.src = "img/role/you2_feiji/unitair12base006.png";
						}
						// 数据移动
						PlayerList[id].Posy += 10;
					} else if(Datalist[0] == 'right') {
						// 屏幕上方
						if(id == "0") {
							PlayerList[id].ImgDC.src = "img/role/you1_feiji/unitair11base002.png";
						} else if(id == "1") {
							PlayerList[id].ImgDC.src = "img/role/you3_tank/unitbmp2base002.png";
						} else if(id == "14") {
							PlayerList[id].ImgDC.src = "img/role/you4_tank/unitcannon3base002.png";
						} else if(id == "15") {
							PlayerList[id].ImgDC.src = "img/role/you2_feiji/unitair12base002.png";
						}
						// 数据移动
						PlayerList[id].Posy -= 10;
					} else if(Datalist[0] == 'after') {
						// 屏幕右方
						if(id == "0") {
							PlayerList[id].ImgDC.src = "img/role/you1_feiji/unitair11base004.png";
						} else if(id == "1") {
							PlayerList[id].ImgDC.src = "img/role/you3_tank/unitbmp2base004.png";
						} else if(id == "14") {
							PlayerList[id].ImgDC.src = "img/role/you4_tank/unitcannon3base004.png";
						} else if(id == "15") {
							PlayerList[id].ImgDC.src = "img/role/you2_feiji/unitair12base004.png";
						}
						// 数据移动
						PlayerList[id].Posx -= 10;
					};
					// 2 是否使用特殊武器
					if(Datalist[1] == "true") {} else {};
					// 3  是否使用攻击
					if(Datalist[2] == "true") {
						// 炮弹产生的方向
						if(Datalist[0] == 'after') {
							if(palyerRole == "1") { // 角色1

								if(KaiGuan_Feiji1)
									if(PlayerList["29"].Posy != -20) {
										break;
									}
								if(Is_FaShe_Feiji1) {
									KaiGuan_Feiji1 = true;
									Is_FaShe_Feiji1 = false
									PlayerList["29"].Posy = PlayerList[id].Posy + 32;
									PlayerList["29"].Posx = PlayerList[id].Posx;
								}

							} else if(palyerRole == "2") { // 角色2
								if(KaiGuan_Tank5)
									if(PlayerList["27"].Posy != -20) {
										break;
									}
								if(Is_FaShe_Tank1) {
									KaiGuan_Tank5 = true;
									Is_FaShe_Tank1 = false
									PlayerList["27"].Posy = PlayerList[id].Posy + 32;
									PlayerList["27"].Posx = PlayerList[id].Posx;
								}

							} else if(palyerRole == "3") { // 角色3
								if(KaiGuan_Tank7)
									if(PlayerList["28"].Posy != -20) {
										break;
									}
								if(Is_FaShe_Tank2) {
									KaiGuan_Tank7 = true;
									Is_FaShe_Tank2 = false
									PlayerList["28"].Posx = PlayerList[id].Posx + 5;
									PlayerList["28"].Posy = PlayerList[id].Posy + 15;
								}

							} else if(palyerRole == "4") { // 角色4
								if(KaiGuan_Feiji5)
									if(PlayerList["30"].Posy != -20) {
										break;
									}
								if(Is_FaShe_Feiji2) {
									KaiGuan_Feiji5 = true;
									Is_FaShe_Feiji2 = false
									PlayerList["30"].Posy = PlayerList[id].Posy + 32;
									PlayerList["30"].Posx = PlayerList[id].Posx;
								}

							};

						} else if(Datalist[0] == 'right') {

							if(palyerRole == "1") { // 角色1
								if(KaiGuan_Feiji4)
									if(PlayerList["29"].Posy != -20) {
										break;
									}
								if(Is_FaShe_Feiji1) {
									KaiGuan_Feiji4 = true;
									Is_FaShe_Feiji1 = false
									PlayerList["29"].Posy = PlayerList[id].Posy + 32;
									PlayerList["29"].Posx = PlayerList[id].Posx + 40;
								}

							} else if(palyerRole == "2") { // 角色2
								if(KaiGuan_Tank1)
									if(PlayerList["27"].Posy != -20) {
										break;
									}
								if(Is_FaShe_Tank1) {
									KaiGuan_Tank1 = true;
									Is_FaShe_Tank1 = false
									PlayerList["27"].Posy = PlayerList[id].Posy + 20;
									PlayerList["27"].Posx = PlayerList[id].Posx + 32;
								}

							} else if(palyerRole == "3") { // 角色3
								if(KaiGuan_Tank2)
									if(PlayerList["28"].Posy != -20) {
										break;
									}
								if(Is_FaShe_Tank2) {
									KaiGuan_Tank2 = true;
									Is_FaShe_Tank2 = false
									PlayerList["28"].Posy = PlayerList[id].Posy;
									PlayerList["28"].Posx = PlayerList[id].Posx + 32;
								}

							} else if(palyerRole == "4") { // 角色4
								if(KaiGuan_Feiji8)
									if(PlayerList["30"].Posy != -20) {
										break;
									}
								if(Is_FaShe_Feiji2) {
									KaiGuan_Feiji8 = true;
									Is_FaShe_Feiji2 = false
									PlayerList["30"].Posy = PlayerList[id].Posy + 32;
									PlayerList["30"].Posx = PlayerList[id].Posx + 40;
								}

							};

						} else if(Datalist[0] == 'left') {

							if(palyerRole == "1") { // 角色1
								if(KaiGuan_Feiji3)
									if(PlayerList["29"].Posy != -20) {
										break;
									}
								if(Is_FaShe_Feiji1) {
									KaiGuan_Feiji3 = true;
									Is_FaShe_Feiji1 = false
									PlayerList["29"].Posy = PlayerList[id].Posy + 32;
									PlayerList["29"].Posx = PlayerList[id].Posx + 40;
								}

							} else if(palyerRole == "2") { // 角色2
								if(KaiGuan_Tank3)
									if(PlayerList["27"].Posy != -20) {
										break;
									}
								if(Is_FaShe_Tank1) {
									KaiGuan_Tank3 = true;
									Is_FaShe_Tank1 = false
									PlayerList["27"].Posy = PlayerList[id].Posy + 20;
									PlayerList["27"].Posx = PlayerList[id].Posx + 32;
								}

							} else if(palyerRole == "3") { // 角色3

								if(KaiGuan_Tank4)
									if(PlayerList["28"].Posy != -20) {
										break;
									}
								if(Is_FaShe_Tank2) {
									KaiGuan_Tank4 = true;
									Is_FaShe_Tank2 = false
									PlayerList["28"].Posy = PlayerList[id].Posy + 40;
									PlayerList["28"].Posx = PlayerList[id].Posx + 32;
								}

							} else if(palyerRole == "4") { // 角色4
								if(KaiGuan_Feiji7)
									if(PlayerList["30"].Posy != -20) {
										break;
									}
								if(Is_FaShe_Feiji2) {
									KaiGuan_Feiji7 = true;
									Is_FaShe_Feiji2 = false
									PlayerList["30"].Posy = PlayerList[id].Posy + 32;
									PlayerList["30"].Posx = PlayerList[id].Posx + 40;
								}

							};

						} else if(Datalist[0] == 'before') {

							if(palyerRole == "1") { // 角色1

								if(KaiGuan_Feiji2)
									if(PlayerList["29"].Posy != -20) {
										break;
									}
								if(Is_FaShe_Feiji1) {
									KaiGuan_Feiji2 = true;
									Is_FaShe_Feiji1 = false
									PlayerList["29"].Posy = PlayerList[id].Posy + 32;
									PlayerList["29"].Posx = PlayerList[id].Posx + 40;
								}

							} else if(palyerRole == "2") { // 角色2
								if(KaiGuan_Tank6)
									if(PlayerList["27"].Posy != -20) {
										break;
									}
								if(Is_FaShe_Tank1) {
									KaiGuan_Tank6 = true;
									Is_FaShe_Tank1 = false
									PlayerList["27"].Posy = PlayerList[id].Posy + 32;
									PlayerList["27"].Posx = PlayerList[id].Posx + 40;
								}

							} else if(palyerRole == "3") { // 角色3

								if(KaiGuan_Tank8)
									if(PlayerList["28"].Posy != -20) {
										break;
									}
								if(Is_FaShe_Tank2) {
									KaiGuan_Tank8 = true;
									Is_FaShe_Tank2 = false
									PlayerList["28"].Posx = PlayerList[id].Posx + 45;
									PlayerList["28"].Posy = PlayerList[id].Posy + 20;
								}

							} else if(palyerRole == "4") { // 角色4

								if(KaiGuan_Feiji6)
									if(PlayerList["30"].Posy != -20) {
										break;
									}
								if(Is_FaShe_Feiji2) {
									KaiGuan_Feiji6 = true;
									Is_FaShe_Feiji2 = false
									PlayerList["30"].Posy = PlayerList[id].Posy + 32;
									PlayerList["30"].Posx = PlayerList[id].Posx + 40;
								}

							};

						};
					};
					// 保存方向
					PlayerList[id].XuanZhaun = Datalist[0];
				} else if(obj.Type == "3") { // 选择角色

					var id = 0;
					// PlayerList[0]:飞机    PlayerList[1]:坦克   PlayerList[14]:坦克   PlayerList[15]:飞机
					if(palyerRole == "1") {
						id = "0";
					} else if(palyerRole == "2") {
						id = "1";
					} else if(palyerRole == "3") {
						id = "14";
					} else if(palyerRole == "4") {
						id = "15";
					}
					// 绑定数据
					PlayerList[id].Name = palyername;
					PlayerList[id].OpenID = palyerOpenID;
					console.log("手机选择角色成功");
				}

			}
			break;
		case 15: //手机报名成功 推送给PC
			{
				var palyerheadurl = obj.HeadUrl;
				var palyername = obj.Name;
				var palyerOpenID = obj.BaoMingID;
				var palyerjifen = obj.JiFen;
				var palyerRole = obj.RoleNum; // 选择的角色账号
				if(Role_Is_Choose[palyerRole - 1] == false) {
					console.log("手机已经进入游戏palyerOpenID：", palyerOpenID);
					Role_Is_Choose[palyerRole - 1] = true;
				} else {
					// 角色已经被选择，重新选择
					var icount = 0;
					for(var i = 0; i < 4; i++) {
						var role_FT = Role_Is_Choose[i];
						if(role_FT) {
							icount++;
						}
					};
					if(icount == 4) {
						Chang_Role_Data(100);
					} else {
						Chang_Role_Data(icount);
					}

				}

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
// 角色是否被选中
var Role_Is_Choose = [false, false, false, false]

// 错误日志函数
function onError(evt) {
	//console.log('<span style="color: red;">ERROR:</span> ' + evt.data);
	XinTiaoKaiGuan = false;
}

// 发送数据函数
function doSend(message) {
	//console.log("SENT: " + message);
	//console.log('<span style="color: blue;">RESPONSE: ' + base64encode(message) + '</span>');
	ws_socket.send(message);
}

// 更改角色
function Chang_Role_Data(RoleID) {

	var json = {
		Protocol: 3,
		Protocol2: 14,
		Type: "1",
		RoleNum: RoleID,
	};
	var goServerJson = JSON.stringify(json);
	doSend(goServerJson);
}

// 登陆用户
function login() {

	var json = {
		Protocol: 3,
		Protocol2: 13,
		Type: "1",
		StrBaoMing: ServerID,
	};
	var goServerJson = JSON.stringify(json);
	doSend(goServerJson);
	XinTiaoKaiGuan = true;
}

// 心跳协议
function XinTiao() {

	if(ServerID_MD5.length == 0) {
		return
	}

	var json = {
		Protocol: 3,
		Protocol2: 1,
		OpenID: ServerID_MD5,
	};
	var goServerJson = JSON.stringify(json);
	doSend(goServerJson);
}

//----------------------------------tank--------------------------------------

var Is_FaShe_Tank1 = true;
var KaiGuan_Tank1 = false; // g

//炮弹坦克1
function Player_Tank_Boom() {
	if(KaiGuan_Tank1) {
		PlayerList["27"].Posy -= 0.09;
		if(PlayerList["27"].Posy < 0) {
			// 可以继续发射
			PlayerList["27"].Posy = -20;
			Is_FaShe_Tank1 = true;
			KaiGuan_Tank1 = false;
		}
	}
	Player_Tank_Boom2();
	Player_Tank_Boom3();
	Player_Tank_Boom4();
	Player_Tank_Boom5();
	Player_Tank_Boom6();
	Player_Tank_Boom7();
	Player_Tank_Boom8();
	// 飞机
	Player_Feiji_Boom();
	Player_Feiji_Boom2();
	Player_Feiji_Boom3();
	Player_Feiji_Boom4();
	Player_Feiji_Boom5();
	Player_Feiji_Boom6();
	Player_Feiji_Boom7();
	Player_Feiji_Boom8();
	// 炮弹边缘检测
	FeiJi_Boom_Data_JianCe();
	return
}

var Is_FaShe_Tank3 = true;
var KaiGuan_Tank3 = false; // g
//炮弹坦克1
function Player_Tank_Boom3() {
	if(KaiGuan_Tank3) {
		PlayerList["27"].Posy += 0.09;
		if(PlayerList["27"].Posy > 800) {
			// 可以继续发射
			PlayerList["27"].Posy = -20;
			Is_FaShe_Tank1 = true;
			KaiGuan_Tank3 = false;
			Boom_30_kaiguan = true;
			Boom_30_kaiguan_AITank1 = true;
			Boom_30_kaiguan_AITank2 = true;
			Boom_30_kaiguan_AITank3 = true;
		}
	}
	return
}

var Is_FaShe_Tank5 = true;
var KaiGuan_Tank5 = false; // g
//炮弹坦克1
function Player_Tank_Boom5() {
	if(KaiGuan_Tank5) {
		PlayerList["27"].Posx -= 0.09;
		if(PlayerList["27"].Posx < 0) {
			// 可以继续发射
			PlayerList["27"].Posy = -20;
			Is_FaShe_Tank1 = true;
			KaiGuan_Tank5 = false;
			Boom_30_kaiguan = true;
			Boom_30_kaiguan_AITank1 = true;
			Boom_30_kaiguan_AITank2 = true;
			Boom_30_kaiguan_AITank3 = true;
		}
	}
	return
}

var Is_FaShe_Tank6 = true;
var KaiGuan_Tank6 = false; // g
//炮弹坦克1
function Player_Tank_Boom6() {
	if(KaiGuan_Tank6) {
		PlayerList["27"].Posx += 0.09;
		if(PlayerList["27"].Posx > 1200) {
			// 可以继续发射
			PlayerList["27"].Posy = -20;
			Is_FaShe_Tank1 = true;
			KaiGuan_Tank6 = false;
			Boom_30_kaiguan = true;
			Boom_30_kaiguan_AITank1 = true;
			Boom_30_kaiguan_AITank2 = true;
			Boom_30_kaiguan_AITank3 = true;
		}
	}
	return
}

var Is_FaShe_Tank2 = true;
var KaiGuan_Tank2 = false; // g
//炮弹坦克1
function Player_Tank_Boom2() {
	if(KaiGuan_Tank2) {
		PlayerList["28"].Posy -= 0.094;
		if(PlayerList["28"].Posy < 0) {
			// 可以继续发射
			PlayerList["28"].Posy = -20;
			Is_FaShe_Tank2 = true;
			KaiGuan_Tank2 = false;
			Boom_30_kaiguan = true;
			Boom_30_kaiguan_AITank1 = true;
			Boom_30_kaiguan_AITank2 = true;
			Boom_30_kaiguan_AITank3 = true;
		}
	}
	return
}

var Is_FaShe_Tank4 = true;
var KaiGuan_Tank4 = false; // g
//炮弹坦克1
function Player_Tank_Boom4() {
	if(KaiGuan_Tank4) {
		PlayerList["28"].Posy += 0.094;
		if(PlayerList["28"].Posy > 800) {
			// 可以继续发射
			PlayerList["28"].Posy = -20;
			Is_FaShe_Tank2 = true;
			KaiGuan_Tank4 = false;
			Boom_30_kaiguan = true;
			Boom_30_kaiguan_AITank1 = true;
			Boom_30_kaiguan_AITank2 = true;
			Boom_30_kaiguan_AITank3 = true;
		}
	}
	return
}

var Is_FaShe_Tank7 = true;
var KaiGuan_Tank7 = false; // g
//炮弹坦克1
function Player_Tank_Boom7() {
	if(KaiGuan_Tank7) {
		PlayerList["28"].Posx -= 0.094;
		if(PlayerList["28"].Posx < 0) {
			// 可以继续发射
			PlayerList["28"].Posy = -20;
			Is_FaShe_Tank2 = true;
			KaiGuan_Tank7 = false;
			Boom_30_kaiguan = true;
			Boom_30_kaiguan_AITank1 = true;
			Boom_30_kaiguan_AITank2 = true;
			Boom_30_kaiguan_AITank3 = true;
		}
	}
	return
}

var Is_FaShe_Tank8 = true;
var KaiGuan_Tank8 = false; // g
//炮弹坦克1
function Player_Tank_Boom8() {
	if(KaiGuan_Tank8) {
		PlayerList["28"].Posx += 0.094;
		if(PlayerList["28"].Posx > 1200) {
			// 可以继续发射
			PlayerList["28"].Posy = -20;
			Is_FaShe_Tank2 = true;
			KaiGuan_Tank8 = false;
			Boom_30_kaiguan = true;
			Boom_30_kaiguan_AITank1 = true;
			Boom_30_kaiguan_AITank2 = true;
			Boom_30_kaiguan_AITank3 = true;
		}
	}
	return
}
//-----------------------------------------------------------------------------

//-------------------------------------feiji-----------------------------------

var Is_FaShe_Feiji1 = true;
var KaiGuan_Feiji1 = false;

// 炮弹飞机1
// after 方向
function Player_Feiji_Boom() {
	if(KaiGuan_Feiji1) {
		PlayerList["29"].Posx -= 0.09;
		if(PlayerList["29"].Posx < 0) {
			// 可以继续发射
			PlayerList["29"].Posy = -20;
			Is_FaShe_Feiji1 = true;
			KaiGuan_Feiji1 = false;
			Boom_30_kaiguan = true;
			Boom_30_kaiguan_AITank1 = true;
			Boom_30_kaiguan_AITank2 = true;
			Boom_30_kaiguan_AITank3 = true;
		}
	}
	return
}

var KaiGuan_Feiji2 = false;
// 炮弹飞机1
// before方向
function Player_Feiji_Boom2() {
	if(KaiGuan_Feiji2) {
		PlayerList["29"].Posx += 0.09;
		if(PlayerList["29"].Posx > 1200) {
			// 可以继续发射
			PlayerList["29"].Posy = -20;
			Is_FaShe_Feiji1 = true;
			KaiGuan_Feiji2 = false;
			Boom_30_kaiguan = true;
			Boom_30_kaiguan_AITank1 = true;
			Boom_30_kaiguan_AITank2 = true;
			Boom_30_kaiguan_AITank3 = true;
		}
	}
	return
}

var KaiGuan_Feiji3 = false;
// 炮弹飞机1
// left方向
function Player_Feiji_Boom3() {
	if(KaiGuan_Feiji3) {
		PlayerList["29"].Posy += 0.09;
		if(PlayerList["29"].Posy > 800) {
			// 可以继续发射
			PlayerList["29"].Posy = -20;
			Is_FaShe_Feiji1 = true;
			KaiGuan_Feiji3 = false;
			Boom_30_kaiguan = true;
			Boom_30_kaiguan_AITank1 = true;
			Boom_30_kaiguan_AITank2 = true;
			Boom_30_kaiguan_AITank3 = true;
		}
	}
	return
}

var KaiGuan_Feiji4 = false;
// 炮弹飞机1
// rigth方向
function Player_Feiji_Boom4() {
	if(KaiGuan_Feiji4) {
		PlayerList["29"].Posy -= 0.09;
		if(PlayerList["29"].Posy < 0) {
			// 可以继续发射
			PlayerList["29"].Posy = -20;
			Is_FaShe_Feiji1 = true;
			KaiGuan_Feiji4 = false;
			Boom_30_kaiguan = true;
			Boom_30_kaiguan_AITank1 = true;
			Boom_30_kaiguan_AITank2 = true;
			Boom_30_kaiguan_AITank3 = true;
		}
	}
	return
}

var Is_FaShe_Feiji2 = true;
var KaiGuan_Feiji5 = false;

// 炮弹飞机2
// after 方向
function Player_Feiji_Boom5() {
	if(KaiGuan_Feiji5) {
		PlayerList["30"].Posx -= 0.09;
		if(PlayerList["30"].Posx < 0) {
			// 可以继续发射
			PlayerList["30"].Posy = -20;
			Is_FaShe_Feiji2 = true;
			KaiGuan_Feiji5 = false;
			Boom_30_kaiguan = true;
			Boom_30_kaiguan_AITank1 = true;
			Boom_30_kaiguan_AITank2 = true;
			Boom_30_kaiguan_AITank3 = true;
		}
	}
	return
}

var KaiGuan_Feiji6 = false;
// 炮弹飞机2
// before方向
function Player_Feiji_Boom6() {
	if(KaiGuan_Feiji6) {
		PlayerList["30"].Posx += 0.09;
		if(PlayerList["30"].Posx > 1200) {
			// 可以继续发射
			PlayerList["30"].Posy = -20;
			Is_FaShe_Feiji2 = true;
			KaiGuan_Feiji6 = false;
			Boom_30_kaiguan = true;
			Boom_30_kaiguan_AITank1 = true;
			Boom_30_kaiguan_AITank2 = true;
			Boom_30_kaiguan_AITank3 = true;
		}
	}
	return
}

var KaiGuan_Feiji7 = false;
// 炮弹飞机2
// left方向
function Player_Feiji_Boom7() {
	if(KaiGuan_Feiji7) {
		PlayerList["30"].Posy += 0.09;
		if(PlayerList["30"].Posy > 800) {
			// 可以继续发射
			PlayerList["30"].Posy = -20;
			Is_FaShe_Feiji2 = true;
			KaiGuan_Feiji7 = false;
			Boom_30_kaiguan = true;
			Boom_30_kaiguan_AITank1 = true;
			Boom_30_kaiguan_AITank2 = true;
			Boom_30_kaiguan_AITank3 = true;
		}
	}
	return
}

var KaiGuan_Feiji8 = false;
// 炮弹飞机2
// rigth方向
function Player_Feiji_Boom8() {
	if(KaiGuan_Feiji8) {
		PlayerList["30"].Posy -= 0.09;
		if(PlayerList["30"].Posy < 0) {
			// 可以继续发射
			PlayerList["30"].Posy = -20;
			Is_FaShe_Feiji2 = true;
			KaiGuan_Feiji8 = false;
			Boom_30_kaiguan = true;
			Boom_30_kaiguan_AITank1 = true;
			Boom_30_kaiguan_AITank2 = true;
			Boom_30_kaiguan_AITank3 = true;
		}
	}
	return
}

//-----------------------------------------------------------------------------

//------------------------------------碰撞检测--------------------------------
// boss 2
// tank——ai 21
// tank——ai 22

// feiji1  0
// tank1   1
// tank2   14
// feiji2  15

// 飞机导弹检测
//PlayerList[id].XuanZhaun
function FeiJi_Boom_Data_JianCe() {

	if(Game_JianCe_Boom1(PlayerList["29"].Posx, PlayerList["29"].Posy, 1000)) {
		if(PlayerList["0"].XuanZhaun == "before") {
			PlayerList["29"].Posx = 1201;
		} else if(PlayerList["0"].XuanZhaun == "after") {
			PlayerList["29"].Posx = -1;
		} else if(PlayerList["0"].XuanZhaun == "left") {
			PlayerList["29"].Posy = 801;
		} else if(PlayerList["0"].XuanZhaun == "right") {
			PlayerList["29"].Posy = -1;
		}
	};

	if(Game_JianCe_Boom2(PlayerList["30"].Posx, PlayerList["30"].Posy, 1000)) {
		if(PlayerList["15"].XuanZhaun == "before") {
			PlayerList["30"].Posx = 1201;
		} else if(PlayerList["15"].XuanZhaun == "after") {
			PlayerList["30"].Posx = -1;
		} else if(PlayerList["15"].XuanZhaun == "left") {
			PlayerList["30"].Posy = 801;
		} else if(PlayerList["15"].XuanZhaun == "right") {
			PlayerList["30"].Posy = -1;
		}
	};
	if(Game_JianCe_Boom3(PlayerList["28"].Posx, PlayerList["28"].Posy, 1000)) {
		if(PlayerList["14"].XuanZhaun == "before") {
			PlayerList["28"].Posx = 1201;
		} else if(PlayerList["14"].XuanZhaun == "after") {
			PlayerList["28"].Posx = -1;
		} else if(PlayerList["14"].XuanZhaun == "left") {
			PlayerList["28"].Posy = 801;
		} else if(PlayerList["14"].XuanZhaun == "right") {
			PlayerList["28"].Posy = -1;
		}
	};
	if(Game_JianCe_Boom4(PlayerList["27"].Posx, PlayerList["27"].Posy, 1000)) {
		if(PlayerList["1"].XuanZhaun == "before") {
			PlayerList["27"].Posx = 1201;
		} else if(PlayerList["1"].XuanZhaun == "after") {
			PlayerList["27"].Posx = -1;
		} else if(PlayerList["1"].XuanZhaun == "left") {
			PlayerList["27"].Posy = 801;
		} else if(PlayerList["1"].XuanZhaun == "right") {
			PlayerList["27"].Posy = -1;
		}
	};
	return
}

// 爆炸特效
// 30-34
var TX_baozha_count0 = 0;
var TX_baozha_count0_X = -10;
var TX_baozha_count0_Y = -10;
var TX_baozha_count0_IS = false;
var TX_baozha_count21_IS = false;
var TX_baozha_count22_IS = false;
var TX_KongZhi_PL = 0;

var Boom_30_kaiguan = true;
var Boom_30_kaiguan_AITank1 = true;
var Boom_30_kaiguan_AITank2 = true;
var Boom_30_kaiguan_AITank3 = true;

function Game_JianCe_Boom1(posx, posy, shanghaimax) {

	var BooM_BoSS_Posx = PlayerList["2"].Posx;
	var BooM_BoSS_Posy = PlayerList["2"].Posy;
	var Tank1_BoSS_Posx = PlayerList["21"].Posx;
	var Tank1_BoSS_Posy = PlayerList["21"].Posy;
	var Tank2_BoSS_Posx = PlayerList["22"].Posx;
	var Tank2_BoSS_Posy = PlayerList["22"].Posy;

	if(true) { // 30号炸弹检测 伤害在500-到1000随机
		var BooM_30_Posx = posx;
		var BooM_30_Posy = posy;

		// 检测大boss
		if(Boom_30_kaiguan) {
			if((BooM_30_Posy >= BooM_BoSS_Posy && BooM_30_Posy <= BooM_BoSS_Posy + 100) &&
				(BooM_30_Posx >= BooM_BoSS_Posx && BooM_30_Posx <= BooM_BoSS_Posx + 100)) {
				Boom_30_kaiguan = false;
				TX_baozha_count0_IS = true;
				// 特效播放，音效播放
				// boss减少血量
				PlayerList["2"].Hp = PlayerList["2"].Hp - ShuiHangShu(shanghaimax);
				if(PlayerList["2"].Hp <= 0) {
					// 游戏结束
					// alert("Game Over!!! \n You win the victory of the game.");
					// location.href = 'http://www.iyplay.com';
					var UI_GameOverjisuan1 = document.getElementById('GameOver');
					UI_GameOverjisuan1.style.display = "block";
					//游戏时间
					var myDate = new Date();
					GameTime = myDate.getMilliseconds() - GameTime

				};

				return true;
			};
		};

		// 检测AI的坦克
		if(Boom_30_kaiguan) {
			if((BooM_30_Posy >= Tank1_BoSS_Posy && BooM_30_Posy <= Tank1_BoSS_Posy + 40) &&
				(BooM_30_Posx >= Tank1_BoSS_Posx && BooM_30_Posx <= Tank1_BoSS_Posx + 40)) {
				// 炮弹1的特效
				Boom_30_kaiguan = false;
				TX_baozha_count21_IS = true;
				// 特效播放，音效播放
				// 坦克21 boss减少血量
				PlayerList["21"].Hp = PlayerList["21"].Hp - ShuiHangShu(shanghaimax);
				if(PlayerList["21"].Hp <= 0) {
					// 掉落道具
					// 血量还原
					PlayerList["21"].Hp = 2000;
				};
				return true;

			};
		};

		if(Boom_30_kaiguan) {
			if((BooM_30_Posy >= Tank2_BoSS_Posy && BooM_30_Posy <= Tank2_BoSS_Posy + 40) &&
				(BooM_30_Posx >= Tank2_BoSS_Posx && BooM_30_Posx <= Tank2_BoSS_Posx + 40)) {
				// 特效播放，音效播放
				Boom_30_kaiguan = false;
				TX_baozha_count22_IS = true;
				// 坦克22 boss减少血量
				PlayerList["22"].Hp = PlayerList["22"].Hp - ShuiHangShu(shanghaimax);
				if(PlayerList["22"].Hp <= 0) {
					// 掉落道具
					// 血量还原
					PlayerList["22"].Hp = 2000;
				};
				return true;
			};
		}

	}
	return false;

}

var TX_baozha_count0Boom2 = 0;
var TX_baozha_count0_ISBoom2 = false;
var TX_baozha_count21_ISBoom2 = false;
var TX_baozha_count22_ISBoom2 = false;

function Game_JianCe_Boom2(posx, posy, shanghaimax) {

	var BooM_BoSS_Posx = PlayerList["2"].Posx;
	var BooM_BoSS_Posy = PlayerList["2"].Posy;
	var Tank1_BoSS_Posx = PlayerList["21"].Posx;
	var Tank1_BoSS_Posy = PlayerList["21"].Posy;
	var Tank2_BoSS_Posx = PlayerList["22"].Posx;
	var Tank2_BoSS_Posy = PlayerList["22"].Posy;

	// 炮弹1的特效
	//Boom_Bao_TX2("32", BooM_BoSS_Posx, BooM_BoSS_Posy);

	if(true) { // 30号炸弹检测 伤害在500-到1000随机
		var BooM_30_Posx = posx;
		var BooM_30_Posy = posy;

		// 检测大boss
		if(Boom_30_kaiguan_AITank1) {
			if((BooM_30_Posy >= BooM_BoSS_Posy && BooM_30_Posy <= BooM_BoSS_Posy + 100) &&
				(BooM_30_Posx >= BooM_BoSS_Posx && BooM_30_Posx <= BooM_BoSS_Posx + 100)) {
				Boom_30_kaiguan_AITank1 = false;
				TX_baozha_count0_ISBoom2 = true;
				// 特效播放，音效播放
				// boss减少血量
				PlayerList["2"].Hp = PlayerList["2"].Hp - ShuiHangShu(shanghaimax);
				if(PlayerList["2"].Hp <= 0) {
					// 游戏结束
					var UI_GameOverjisuan1 = document.getElementById('GameOver');
					UI_GameOverjisuan1.style.display = "block";
					//游戏时间
					var myDate = new Date();
					GameTime = myDate.getMilliseconds() - GameTime
				};
				return true;
			};
		};

		// 检测AI的坦克
		if(Boom_30_kaiguan_AITank1) {
			if((BooM_30_Posy >= Tank1_BoSS_Posy && BooM_30_Posy <= Tank1_BoSS_Posy + 40) &&
				(BooM_30_Posx >= Tank1_BoSS_Posx && BooM_30_Posx <= Tank1_BoSS_Posx + 40)) {
				Boom_30_kaiguan_AITank1 = false;
				TX_baozha_count21_ISBoom2 = true;
				// 特效播放，音效播放
				// 坦克21 boss减少血量
				PlayerList["21"].Hp = PlayerList["21"].Hp - ShuiHangShu(shanghaimax);
				if(PlayerList["21"].Hp <= 0) {
					// 掉落道具
					// 血量还原
					PlayerList["21"].Hp = 2000;
				};
				return true;
			};
		}
		if(Boom_30_kaiguan_AITank1) {
			if((BooM_30_Posy >= Tank2_BoSS_Posy && BooM_30_Posy <= Tank2_BoSS_Posy + 40) &&
				(BooM_30_Posx >= Tank2_BoSS_Posx && BooM_30_Posx <= Tank2_BoSS_Posx + 40)) {
				Boom_30_kaiguan_AITank1 = false;
				TX_baozha_count22_ISBoom2 = true;
				// 特效播放，音效播放
				// 坦克22 boss减少血量
				PlayerList["22"].Hp = PlayerList["22"].Hp - ShuiHangShu(shanghaimax);
				if(PlayerList["22"].Hp <= 0) {
					// 掉落道具
					// 血量还原
					PlayerList["22"].Hp = 2000;
				};
				return true;
			};
		}

	}
	return false;
}

var TX_baozha_count0Boom3 = 0;
var TX_baozha_count0_ISBoom3 = false;
var TX_baozha_count21_ISBoom3 = false;
var TX_baozha_count22_ISBoom3 = false;

function Game_JianCe_Boom3(posx, posy, shanghaimax) {

	var BooM_BoSS_Posx = PlayerList["2"].Posx;
	var BooM_BoSS_Posy = PlayerList["2"].Posy;
	var Tank1_BoSS_Posx = PlayerList["21"].Posx;
	var Tank1_BoSS_Posy = PlayerList["21"].Posy;
	var Tank2_BoSS_Posx = PlayerList["22"].Posx;
	var Tank2_BoSS_Posy = PlayerList["22"].Posy;

	if(true) { // 30号炸弹检测 伤害在500-到1000随机
		var BooM_30_Posx = posx;
		var BooM_30_Posy = posy;

		// 检测大boss
		if(Boom_30_kaiguan_AITank2) {
			if((BooM_30_Posy >= BooM_BoSS_Posy && BooM_30_Posy <= BooM_BoSS_Posy + 100) &&
				(BooM_30_Posx >= BooM_BoSS_Posx && BooM_30_Posx <= BooM_BoSS_Posx + 100)) {
				Boom_30_kaiguan_AITank1 = false;
				TX_baozha_count0_ISBoom3 = true;
				// 特效播放，音效播放
				// boss减少血量
				PlayerList["2"].Hp = PlayerList["2"].Hp - ShuiHangShu(shanghaimax);
				if(PlayerList["2"].Hp <= 0) {
					// 游戏结束
					var UI_GameOverjisuan1 = document.getElementById('GameOver');
					UI_GameOverjisuan1.style.display = "block";
					//游戏时间
					var myDate = new Date();
					GameTime = myDate.getMilliseconds() - GameTime
				};
				return true;
			};
		};

		// 检测AI的坦克
		if(Boom_30_kaiguan_AITank2) {
			if((BooM_30_Posy >= Tank1_BoSS_Posy && BooM_30_Posy <= Tank1_BoSS_Posy + 40) &&
				(BooM_30_Posx >= Tank1_BoSS_Posx && BooM_30_Posx <= Tank1_BoSS_Posx + 40)) {
				Boom_30_kaiguan_AITank2 = false;
				TX_baozha_count21_ISBoom3 = true;
				// 特效播放，音效播放
				// 坦克21 boss减少血量
				PlayerList["21"].Hp = PlayerList["21"].Hp - ShuiHangShu(shanghaimax);
				if(PlayerList["21"].Hp <= 0) {
					// 掉落道具
					// 血量还原
					PlayerList["21"].Hp = 2000;
				};
				return true;
			};
		}
		if(Boom_30_kaiguan_AITank2) {
			if((BooM_30_Posy >= Tank2_BoSS_Posy && BooM_30_Posy <= Tank2_BoSS_Posy + 40) &&
				(BooM_30_Posx >= Tank2_BoSS_Posx && BooM_30_Posx <= Tank2_BoSS_Posx + 40)) {
				Boom_30_kaiguan_AITank2 = false;
				TX_baozha_count22_ISBoom3 = true;
				// 特效播放，音效播放
				// 坦克22 boss减少血量
				PlayerList["22"].Hp = PlayerList["22"].Hp - ShuiHangShu(shanghaimax);
				if(PlayerList["22"].Hp <= 0) {
					// 掉落道具
					// 血量还原
					PlayerList["22"].Hp = 2000;
				};
				return true;
			};
		}

	}
	return false;
}

var TX_baozha_count0Boom4 = 0;
var TX_baozha_count0_ISBoom4 = false;
var TX_baozha_count21_ISBoom4 = false;
var TX_baozha_count22_ISBoom4 = false;

function Game_JianCe_Boom4(posx, posy, shanghaimax) {

	var BooM_BoSS_Posx = PlayerList["2"].Posx;
	var BooM_BoSS_Posy = PlayerList["2"].Posy;
	var Tank1_BoSS_Posx = PlayerList["21"].Posx;
	var Tank1_BoSS_Posy = PlayerList["21"].Posy;
	var Tank2_BoSS_Posx = PlayerList["22"].Posx;
	var Tank2_BoSS_Posy = PlayerList["22"].Posy;

	if(true) { // 30号炸弹检测 伤害在500-到1000随机
		var BooM_30_Posx = posx;
		var BooM_30_Posy = posy;

		// 检测大boss
		if(Boom_30_kaiguan_AITank3) {
			if((BooM_30_Posy >= BooM_BoSS_Posy && BooM_30_Posy <= BooM_BoSS_Posy + 100) &&
				(BooM_30_Posx >= BooM_BoSS_Posx && BooM_30_Posx <= BooM_BoSS_Posx + 100)) {
				Boom_30_kaiguan_AITank3 = false;
				TX_baozha_count0_ISBoom4 = true;
				// 特效播放，音效播放
				// boss减少血量
				PlayerList["2"].Hp = PlayerList["2"].Hp - ShuiHangShu(shanghaimax);
				if(PlayerList["2"].Hp <= 0) {
					// 游戏结束
					var UI_GameOverjisuan1 = document.getElementById('GameOver');
					UI_GameOverjisuan1.style.display = "block";
					//游戏时间
					var myDate = new Date();
					GameTime = myDate.getMilliseconds() - GameTime
				};
				return true;
			};
		};

		// 检测AI的坦克
		if(Boom_30_kaiguan_AITank3) {
			if((BooM_30_Posy >= Tank1_BoSS_Posy && BooM_30_Posy <= Tank1_BoSS_Posy + 40) &&
				(BooM_30_Posx >= Tank1_BoSS_Posx && BooM_30_Posx <= Tank1_BoSS_Posx + 40)) {
				Boom_30_kaiguan_AITank3 = false;
				TX_baozha_count21_ISBoom4 = true;
				// 特效播放，音效播放
				// 坦克21 boss减少血量
				PlayerList["21"].Hp = PlayerList["21"].Hp - ShuiHangShu(shanghaimax);
				if(PlayerList["21"].Hp <= 0) {
					// 掉落道具
					// 血量还原
					PlayerList["21"].Hp = 2000;
				};
				return true;
			};
		}
		if(Boom_30_kaiguan_AITank3) {
			if((BooM_30_Posy >= Tank2_BoSS_Posy && BooM_30_Posy <= Tank2_BoSS_Posy + 40) &&
				(BooM_30_Posx >= Tank2_BoSS_Posx && BooM_30_Posx <= Tank2_BoSS_Posx + 40)) {
				Boom_30_kaiguan_AITank3 = false;
				TX_baozha_count22_ISBoom4 = true;
				// 特效播放，音效播放
				// 坦克22 boss减少血量
				PlayerList["22"].Hp = PlayerList["22"].Hp - ShuiHangShu(shanghaimax);
				if(PlayerList["22"].Hp <= 0) {
					// 掉落道具
					// 血量还原
					PlayerList["22"].Hp = 2000;
				};
				return true;
			};
		}

	}
	return false;
}

//-----------------------------------------------------------------------------