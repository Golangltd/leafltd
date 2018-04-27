//定时器
var x_bossPosX = 1200;
var KaiF = false;
var x_bossPosXBO = 850;
var x_bossPosXBO2 = 850;
var icc = 0;

function x_boss() {
	icc++
	if(XinTiaoKaiGuan && icc % 50 == 0) {
		// 网络心跳
		XinTiao();
	}
	// 巡逻飞机飞行
	x_bossPosX = x_bossPosX - 1
	x_bossPosXBO = x_bossPosXBO - 5
	x_bossPosXBO2 = x_bossPosXBO2 - 5
	//for(id in PlayerList) {
	var id = "3";
	if(PlayerList[id] != null) {
		if(PlayerList[id].Posx - 10 <= 0) {
			x_bossPosX = 1200
		}
		if(PlayerList[id].type == "x_boss") {
			PlayerList[id].Posx = x_bossPosX;
		}
	}

	//}
	// d_boss 移动
	if(!KaiF) {
		if(PlayerList["2"] != null) {

			PlayerList["2"].Posy = PlayerList["2"].Posy - 1;
			if(PlayerList["2"].Posy == 200) {
				KaiF = true;
			}
		}

	}
	if(KaiF) {
		PlayerList["2"].Posy = PlayerList["2"].Posy + 1;
		if(PlayerList["2"].Posy == 500) {
			KaiF = false;
		}
	}
	//修改血条的值
	Change_Boss_HP_Pos(PlayerList["2"].Posy);
	// 执行炮弹
	TimerBoom();
	// 雷达波1
	if(true) {
		var id = "8";
		if(PlayerList[id] != null) {
			
		if(PlayerList[id].Posx - 10 <= 0) {
			x_bossPosXBO = 850;
		}
		if(PlayerList[id].type == "leidabo1") {
			PlayerList[id].Posx = x_bossPosXBO;
		}
		}
	}
	// 雷达波2
	if(true) {
		var id = "9";
		if(PlayerList[id] != null) {
		if(PlayerList[id].Posx - 140 <= 0) {
			x_bossPosXBO2 = 850;
		}
		if(PlayerList[id].type == "leidabo2") {
			PlayerList[id].Posx = x_bossPosXBO2;
		}
		}
	}
}

// 炮弹
function TimerBoom() {

	if(PlayerList.length > 0) {
		var y1 = PlayerList["2"].Posy + 22;
		var y2 = PlayerList["2"].Posy + 54;
		// 跟随d_boss
		if(PlayerList["4"].Posx < 0) {
			PlayerList["4"].Posx = PlayerList["2"].Posx;
			PlayerList["4"].Posy = y1;
		} else {
			PlayerList["4"].Posx = PlayerList["4"].Posx - 10;
			PlayerList["4"].Posy = y1;
		}

		if(PlayerList["5"].Posx < 0) {
			PlayerList["5"].Posx = PlayerList["2"].Posx;
			PlayerList["5"].Posy = y2;
		} else {
			PlayerList["5"].Posx = PlayerList["5"].Posx - 10;
			PlayerList["5"].Posy = y2;
		}
        Boom_AI();
		PlayerList["4"].EntryTX = true;
	}
}

// 初始化
function TimerInit() {
	window.setInterval("x_boss()", 50);
}