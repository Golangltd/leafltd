// 游戏坦克AI
// 游戏有地图的坐标，可以按照像素实现
// 游戏的坦克AI是有一定的活动范围
function tankAi() {
	// 坦克的出生点就是在boss附近
	for(id in PlayerList) {
		//去除非坦克的
		if(PlayerList[id].type != "AI_Tank") {
			continue;
		};
		RunnIng_Player(PlayerList[id].ImgDC, PlayerList[id].Posx, PlayerList[id].Posy,
			PlayerList[id].kuang, PlayerList[id].gao, PlayerList[id].type, PlayerList[id].XuanZhaun);
	}

	return
}

// 随机数
function ShuiHangShu(num_quyu) {
	var oNow = new Date();
	return oNow.getSeconds() % num_quyu
}

// 拆分字符串
function ChaiFenString(strHunHe, strFenGeFu) {
	var strs = new Array(); //定义一数组 
	strs = strHunHe.split(strFenGeFu);
	return strs;
}

//炮弹AI--
function Boom_AI() {
	// 雷达判断
	LeiDa_Sys("8", 50, 250);
	LeiDa_Sys15("9", 50, 120);
//LeiDa_Sysbak("8","0");
//LeiDa_Sysbak("9","15");
	Boom_AI_TY_DiTank("25", 90, 60);
	Boom_AI_TY_DiTank("26", 90, 60);
	//获取炮弹的AI的坐标
	if(Boom_AI_TY("4", 90, 60)) {
		return true
	}
	if(Boom_AI_TY("5", 90, 60)) {
		return true
	}

	return false
}

//通用AI
function Boom_AI_TY_DiTank(boomid, role_Kung, role_Gao) {
	var Boom_Posx = PlayerList[boomid].Posx;
	var Boom_Posy = PlayerList[boomid].Posy;
	if(true) { //0
		var Boom_Posx_1 = PlayerList["0"].Posx;
		var Boom_Posy_1 = PlayerList["0"].Posy;
		// 判断角色边缘
		if((Boom_Posx_1 + role_Kung > Boom_Posx) && (Boom_Posx > Boom_Posx_1)) {
			if((Boom_Posy_1 + role_Gao > Boom_Posy) && (Boom_Posy > Boom_Posy_1)) {
				// 导弹消失
				PlayerList[boomid].Posx = -100;
				// 被击中目标血量减少
				PlayerList["0"].Hp = PlayerList["0"].Hp - ShuiHangShu(500);
				if(PlayerList["0"].Hp < 0) {
					// 死亡
					PlayerList["0"].Posx = 30;
					PlayerList["0"].Posy = 120;
					PlayerList["0"].Hp = 2000;
					// AI_Da_Boss 增加2000HP
					PlayerList["2"].Hp = PlayerList["2"].Hp + 2000;
					leveljisuan1++;
				}
			}
		}
	};
	if(true) { //1
		var Boom_Posx_1 = PlayerList["1"].Posx;
		var Boom_Posy_1 = PlayerList["1"].Posy;
		// 判断角色边缘
		if((Boom_Posx_1 + 80 > Boom_Posx) && (Boom_Posx > Boom_Posx_1)) {
			if((Boom_Posy_1 + 40 > Boom_Posy) && (Boom_Posy > Boom_Posy_1)) {
				// 导弹消失
				PlayerList[boomid].Posx = -100;
				// 被击中目标血量减少
				PlayerList["1"].Hp = PlayerList["1"].Hp - ShuiHangShu(500);
				if(PlayerList["1"].Hp < 0) {
					// 死亡
					PlayerList["1"].Posx = 20;
					PlayerList["1"].Posy = 200;
					PlayerList["1"].Hp = 2000;
					// AI_Da_Boss 增加2000HP
					PlayerList["2"].Hp = PlayerList["2"].Hp + 2000;
					leveljisuan2++;
				}
			}
		}
	};
	if(true) { //14
		var Boom_Posx_1 = PlayerList["14"].Posx;
		var Boom_Posy_1 = PlayerList["14"].Posy;
		// 判断角色边缘
		if((Boom_Posx_1 + 80 > Boom_Posx) && (Boom_Posx > Boom_Posx_1)) {
			if((Boom_Posy_1 + 40 > Boom_Posy) && (Boom_Posy > Boom_Posy_1)) {
				// 导弹消失
				PlayerList[boomid].Posx = -100;
				PlayerList["14"].Hp = PlayerList["14"].Hp - ShuiHangShu(500);
				if(PlayerList["14"].Hp < 0) {
					// 死亡
					PlayerList["14"].Posx = 20;
					PlayerList["14"].Posy = 400;
					PlayerList["14"].Hp = 2000;
					// AI_Da_Boss 增加2000HP
					PlayerList["2"].Hp = PlayerList["2"].Hp + 2000;
					leveljisuan3++;
				}
			}
		}
	};
	if(true) { //15
		var Boom_Posx_1 = PlayerList["15"].Posx;
		var Boom_Posy_1 = PlayerList["15"].Posy;
		// 判断角色边缘
		if((Boom_Posx_1 + 110 > Boom_Posx) && (Boom_Posx > Boom_Posx_1)) {
			if((Boom_Posy_1 + 70 > Boom_Posy) && (Boom_Posy > Boom_Posy_1)) {
				// 导弹消失

				PlayerList[boomid].Posx = -100;

				PlayerList["15"].Hp = PlayerList["15"].Hp - ShuiHangShu(500);
				if(PlayerList["15"].Hp < 0) {
					// 死亡
					PlayerList["15"].Posx = 20;
					PlayerList["15"].Posy = 450;
					PlayerList["15"].Hp = 2000;
					// AI_Da_Boss 增加2000HP
					PlayerList["2"].Hp = PlayerList["2"].Hp + 2000;
					leveljisuan4++;
				}
			}
		}
	};
}

