var leveljisuan1 = 0;
var leveljisuan2 = 0;
var leveljisuan3 = 0;
var leveljisuan4 = 0;
var leveljisuan6 = GameTime;

// 点击确定后，结束界面消失
function GameOver_ReStart() {
	var UI_GameOverjisuan1 = document.getElementById('GameOver');
	UI_GameOverjisuan1.style.display = "none";
	GameOver_Data();
	leveljisuan1 = 0;
	leveljisuan2 = 0;
	leveljisuan3 = 0;
	leveljisuan4 = 0;
	leveljisuan6 = 0;
	location.href = 'http://www.iyplay.com';
}

// 游戏结束数据展示
function GameOver_Data() {
	var UI_GameOverjisuan1 = document.getElementById('jisuan1');
	UI_GameOverjisuan1.innerHTML = "损失： " + leveljisuan1.toString() + " 架";

	var UI_GameOverjisuan2 = document.getElementById('jisuan2');
	UI_GameOverjisuan2.innerHTML = "损失： " + leveljisuan2.toString() + " 架";

	var UI_GameOverjisuan3 = document.getElementById('jisuan3');
	UI_GameOverjisuan3.innerHTML = "损失： " + leveljisuan3.toString() + " 架";

	var UI_GameOverjisuan4 = document.getElementById('jisuan4');
	UI_GameOverjisuan4.innerHTML = "损失： " + leveljisuan4.toString() + " 架";

	var UI_GameOverjisuan6 = document.getElementById('jisuan6');
	UI_GameOverjisuan6.innerHTML = "耗时： " + leveljisuan6.toString() + " 秒";
}