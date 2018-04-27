// 游戏中的变量地址
var canvas, ctx;
var background, runnerImageDC;
var RunnPlayer_X, RunnPlayer_Y;
var divdata;
var PlayerList = []; //   加入的玩家的列表
var TeXiaoList = []; // 特效列表
var PC_BossList = []; // 电脑BOSS 列表
var ZhiYuanList = []; // 支援列表
var Player_ImgList = []; // 玩家角色列表
var itime = 0;
var TX_gouhuo = []; // 特效--篝火
var TX_gouhuo_count = 0;
var TX_Speed_count = 0;
var TX_Speed = 12;
var TX_baozha = []; // 爆炸特效
var TX_baozha_count = 0;
var JZ_leida = []; // 雷达
var JZ_leida_count = 0;
var JZ_leida_count2 = 0;
var AI_KaiGuan_JiShu = 0;
var AI_KaiGuan2_JiShu = 0;
var AI_FangXianglist = ['before', 'left', 'right', 'after']; // 前，左，右，后
var AI_TankFangXiang = 0; // 一号坦克的方向数组坐标
var AI_TankFangXiang1 = 0; // 二号坦克的方向数组坐标
var AI_Tank_BooM_1 = false;
var AI_Tank_BooM_FanXiang = "";
var AI_Tank_BooM_2 = false;
var AI_Tank_BooM_FanXiang1 = "";

//游戏的初始化函数
function initializeImage() {

	RunnPlayer_X = 0;
	RunnPlayer_Y = 0;

	background = new Image();
	runnerImageDC = new Image();
	// 获取canvas元素数据
	canvas = document.getElementById("Game-canvas");
	ctx = canvas.getContext("2d");
	// 篝火特效
	//	TX_gouhuo = ['img/texiao/gouhuo/86-1.png',
	//		'img/texiao/gouhuo/86-2.png',
	//		'img/texiao/gouhuo/86-3.png',
	//		'img/texiao/gouhuo/86-4.png',
	//		'img/texiao/gouhuo/86-5.png',
	//		'img/texiao/gouhuo/86-6.png',
	//		'img/texiao/gouhuo/86-7.png',
	//		'img/texiao/gouhuo/86-8.png',
	//		'img/texiao/gouhuo/86-9.png'
	//	];

	// 爆炸特效特效
	//	TX_baozha = ['img/texiao/baozha/220000.png',
	//		'img/texiao/baozha/220001.png',
	//		'img/texiao/baozha/220002.png',
	//		'img/texiao/baozha/220003.png',
	//		'img/texiao/baozha/220004.png',
	//		'img/texiao/baozha/220005.png',
	//		'img/texiao/baozha/220006.png',
	//		'img/texiao/baozha/220007.png',
	//		'img/texiao/baozha/220008.png',
	//		'img/texiao/baozha/220009.png',
	//		'img/texiao/baozha/220010.png',
	//		'img/texiao/baozha/220011.png'
	//	];

	// 雷达旋转特效
	//	JZ_leida = ['img/role/di_leida/impulsea000.png',
	//		'img/role/di_leida/impulsea001.png',
	//		'img/role/di_leida/impulsea002.png',
	//		'img/role/di_leida/impulsea003.png',
	//		'img/role/di_leida/impulsea004.png',
	//		'img/role/di_leida/impulsea005.png',
	//		'img/role/di_leida/impulsea006.png',
	//		'img/role/di_leida/impulsea007.png',
	//		'img/role/di_leida/impulsea008.png',
	//		'img/role/di_leida/impulsea009.png',
	//		'img/role/di_leida/impulsea010.png',
	//		'img/role/di_leida/impulsea011.png',
	//		'img/role/di_leida/impulsea012.png',
	//		'img/role/di_leida/impulsea013.png',
	//		'img/role/di_leida/impulsea014.png',
	//		'img/role/di_leida/impulsea015.png'
	//	];

	// 背景
	background.src = 'img/bjre.png';
	background.onload = function(e) {
		divdata = document.getElementById("GGame");
		// 与div相同的大小
		canvas.width = divdata.offsetWidth;
		canvas.height = divdata.offsetHeight;
		// 启动游戏
		startGame()
	};
}

// 开始游戏
function startGame() {
	draw();
}

// 绘画所有游戏中的元素
function draw() {
	drawBackground();
	drawRunnerImageDC(RunnPlayer_X, RunnPlayer_Y);
}

//  绘制背景
function drawBackground() {
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
}