//通用AI
function Boom_AI_TY(boomid, role_Kung, role_Gao) {
	var Boom_Posx = PlayerList[boomid].Posx;
	var Boom_Posy = PlayerList[boomid].Posy;
	if(true) { //0
		var Boom_Posx_1 = PlayerList["0"].Posx;
		var Boom_Posy_1 = PlayerList["0"].Posy;
		// 判断角色边缘
		if((Boom_Posx_1 + role_Kung > Boom_Posx) && (Boom_Posx > Boom_Posx_1)) {
			if((Boom_Posy_1 + role_Gao > Boom_Posy) && (Boom_Posy > Boom_Posy_1)) {
				// 播放特效
				PlayerList['17'].EntryTX = true;
				PlayerList['17'].Posx = Boom_Posx - 40;
				PlayerList['17'].Posy = Boom_Posy - 10;
				// 导弹消失
				if(boomid == "4") {
					PlayerList[boomid].Posx = -100;
					PlayerList["5"].Posx = -100;
				} else if(boomid == "5") {
					PlayerList[boomid].Posx = -100;
					PlayerList["4"].Posx = -100;
				}
				// 被击中目标血量减少
				PlayerList["0"].Hp = PlayerList["0"].Hp - ShuiHangShu(1000);
				if(PlayerList["0"].Hp < 0) {
					// 死亡
					PlayerList["0"].Posx = 30;
					PlayerList["0"].Posy = 120;
					PlayerList["0"].Hp = 2000;
					PlayerList["2"].Hp = PlayerList["2"].Hp + 2000;
					leveljisuan1++;
				}
			}
		}
	};
	if(true) { //1
		var Boom_Posx_1 = PlayerList["1"].Posx;
		var Boom_Posy_1 = PlayerList["1"].Posy;
		// 判断角色边缘
		if((Boom_Posx_1 + 80 > Boom_Posx) && (Boom_Posx > Boom_Posx_1)) {
			if((Boom_Posy_1 + 40 > Boom_Posy) && (Boom_Posy > Boom_Posy_1)) {
				// 播放特效
				PlayerList['17'].EntryTX = true;
				PlayerList['17'].Posx = Boom_Posx - 30;
				PlayerList['17'].Posy = Boom_Posy - 10;
				// 导弹消失
				if(boomid == "4") {
					PlayerList[boomid].Posx = -100;
					PlayerList["5"].Posx = -100;
				} else if(boomid == "5") {
					PlayerList[boomid].Posx = -100;
					PlayerList["4"].Posx = -100;
				}
				// 被击中目标血量减少
				PlayerList["1"].Hp = PlayerList["1"].Hp - ShuiHangShu(1000);
				if(PlayerList["1"].Hp < 0) {
					// 死亡
					PlayerList["1"].Posx = 20;
					PlayerList["1"].Posy = 200;
					PlayerList["1"].Hp = 2000;
					PlayerList["2"].Hp = PlayerList["2"].Hp + 2000;
					leveljisuan2++;
				}
			}
		}
	};
	if(true) { //14
		var Boom_Posx_1 = PlayerList["14"].Posx;
		var Boom_Posy_1 = PlayerList["14"].Posy;
		// 判断角色边缘
		if((Boom_Posx_1 + 80 > Boom_Posx) && (Boom_Posx > Boom_Posx_1)) {
			if((Boom_Posy_1 + 40 > Boom_Posy) && (Boom_Posy > Boom_Posy_1)) {
				// 播放特效
				PlayerList['17'].EntryTX = true;
				PlayerList['17'].Posx = Boom_Posx - 30;
				PlayerList['17'].Posy = Boom_Posy - 10;
				// 导弹消失
				if(boomid == "4") {
					PlayerList[boomid].Posx = -100;
					PlayerList["5"].Posx = -100;
				} else if(boomid == "5") {
					PlayerList[boomid].Posx = -100;
					PlayerList["4"].Posx = -100;
				}
				PlayerList["14"].Hp = PlayerList["14"].Hp - ShuiHangShu(1000);
				if(PlayerList["14"].Hp < 0) {
					// 死亡
					PlayerList["14"].Posx = 20;
					PlayerList["14"].Posy = 400;
					PlayerList["14"].Hp = 2000;
					PlayerList["2"].Hp = PlayerList["2"].Hp + 2000;
					leveljisuan3++;
				}
			}
		}
	};
	if(true) { //15
		var Boom_Posx_1 = PlayerList["15"].Posx;
		var Boom_Posy_1 = PlayerList["15"].Posy;
		// 判断角色边缘
		if((Boom_Posx_1 + 110 > Boom_Posx) && (Boom_Posx > Boom_Posx_1)) {
			if((Boom_Posy_1 + 70 > Boom_Posy) && (Boom_Posy > Boom_Posy_1)) {
				// 播放特效
				PlayerList['17'].EntryTX = true;
				PlayerList['17'].Posx = Boom_Posx - 50;
				PlayerList['17'].Posy = Boom_Posy - 10;
				// 导弹消失
				if(boomid == "4") {
					PlayerList[boomid].Posx = -100;
					PlayerList["5"].Posx = -100;
				} else if(boomid == "5") {
					PlayerList[boomid].Posx = -100;
					PlayerList["4"].Posx = -100;
				}
				PlayerList["15"].Hp = PlayerList["15"].Hp - ShuiHangShu(1000);
				if(PlayerList["15"].Hp < 0) {
					// 死亡
					PlayerList["15"].Posx = 20;
					PlayerList["15"].Posy = 450;
					PlayerList["15"].Hp = 2000;
					PlayerList["2"].Hp = PlayerList["2"].Hp + 2000;
					leveljisuan4++;
				}
			}
		}
	};
}