//  绘制广告
function drawRunnerImageDC(prRunnPlayer_X, prRunnPlayer_Y) {
	ctx.drawImage(runnerImageDC, prRunnPlayer_X, prRunnPlayer_Y);
}

// 人物移动
function RunnIng_Player(runnerImageDCData, pos_x, pos_y, kuang, gao, type, jiaodu, type2) {

	// 特效
	TX_Speed_count++;
	//console.log("--",type)
	if(TX_Speed_count % TX_Speed == 0) {

		// 篝火特效
		//		if(type == "TX_gouhuo") {
		//			PlayerList['16'].ImgDC.src = TX_gouhuo[TX_gouhuo_count];
		//			if(TX_gouhuo_count >= 8) {
		//				TX_gouhuo_count = 0;
		//			} else {
		//				TX_gouhuo_count++;
		//			};
		//		};
		if(type == "TX_gouhuo") {
			PlayerList['16'].ImgDC.src = gouhuo_base64[TX_gouhuo_count];
			if(TX_gouhuo_count >= 8) {
				TX_gouhuo_count = 0;
			} else {
				TX_gouhuo_count++;
			};
		};

		//		// 爆炸特效
		//		if(type == "TX_baozha") {
		//			if(PlayerList['17'].EntryTX) {
		//				PlayerList['17'].ImgDC.src = TX_baozha[TX_baozha_count];
		//				if(TX_baozha_count >= 11) {
		//					TX_baozha_count = 0;
		//					PlayerList['17'].EntryTX = false;
		//					PlayerList['17'].ImgDC.src = TX_baozha[TX_baozha_count]
		//				} else {
		//					TX_baozha_count++;
		//				};
		//				// 音效
		//				if(TX_baozha_count > 10) {
		//					play_BaoZha_YinXiao();
		//				};
		//			}
		//		};

		if(type == "TX_baozha") {
			if(PlayerList['17'].EntryTX) {
				PlayerList['17'].ImgDC.src = baozha[TX_baozha_count];
				if(TX_baozha_count >= 11) {
					TX_baozha_count = 0;
					PlayerList['17'].EntryTX = false;
					PlayerList['17'].ImgDC.src = baozha[TX_baozha_count]
				} else {
					TX_baozha_count++;
				};
				// 音效
				if(TX_baozha_count > 10) {
					play_BaoZha_YinXiao();
				};
			}
		};
		// 特效爆炸
		if(TX_baozha_count0_IS) {
			PlayerList["31"].Posx = PlayerList["2"].Posx;
			PlayerList["31"].Posy = PlayerList["2"].Posy;
			PlayerList["31"].ImgDC.src = baozha[TX_baozha_count0];
			if(TX_baozha_count0 >= 11) {
				TX_baozha_count0_IS = false;
				TX_baozha_count0 = 0;
				PlayerList["31"].ImgDC.src = baozha[TX_baozha_count0]
			} else {
				TX_baozha_count0++;
			}
		};
		if(TX_baozha_count21_IS) {
			PlayerList["31"].Posx = PlayerList["21"].Posx;
			PlayerList["31"].Posy = PlayerList["21"].Posy;
			PlayerList["31"].ImgDC.src = baozha[TX_baozha_count0];
			if(TX_baozha_count0 >= 11) {
				TX_baozha_count21_IS = false;
				TX_baozha_count0 = 0;
				PlayerList["31"].ImgDC.src = baozha[TX_baozha_count0]
			} else {
				TX_baozha_count0++;
			}
		};
		if(TX_baozha_count22_IS) {
			PlayerList["31"].Posx = PlayerList["22"].Posx;
			PlayerList["31"].Posy = PlayerList["22"].Posy;
			PlayerList["31"].ImgDC.src = baozha[TX_baozha_count0];
			if(TX_baozha_count0 >= 11) {
				TX_baozha_count22_IS = false;
				TX_baozha_count0 = 0;
				PlayerList["31"].ImgDC.src = baozha[TX_baozha_count0]
			} else {
				TX_baozha_count0++;
			}
		};
	
	// 特效爆炸
		if(TX_baozha_count0_ISBoom2) {
			PlayerList["32"].Posx = PlayerList["2"].Posx;
			PlayerList["32"].Posy = PlayerList["2"].Posy;
			PlayerList["32"].ImgDC.src = baozha[TX_baozha_count0Boom2];
			if(TX_baozha_count0Boom2 >= 11) {
				TX_baozha_count0_ISBoom2 = false;
				TX_baozha_count0Boom2 = 0;
				PlayerList["32"].ImgDC.src = baozha[TX_baozha_count0Boom2]
			} else {
				TX_baozha_count0Boom2++;
			}
		};
		if(TX_baozha_count21_ISBoom2) {
			PlayerList["32"].Posx = PlayerList["21"].Posx;
			PlayerList["32"].Posy = PlayerList["21"].Posy;
			PlayerList["32"].ImgDC.src = baozha[TX_baozha_count0Boom2];
			if(TX_baozha_count0Boom2 >= 11) {
				TX_baozha_count21_ISBoom2 = false;
				TX_baozha_count0Boom2 = 0;
				PlayerList["32"].ImgDC.src = baozha[TX_baozha_count0Boom2]
			} else {
				TX_baozha_count0Boom2++;
			}
		};
		if(TX_baozha_count22_ISBoom2) {
			PlayerList["32"].Posx = PlayerList["22"].Posx;
			PlayerList["32"].Posy = PlayerList["22"].Posy;
			PlayerList["32"].ImgDC.src = baozha[TX_baozha_count0Boom2];
			if(TX_baozha_count0Boom2 >= 11) {
				TX_baozha_count22_ISBoom2 = false;
				TX_baozha_count0Boom2 = 0;
				PlayerList["32"].ImgDC.src = baozha[TX_baozha_count0Boom2]
			} else {
				TX_baozha_count0Boom2++;
			}
		};
	// 特效爆炸
		if(TX_baozha_count0_ISBoom3) {
			PlayerList["33"].Posx = PlayerList["2"].Posx;
			PlayerList["33"].Posy = PlayerList["2"].Posy;
			PlayerList["33"].ImgDC.src = baozha[TX_baozha_count0Boom3];
			if(TX_baozha_count0Boom3 >= 11) {
				TX_baozha_count0_ISBoom3 = false;
				TX_baozha_count0Boom3 = 0;
				PlayerList["33"].ImgDC.src = baozha[TX_baozha_count0Boom3]
			} else {
				TX_baozha_count0Boom3++;
			}
		};
		if(TX_baozha_count21_ISBoom3) {
			PlayerList["33"].Posx = PlayerList["21"].Posx;
			PlayerList["33"].Posy = PlayerList["21"].Posy;
			PlayerList["33"].ImgDC.src = baozha[TX_baozha_count0Boom3];
			if(TX_baozha_count0Boom3 >= 11) {
				TX_baozha_count21_ISBoom3 = false;
				TX_baozha_count0Boom3 = 0;
				PlayerList["33"].ImgDC.src = baozha[TX_baozha_count0Boom3]
			} else {
				TX_baozha_count0Boom3++;
			}
		};
		if(TX_baozha_count22_ISBoom3) {
			PlayerList["33"].Posx = PlayerList["22"].Posx;
			PlayerList["33"].Posy = PlayerList["22"].Posy;
			PlayerList["33"].ImgDC.src = baozha[TX_baozha_count0Boom3];
			if(TX_baozha_count0Boom3 >= 11) {
				TX_baozha_count22_ISBoom3 = false;
				TX_baozha_count0Boom3 = 0;
				PlayerList["33"].ImgDC.src = baozha[TX_baozha_count0Boom2]
			} else {
				TX_baozha_count0Boom3++;
			}
		};
	// 特效爆炸
		if(TX_baozha_count0_ISBoom4) {
			PlayerList["34"].Posx = PlayerList["2"].Posx;
			PlayerList["34"].Posy = PlayerList["2"].Posy;
			PlayerList["34"].ImgDC.src = baozha[TX_baozha_count0Boom4];
			if(TX_baozha_count0Boom4 >= 11) {
				TX_baozha_count0_ISBoom4 = false;
				TX_baozha_count0Boom4 = 0;
				PlayerList["34"].ImgDC.src = baozha[TX_baozha_count0Boom4]
			} else {
				TX_baozha_count0Boom4++;
			}
		};
		if(TX_baozha_count21_ISBoom4) {
			PlayerList["34"].Posx = PlayerList["21"].Posx;
			PlayerList["34"].Posy = PlayerList["21"].Posy;
			PlayerList["34"].ImgDC.src = baozha[TX_baozha_count0Boom4];
			if(TX_baozha_count0Boom4 >= 11) {
				TX_baozha_count21_ISBoom4 = false;
				TX_baozha_count0Boom4 = 0;
				PlayerList["34"].ImgDC.src = baozha[TX_baozha_count0Boom4]
			} else {
				TX_baozha_count0Boom4++;
			}
		};
		if(TX_baozha_count22_ISBoom4) {
			PlayerList["34"].Posx = PlayerList["22"].Posx;
			PlayerList["34"].Posy = PlayerList["22"].Posy;
			PlayerList["34"].ImgDC.src = baozha[TX_baozha_count0Boom4];
			if(TX_baozha_count0Boom4 >= 11) {
				TX_baozha_count22_ISBoom4 = false;
				TX_baozha_count0Boom4 = 0;
				PlayerList["34"].ImgDC.src = baozha[TX_baozha_count0Boom4]
			} else {
				TX_baozha_count0Boom4++;
			}
		};
	//////
		if(type == "JZ_leida") {
			PlayerList['6'].ImgDC.src = leida_base64[JZ_leida_count];
			if(JZ_leida_count >= 15) {
				JZ_leida_count = 0;
			} else {
				JZ_leida_count++;
			};

			PlayerList['7'].ImgDC.src = leida_base64[JZ_leida_count2];
			if(JZ_leida_count2 >= 15) {
				JZ_leida_count2 = 0;
			} else {
				JZ_leida_count2++;
			};
		};
	}

	// 所有玩家的判断
	if(type == "player") {
		// X 边界化判断
		if(pos_x < 0) {
			pos_x = 0;
		}
		if(pos_x >= 1150) {
			pos_x = 1150;
		}
		// Y 边界化判断
		if(pos_y < 0) {
			pos_y = 0;
		}
		if(pos_y >= 750) {
			pos_y = 750;
		}

	};

	//玩家坦克的判断
	if(type2 == "Tank") {
		// 玩家的地图内判断
		if(true) {
			var id = "1"; // 坦克1
			if(PlayerList[id].XuanZhaun == "after") {
				if(PlayerList[id].Posy < 235) {
					// 区间1判断
					if(PlayerList[id].Posx > 250 && PlayerList[id].Posx < 730) {
						if(PlayerList[id].Posx < 266) {
							PlayerList[id].Posx = 266;
						};
					} else if(PlayerList[id].Posx > 890) {

						if(PlayerList[id].Posx < 910) {
							PlayerList[id].Posx = 910;
						};
					}

				} else if(PlayerList[id].Posy > 335) {
					// 区间3判断
					if(PlayerList[id].Posx > 250 && PlayerList[id].Posx < 730) {
						if(PlayerList[id].Posx < 266) {
							PlayerList[id].Posx = 266;
						};
					} else if(PlayerList[id].Posx > 890) {

						if(PlayerList[id].Posx < 910) {
							PlayerList[id].Posx = 910;
						};
					}
				}

			} else if(PlayerList[id].XuanZhaun == "before") {
				if(PlayerList[id].Posy < 235) {
					// 区间1判断
					if(PlayerList[id].Posx > 0 && PlayerList[id].Posx < 130) {
						if(PlayerList[id].Posx > 95) {
							PlayerList[id].Posx = 95;
						};
					};
					// 区间2判断
					if(PlayerList[id].Posx > 266 && PlayerList[id].Posx < 700) {
						if(PlayerList[id].Posx > 670) {
							PlayerList[id].Posx = 670;
						};
					};

				} else if(PlayerList[id].Posy > 335) {
					// 区间1判断
					if(PlayerList[id].Posx > 0 && PlayerList[id].Posx < 130) {
						if(PlayerList[id].Posx > 95) {
							PlayerList[id].Posx = 95;
						};
					};
					// 区间2判断
					if(PlayerList[id].Posx > 266 && PlayerList[id].Posx < 700) {
						if(PlayerList[id].Posx > 670) {
							PlayerList[id].Posx = 670;
						};
					};
				}
			} else if(PlayerList[id].XuanZhaun == "right") {
				if(PlayerList[id].Posx > 850) {
					if(PlayerList[id].Posy < 133) {
						PlayerList[id].Posy = 133;
					}
				} else if(PlayerList[id].Posx > 105 && PlayerList[id].Posx < 236) {

					if(PlayerList[id].Posy < 235) {
						PlayerList[id].Posy = 235;
					}
				} else if(PlayerList[id].Posx > 720 && PlayerList[id].Posx <= 850) {

					if(PlayerList[id].Posy < 260) {
						PlayerList[id].Posy = 260;
					}

				}
			} else if(PlayerList[id].XuanZhaun == "left") {
				if(PlayerList[id].Posx > 850) {
					if(PlayerList[id].Posy > 620) {
						PlayerList[id].Posy = 620;
					}
				} else if(PlayerList[id].Posx > 105 && PlayerList[id].Posx < 236) {

					if(PlayerList[id].Posy > 335) {
						PlayerList[id].Posy = 335;
					}

				} else if(PlayerList[id].Posx > 720 && PlayerList[id].Posx <= 850) {

					if(PlayerList[id].Posy > 335) {
						PlayerList[id].Posy = 335;
					}

				}
			}
		};
		if(true) {
			var id = "14"; // 坦克1
			if(PlayerList[id].XuanZhaun == "after") {
				if(PlayerList[id].Posy < 235) {
					// 区间1判断
					if(PlayerList[id].Posx < 266 && PlayerList[id].Posx < 730) {
						PlayerList[id].Posx = 266;
					};
					// 区间2判断
					if(PlayerList[id].Posx < 910) {
						PlayerList[id].Posx = 910;
					};
				} else if(PlayerList[id].Posy > 335) {
					// 区间3判断
					if(PlayerList[id].Posx < 266 && PlayerList[id].Posx < 730) {
						PlayerList[id].Posx = 266;
					};
					// 区间2判断
					if(PlayerList[id].Posx > 740) {
						if(PlayerList[id].Posx < 910) {
							PlayerList[id].Posx = 910;
						};
					}
				}

			} else if(PlayerList[id].XuanZhaun == "before") {
				if(PlayerList[id].Posy < 235) {
					// 区间1判断
					if(PlayerList[id].Posx > 0 && PlayerList[id].Posx < 130) {
						if(PlayerList[id].Posx > 95) {
							PlayerList[id].Posx = 95;
						};
					};
					// 区间2判断
					if(PlayerList[id].Posx > 266 && PlayerList[id].Posx < 700) {
						if(PlayerList[id].Posx > 670) {
							PlayerList[id].Posx = 670;
						};
					};

				} else if(PlayerList[id].Posy > 335) {
					// 区间1判断
					if(PlayerList[id].Posx > 0 && PlayerList[id].Posx < 130) {
						if(PlayerList[id].Posx > 95) {
							PlayerList[id].Posx = 95;
						};
					};
					// 区间2判断
					if(PlayerList[id].Posx > 266 && PlayerList[id].Posx < 700) {
						if(PlayerList[id].Posx > 670) {
							PlayerList[id].Posx = 670;
						};
					};
				}
			} else if(PlayerList[id].XuanZhaun == "right") {
				if(PlayerList[id].Posx > 850) {
					if(PlayerList[id].Posy < 133) {
						PlayerList[id].Posy = 133;
					}
				}
			} else if(PlayerList[id].XuanZhaun == "left") {
				if(PlayerList[id].Posx > 850) {
					if(PlayerList[id].Posy > 620) {
						PlayerList[id].Posy = 620;
					}
				}
			}
		};
	};

	// 巡逻飞机
	if(type == "x_boss") {
		if(x_bossPosX == 1200) {
			//for(id in PlayerList) {
			var id = "3";
			if(PlayerList[id].type == "x_boss") {
				PlayerList[id].Posy = Math.floor(Math.random() * 700);
				pos_y = PlayerList[id].Posy;
			}
			//}
		}
	};

	// AI 坦克 id = "21"
	if(type == "AI_Tank") {

		if(true) {
			var id = "21";
			AI_KaiGuan_JiShu++;
			// AI的边缘判断
			// AI方向--向左判断 'before','left','right','after'
			if(AI_FangXianglist[AI_TankFangXiang] == "before" && PlayerList[id].Posx < 280) {
				// 1 如果坦克方向是向前移动
				if(PlayerList[id].Posy < 780) { // 可以向左
					AI_TankFangXiang = 1;
				} else { // 可以向右
					AI_TankFangXiang = 2;
				}
			} else if(AI_FangXianglist[AI_TankFangXiang] == "left" && PlayerList[id].Posy > 700) {
				// 2 如果坦克方向是向左移动
				if(PlayerList[id].Posx < 650) {
					// 可以向后
					AI_TankFangXiang = 3;
				} else { // 可以向前
					AI_TankFangXiang = 0;
				}
			} else if(AI_FangXianglist[AI_TankFangXiang] == "right" && PlayerList[id].Posy < 10) {
				// 2 如果坦克方向是向左移动
				if(PlayerList[id].Posx > 280) {
					// 可以向前
					AI_TankFangXiang = 0;
				} else { // 可以向后
					AI_TankFangXiang = 3;
				}
			} else if(AI_FangXianglist[AI_TankFangXiang] == "after" && PlayerList[id].Posx > 650) {
				// 2 如果坦克方向是向左移动
				if(PlayerList[id].Posy > 10) {
					// 可以向左
					AI_TankFangXiang = 2;
				} else { // 可以向右
					AI_TankFangXiang = 1;
				}
			};
			// 按照方向随机--AI的智能等级，处理高级的AI
			if(AI_KaiGuan_JiShu % 4000 == 0 && AI_KaiGuan_JiShu != 0) {
				AI_TankFangXiang = ShuiHangShu(AI_FangXianglist.length);
				AI_KaiGuan_JiShu = 0;
			};

			// 速度和方向
			if(AI_FangXianglist[AI_TankFangXiang] == "before") { // 向前运动
				PlayerList[id].Posx -= 0.12;
				PlayerList[id].ImgDC.src = "img/role/di1_tank/unittank22base004.png";
				PlayerList[id].Ready = false;
				PlayerList[id].ImgDC.onload = function() {
					PlayerList[id].Ready = true;
				}
			} else if(AI_FangXianglist[AI_TankFangXiang] == "left") { // 向左运动
				PlayerList[id].Posy += 0.12;
				PlayerList[id].ImgDC.src = "img/role/di1_tank/unittank22base006.png";
				PlayerList[id].Ready = false;
				PlayerList[id].ImgDC.onload = function() {
					PlayerList[id].Ready = true;
				}

			} else
			if(AI_FangXianglist[AI_TankFangXiang] == "right") { // 向右运动
				PlayerList[id].Posy -= 0.12;
				PlayerList[id].ImgDC.src = "img/role/di1_tank/unittank22base002.png";
				PlayerList[id].Ready = false;
				PlayerList[id].ImgDC.onload = function() {
					PlayerList[id].Ready = true;
				}

			} else if(AI_FangXianglist[AI_TankFangXiang] == "after") { // 向后运动
				PlayerList[id].Posx += 0.12;
				PlayerList[id].ImgDC.src = "img/role/di1_tank/unittank22base000.png";
				PlayerList[id].Ready = false;
				PlayerList[id].ImgDC.onload = function() {
					PlayerList[id].Ready = true;
				}
			};
			// AI_Tank的炮弹
			if(AI_Tank_BooM_1 == false) {
				if(AI_FangXianglist[AI_TankFangXiang] == "before") {
					AI_Tank_BooM_FanXiang = "before";
					PlayerList["25"].Posx = PlayerList[id].Posx;
					if(AI_Tank_BooM_1 == false) {
						PlayerList["25"].Posy = PlayerList[id].Posy + 26;
						AI_Tank_BooM_1 = true;
					}
				} else if(AI_FangXianglist[AI_TankFangXiang] == "after") {
					AI_Tank_BooM_FanXiang = "after";
					PlayerList["25"].Posx = PlayerList[id].Posx + 70;
					if(AI_Tank_BooM_1 == false) {
						PlayerList["25"].Posy = PlayerList[id].Posy + 26;
						AI_Tank_BooM_1 = true;
					}
				} else if(AI_FangXianglist[AI_TankFangXiang] == "right") {
					AI_Tank_BooM_FanXiang = "right";
					PlayerList["25"].Posx = PlayerList[id].Posx + 34;
					if(AI_Tank_BooM_1 == false) {
						PlayerList["25"].Posy = PlayerList[id].Posy;
						AI_Tank_BooM_1 = true;
					}
				} else if(AI_FangXianglist[AI_TankFangXiang] == "left") {
					AI_Tank_BooM_FanXiang = "left";
					PlayerList["25"].Posx = PlayerList[id].Posx + 32;
					if(AI_Tank_BooM_1 == false) {
						PlayerList["25"].Posy = PlayerList[id].Posy + 45;
						AI_Tank_BooM_1 = true;
					}
				};
			} else {
				if(AI_Tank_BooM_FanXiang == "before") {
					PlayerList["25"].Posx -= 0.6;
					if(PlayerList["25"].Posx < 0) {
						AI_Tank_BooM_1 = false;
					}
				} else if(AI_Tank_BooM_FanXiang == "after") {
					PlayerList["25"].Posx += 0.6;
					if(PlayerList["25"].Posx > 1200) {
						AI_Tank_BooM_1 = false;
					}
				} else if(AI_Tank_BooM_FanXiang == "right") {
					PlayerList["25"].Posy -= 0.6;
					if(PlayerList["25"].Posy < 0) {
						AI_Tank_BooM_1 = false;
					}
				} else if(AI_Tank_BooM_FanXiang == "left") {
					PlayerList["25"].Posy += 0.6;
					if(PlayerList["25"].Posy > 800) {
						AI_Tank_BooM_1 = false;
					}
				}
			}
			// end()... ...
		};

		if(true) {
			var id = "22";
			AI_KaiGuan2_JiShu++;
			// AI的边缘判断
			// AI方向--向左判断 'before','left','right','after'
			if(AI_FangXianglist[AI_TankFangXiang1] == "before" && PlayerList[id].Posx < 280) {
				// 1 如果坦克方向是向前移动
				if(PlayerList[id].Posy < 780) { // 可以向左
					AI_TankFangXiang1 = 1;
				} else { // 可以向右
					AI_TankFangXiang1 = 2;
				}
			} else if(AI_FangXianglist[AI_TankFangXiang1] == "left" && PlayerList[id].Posy > 700) {
				// 2 如果坦克方向是向左移动
				if(PlayerList[id].Posx < 650) {
					// 可以向后
					AI_TankFangXiang1 = 3;
				} else { // 可以向前
					AI_TankFangXiang1 = 0;
				}
			} else if(AI_FangXianglist[AI_TankFangXiang1] == "right" && PlayerList[id].Posy < 10) {
				// 2 如果坦克方向是向左移动
				if(PlayerList[id].Posx > 280) {
					// 可以向前
					AI_TankFangXiang1 = 0;
				} else { // 可以向后
					AI_TankFangXiang1 = 3;
				}
			} else if(AI_FangXianglist[AI_TankFangXiang1] == "after" && PlayerList[id].Posx > 650) {
				// 2 如果坦克方向是向左移动
				if(PlayerList[id].Posy > 10) {
					// 可以向左
					AI_TankFangXiang1 = 2;
				} else { // 可以向右
					AI_TankFangXiang1 = 1;
				}
			};
			// 按照方向随机--AI的智能等级，处理高级的AI
			if(AI_KaiGuan2_JiShu % 5000 == 0 && AI_KaiGuan2_JiShu != 0) {
				AI_TankFangXiang1 = ShuiHangShu(AI_FangXianglist.length);
				AI_KaiGuan2_JiShu = 0;
			};

			// 速度和方向
			if(AI_FangXianglist[AI_TankFangXiang1] == "before") { // 向前运动
				PlayerList[id].Posx -= 0.15;
				PlayerList[id].ImgDC.src = "img/role/di2_tank/unittank2base004.png";
				PlayerList[id].Ready = false;
				PlayerList[id].ImgDC.onload = function() {
					PlayerList[id].Ready = true;
				}
			} else if(AI_FangXianglist[AI_TankFangXiang1] == "left") { // 向左运动
				PlayerList[id].Posy += 0.15;
				PlayerList[id].ImgDC.src = "img/role/di2_tank/unittank2base006.png";
				PlayerList[id].Ready = false;
				PlayerList[id].ImgDC.onload = function() {
					PlayerList[id].Ready = true;
				}

			} else if(AI_FangXianglist[AI_TankFangXiang1] == "right") { // 向右运动
				PlayerList[id].Posy -= 0.15;
				PlayerList[id].ImgDC.src = "img/role/di2_tank/unittank2base002.png";
				PlayerList[id].Ready = false;
				PlayerList[id].ImgDC.onload = function() {
					PlayerList[id].Ready = true;
				}

			} else if(AI_FangXianglist[AI_TankFangXiang1] == "after") { // 向后运动
				PlayerList[id].Posx += 0.15;
				PlayerList[id].ImgDC.src = "img/role/di2_tank/unittank2base000.png";
				PlayerList[id].Ready = false;
				PlayerList[id].ImgDC.onload = function() {
					PlayerList[id].Ready = true;
				}
			}
			// AI_Tank的炮弹
			if(AI_Tank_BooM_2 == false) {
				if(AI_FangXianglist[AI_TankFangXiang1] == "before") {
					AI_Tank_BooM_FanXiang1 = "before";
					PlayerList["26"].Posx = PlayerList[id].Posx;
					if(AI_Tank_BooM_2 == false) {
						PlayerList["26"].Posy = PlayerList[id].Posy + 26;
						AI_Tank_BooM_2 = true;
					}
				} else if(AI_FangXianglist[AI_TankFangXiang1] == "after") {
					AI_Tank_BooM_FanXiang1 = "after";
					PlayerList["26"].Posx = PlayerList[id].Posx + 70;
					if(AI_Tank_BooM_2 == false) {
						PlayerList["26"].Posy = PlayerList[id].Posy + 26;
						AI_Tank_BooM_2 = true;
					}
				} else if(AI_FangXianglist[AI_TankFangXiang1] == "right") {
					AI_Tank_BooM_FanXiang1 = "right";
					PlayerList["26"].Posx = PlayerList[id].Posx + 34;
					if(AI_Tank_BooM_2 == false) {
						PlayerList["26"].Posy = PlayerList[id].Posy;
						AI_Tank_BooM_2 = true;
					}
				} else if(AI_FangXianglist[AI_TankFangXiang1] == "left") {
					AI_Tank_BooM_FanXiang1 = "left";
					PlayerList["26"].Posx = PlayerList[id].Posx + 32;
					if(AI_Tank_BooM_2 == false) {
						PlayerList["26"].Posy = PlayerList[id].Posy + 45;
						AI_Tank_BooM_2 = true;
					}
				};
			} else {
				if(AI_Tank_BooM_FanXiang1 == "before") {
					PlayerList["26"].Posx -= 0.8;
					if(PlayerList["26"].Posx < 0) {
						AI_Tank_BooM_2 = false;
					}
				} else if(AI_Tank_BooM_FanXiang1 == "after") {
					PlayerList["26"].Posx += 0.8;
					if(PlayerList["26"].Posx > 1200) {
						AI_Tank_BooM_2 = false;
					}
				} else if(AI_Tank_BooM_FanXiang1 == "right") {
					PlayerList["26"].Posy -= 0.8;
					if(PlayerList["26"].Posy < 0) {
						AI_Tank_BooM_2 = false;
					}
				} else if(AI_Tank_BooM_FanXiang1 == "left") {
					PlayerList["26"].Posy += 0.8;
					if(PlayerList["26"].Posy > 800) {
						AI_Tank_BooM_2 = false;
					}
				}
			}
			//end() ... ...
		}
	}
	// 禁飞区
	JiFeiQu();
	// 炮弹
	Player_Tank_Boom();
	//if(jiaodu == "0") {
	if(runnerImageDCData != null) {
		ctx.drawImage(runnerImageDCData, pos_x, pos_y, kuang, gao);
	}
	//}
}