// 雷达扫描到飞机目标后激活防空系统经行攻击
// 8/9
// 50-120
// 120 
// 防空炮 10/11
var fangkongpaoCount = 0;
var fangkongpaoCount2 = 0;
var fangkongpaoCount3 = 0;
var fangkongpaoCount4 = 0;

function LeiDa_Sys(leidaid, role_Kung, role_Gao) {
	var id = "0";
	if(true) { // 0
		var Boom_Posx = PlayerList["9"].Posx;
		var Boom_Posy = PlayerList["9"].Posy;
		var Boom_Posx_1 = PlayerList["0"].Posx;
		var Boom_Posy_1 = PlayerList["0"].Posy;
		if(Boom_Posy_1 < 400) {
			if(leidaid == "8") {
				id = "10";
			};
			// 为空直接返回
			if(id == "0") {
				return;
			};

			// 防空炮特效
			if(fangkongpaoCount > 0) {
				if(fangkongpaoCount % 2 == 0) {
					PlayerList[id].ImgDC.src = Fangp_base64[0]; //"img/fangkp.png";
				} else {
					PlayerList[id].ImgDC.src = Fangp2_base64[0]; //"img/fangkp2.png";
				}
				fangkongpaoCount++;
				if(fangkongpaoCount > 100) {
					fangkongpaoCount = 0;
					PlayerList[id].ImgDC.src = Fangp_base64[0]; //"img/fangkp.png";
				}
			} else {
				PlayerList[id].ImgDC.src = Fangp_base64[0]; //"img/fangkp.png";
			};
			// 判断角色边缘
			if((Boom_Posx_1 + 50 > Boom_Posx) && (Boom_Posx > Boom_Posx_1 - 100)) {
				if((Boom_Posy_1 + 120 > Boom_Posy) && (Boom_Posy >= Boom_Posy_1 - 100)) {
					if(fangkongpaoCount == 0) {
						fangkongpaoCount++;
					};
					// 2 飞机减血
					PlayerList["0"].Hp = PlayerList["0"].Hp - ShuiHangShu(500);
					if(PlayerList["0"].Hp < 0) {
						// 死亡
						PlayerList["0"].Posx = 30;
						PlayerList["0"].Posy = 120;
						PlayerList["0"].Hp = 2000;
						PlayerList["2"].Hp = PlayerList["2"].Hp + 2000;
						leveljisuan1++;
					}
				}
			}
		} else {
			var Boom_Posx = PlayerList["8"].Posx;
			var Boom_Posy = PlayerList["8"].Posy;
			var Boom_Posx_1 = PlayerList["0"].Posx;
			var Boom_Posy_1 = PlayerList["0"].Posy;
			if(leidaid == "8") {
				id = "11";
			};
			// 为空直接返回
			if(id == "0") {
				return;
			};

			// 防空炮特效
			if(fangkongpaoCount2 > 0) {
				if(fangkongpaoCount2 % 2 == 0) {
					PlayerList[id].ImgDC.src = Fangp_base64[0]; //"img/fangkp.png";
				} else {
					PlayerList[id].ImgDC.src = Fangp2_base64[0]; //"img/fangkp2.png";
				}
				fangkongpaoCount2++;
				if(fangkongpaoCount2 > 100) {
					fangkongpaoCount2 = 0;
					PlayerList[id].ImgDC.src = Fangp_base64[0]; //"img/fangkp.png";
				}
			} else {
				PlayerList[id].ImgDC.src = Fangp_base64[0]; //"img/fangkp.png";
			};
			// 判断角色边缘
			if((Boom_Posx_1 + 50 > Boom_Posx) && (Boom_Posx > Boom_Posx_1)) {
				if((Boom_Posy_1 + 150 > Boom_Posy) && (Boom_Posy >= Boom_Posy_1 - 100)) {
					if(fangkongpaoCount2 == 0) {
						fangkongpaoCount2++;
					}
					// 2 飞机减血
					PlayerList["0"].Hp = PlayerList["0"].Hp - ShuiHangShu(500);
					if(PlayerList["0"].Hp < 0) {
						// 死亡
						PlayerList["0"].Posx = 30;
						PlayerList["0"].Posy = 120;
						PlayerList["0"].Hp = 2000;
						PlayerList["2"].Hp = PlayerList["2"].Hp + 2000;
						leveljisuan1++;
					}
				}
			}

		}
	};

	return
}

function LeiDa_Sys15(leidaid, role_Kung, role_Gao) {

	var id = "0";
	if(true) { //15
		var Boom_Posx = PlayerList["9"].Posx;
		var Boom_Posy = PlayerList["9"].Posy;
		var Boom_Posx_1 = PlayerList["15"].Posx;
		var Boom_Posy_1 = PlayerList["15"].Posy;
		if(Boom_Posy_1 < 400) {
			if(leidaid == "9") {
				id = "10";
			};
			// 为空直接返回
			if(id == "0") {
				return;
			};

			// 防空炮特效
			if(fangkongpaoCount3 > 0) {
				if(fangkongpaoCount3 % 2 == 0) {
					PlayerList[id].ImgDC.src = Fangp_base64[0]; //"img/fangkp.png";
				} else {
					PlayerList[id].ImgDC.src = Fangp2_base64[0]; //"img/fangkp2.png";
				}
				fangkongpaoCount3++;
				if(fangkongpaoCount3 > 100) {
					fangkongpaoCount3 = 0;
					PlayerList[id].ImgDC.src = Fangp_base64[0]; //"img/fangkp.png";
				}
			} else {
				PlayerList[id].ImgDC.src = Fangp_base64[0]; //"img/fangkp.png";
			};
			// 判断角色边缘
			if((Boom_Posx_1 + 50 > Boom_Posx) && (Boom_Posx > Boom_Posx_1 - 100)) {
				if((Boom_Posy_1 + 120 > Boom_Posy) && (Boom_Posy >= Boom_Posy_1 - 100)) {
					if(fangkongpaoCount3 == 0) {
						fangkongpaoCount3++;
					}
					// 2 飞机减血
					PlayerList["15"].Hp = PlayerList["15"].Hp - ShuiHangShu(500);
					if(PlayerList["15"].Hp < 0) {
						// 死亡
						PlayerList["15"].Posx = 20;
						PlayerList["15"].Posy = 450;
						PlayerList["15"].Hp = 2000;
						PlayerList["2"].Hp = PlayerList["2"].Hp + 2000;
						leveljisuan4++;
					}
				}
			}
		} else {
			var Boom_Posx = PlayerList["8"].Posx;
			var Boom_Posy = PlayerList["8"].Posy;
			var Boom_Posx_1 = PlayerList["15"].Posx;
			var Boom_Posy_1 = PlayerList["15"].Posy;
			if(leidaid == "9") {
				id = "11";
			};
			// 为空直接返回
			if(id == "0") {
				return;
			};

			// 防空炮特效
			if(fangkongpaoCount4 > 0) {
				if(fangkongpaoCount4 % 2 == 0) {
					PlayerList[id].ImgDC.src = Fangp_base64[0]; //"img/fangkp.png";
				} else {
					PlayerList[id].ImgDC.src = Fangp2_base64[0]; //"img/fangkp2.png";
				};
				fangkongpaoCount4++;
				if(fangkongpaoCount4 > 100) {
					fangkongpaoCount4 = 0;
					PlayerList[id].ImgDC.src = Fangp_base64[0]; //"img/fangkp.png";
				}
			} else {
				PlayerList[id].ImgDC.src = Fangp_base64[0]; //"img/fangkp.png";
			};
			// 判断角色边缘
			if((Boom_Posx_1 + 50 > Boom_Posx) && (Boom_Posx > Boom_Posx_1)) {
				if((Boom_Posy_1 + 100 > Boom_Posy) && (Boom_Posy >= Boom_Posy_1 - 100)) {
					if(fangkongpaoCount4 == 0) {
						fangkongpaoCount4++;
					}
					// 2 飞机减血
					PlayerList["15"].Hp = PlayerList["15"].Hp - ShuiHangShu(500);
					if(PlayerList["15"].Hp < 0) {
						// 死亡
						PlayerList["15"].Posx = 20;
						PlayerList["15"].Posy = 450;
						PlayerList["15"].Hp = 2000;
						PlayerList["2"].Hp = PlayerList["2"].Hp + 2000;
						leveljisuan4++;
					}
				}
			}

		}
	};

	return
}