// 循环所有人物的动画
function XH_Player_Data() {
	for(id in PlayerList) {
		//去除炮弹显示
		if(PlayerList["4"].EntryTX == false) {
			continue;
		};
		RunnIng_Player(PlayerList[id].ImgDC, PlayerList[id].Posx, PlayerList[id].Posy,
			PlayerList[id].kuang, PlayerList[id].gao, PlayerList[id].type, PlayerList[id].XuanZhaun, PlayerList[id].type2);
	}
	return
}

// 更新动画，也就是所有的精灵重新一起绘制
function animate(time) {
	itime++;
	// 初始化画布
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// 特效动画
	// PC_Boss动画
	// 人物动画
	XH_Player_Data();
	//更新和绘制动画函数  
	requestNextAnimationFrame(animate)
}

// 角色旋转
function Player_tran(Img, zhongxinX, zhongxinY, JiaoDu, Kuan, Gao, PosX, PosY) {
	ctx.save(); //保存状态
	ctx.translate(0, 0); //设置画布上的(0,0)位置，也就是旋转的中心点

	if(JiaoDu == "90") {
		ctx.rotate(90 * Math.PI / 180);
		ctx.drawImage(Img, PosY, -PosX, Kuan, Gao);
	} else if(JiaoDu == "180") {
		ctx.rotate(180 * Math.PI / 180);
		ctx.drawImage(Img, -PosX, -PosY, Kuan, Gao);
	} else if(JiaoDu == "270") {
		ctx.rotate(270 * Math.PI / 180);
		ctx.drawImage(Img, -PosY, PosX, Kuan, Gao);
	} else if(JiaoDu == "1") // 特殊处理
	{
		ctx.drawImage(Img, PosX, PosY, Kuan, Gao);
	}
	ctx.restore(); //恢复状态
}