function LeiDa_Sysbak(leidaid,roleid) {

	var id = "0";
	if(true) { //15
		var Boom_Posx = PlayerList["9"].Posx;
		var Boom_Posy = PlayerList["9"].Posy;
		var Boom_Posx_1 = PlayerList[roleid].Posx;
		var Boom_Posy_1 = PlayerList[roleid].Posy;
		if(Boom_Posy_1 < 400) {
			if(leidaid == "9"|| leidaid == "8") {
				id = "10";
			};
			// 为空直接返回
			if(id == "0") {
				return;
			};

			// 防空炮特效
			if(fangkongpaoCount3 > 0) {
				if(fangkongpaoCount3 % 2 == 0) {
					PlayerList[id].ImgDC.src = Fangp_base64[0]; //"img/fangkp.png";
				} else {
					PlayerList[id].ImgDC.src = Fangp2_base64[0]; //"img/fangkp2.png";
				}
				fangkongpaoCount3++;
				if(fangkongpaoCount3 > 100) {
					fangkongpaoCount3 = 0;
					PlayerList[id].ImgDC.src = Fangp_base64[0]; //"img/fangkp.png";
				}
			} else {
				PlayerList[id].ImgDC.src = Fangp_base64[0]; //"img/fangkp.png";
			};
			// 判断角色边缘
			if((Boom_Posx_1 + 50 > Boom_Posx) && (Boom_Posx > Boom_Posx_1 - 100)) {
				if((Boom_Posy_1 + 120 > Boom_Posy) && (Boom_Posy >= Boom_Posy_1 - 100)) {
					if(fangkongpaoCount3 == 0) {
						fangkongpaoCount3++;
					}
					// 2 飞机减血
					PlayerList[roleid].Hp = PlayerList[roleid].Hp - ShuiHangShu(500);
					if(PlayerList[roleid].Hp < 0) {
						// 死亡
						PlayerList[roleid].Posx = 20;
						PlayerList[roleid].Posy = 450;
						PlayerList[roleid].Hp = 2000;
						PlayerList["2"].Hp = PlayerList["2"].Hp + 2000;
						leveljisuan4++;
					}
				}
			}
		} else {
			var Boom_Posx = PlayerList["8"].Posx;
			var Boom_Posy = PlayerList["8"].Posy;
			var Boom_Posx_1 = PlayerList[roleid].Posx;
			var Boom_Posy_1 = PlayerList[roleid].Posy;
			if(leidaid == "9" || leidaid == "8") {
				id = "11";
			};
			// 为空直接返回
			if(id == "0") {
				return;
			};

			// 防空炮特效
			if(fangkongpaoCount4 > 0) {
				if(fangkongpaoCount4 % 2 == 0) {
					PlayerList[id].ImgDC.src = Fangp_base64[0]; //"img/fangkp.png";
				} else {
					PlayerList[id].ImgDC.src = Fangp2_base64[0]; //"img/fangkp2.png";
				};
				fangkongpaoCount4++;
				if(fangkongpaoCount4 > 100) {
					fangkongpaoCount4 = 0;
					PlayerList[id].ImgDC.src = Fangp_base64[0]; //"img/fangkp.png";
				}
			} else {
				PlayerList[id].ImgDC.src = Fangp_base64[0]; //"img/fangkp.png";
			};
			// 判断角色边缘
			if((Boom_Posx_1 + 50 > Boom_Posx) && (Boom_Posx > Boom_Posx_1)) {
				if((Boom_Posy_1 + 100 > Boom_Posy) && (Boom_Posy >= Boom_Posy_1 - 100)) {
					if(fangkongpaoCount4 == 0) {
						fangkongpaoCount4++;
					}
					// 2 飞机减血
					PlayerList[roleid].Hp = PlayerList[roleid].Hp - ShuiHangShu(500);
					if(PlayerList[roleid].Hp < 0) {
						// 死亡
						PlayerList[roleid].Posx = 20;
						PlayerList[roleid].Posy = 450;
						PlayerList[roleid].Hp = 2000;
						PlayerList["2"].Hp = PlayerList["2"].Hp + 2000;
						leveljisuan4++;
					}
				}
			}

		}
	};

	return
}

// 如果飞机或者坦克  如果飞进禁飞区 则每秒都会受到伤害
function JiFeiQu() {

	if(PlayerList["0"].Posx > 910 && PlayerList["0"].Posx < 1200) {

		PlayerList["0"].Hp = PlayerList["0"].Hp - ShuiHangShu(50);
		if(PlayerList["0"].Hp < 0) {
			PlayerList["0"].Posx = 30;
			PlayerList["0"].Posy = 120;
			PlayerList["0"].Hp = 2000;
			PlayerList["2"].Hp = PlayerList["2"].Hp + 2000;
			leveljisuan1++;
		}

	} else if(PlayerList["1"].Posx > 910 && PlayerList["1"].Posx < 1200) {
		PlayerList["1"].Hp = PlayerList["1"].Hp - ShuiHangShu(50);
		if(PlayerList["1"].Hp < 0) {
			PlayerList["1"].Posx = 20;
			PlayerList["1"].Posy = 200;
			PlayerList["1"].Hp = 2000;
			PlayerList["2"].Hp = PlayerList["2"].Hp + 2000;
			leveljisuan2++;
		}

	} else if(PlayerList["14"].Posx > 910 && PlayerList["14"].Posx < 1200) {
		PlayerList["14"].Hp = PlayerList["14"].Hp - ShuiHangShu(50);
		if(PlayerList["14"].Hp < 0) {
			PlayerList["14"].Posx = 20;
			PlayerList["14"].Posy = 400;
			PlayerList["14"].Hp = 2000;
			PlayerList["2"].Hp = PlayerList["2"].Hp + 2000;
			leveljisuan3++;
		}

	} else if(PlayerList["15"].Posx > 910 && PlayerList["15"].Posx < 1200) {
		PlayerList["15"].Hp = PlayerList["15"].Hp - ShuiHangShu(50);
		if(PlayerList["15"].Hp < 0) {
			PlayerList["15"].Posx = 20;
			PlayerList["15"].Posy = 450;
			PlayerList["15"].Hp = 2000;
			PlayerList["2"].Hp = PlayerList["2"].Hp + 2000;
			leveljisuan4++;
		}

	}

}