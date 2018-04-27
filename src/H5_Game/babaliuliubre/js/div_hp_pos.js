function Change_Boss_HP_Pos(pos) {
	var level = 10000;
	var Boss_HP_div = document.getElementById('hp_boss');
	Boss_HP_div.style.top = pos - 1 + "px";
//	Boss_HP_div.style.background = "-webkit-linear-gradient(left, green " +level.toString()+",white 10%)";
	Boss_HP_div.innerHTML = PlayerList["2"].Hp+"/"+level.toString();
	Change_Player1_HP_Pos();
	Change_Player2_HP_Pos();
	Change_Player3_HP_Pos();
	Change_Player4_HP_Pos();
	return
}



function Change_Player1_HP_Pos() {
	var level = 2000;
	var Boss_HP_div = document.getElementById('hp_player1');
	Boss_HP_div.style.top = PlayerList["0"].Posy - 1 + "px";
	Boss_HP_div.style.left = PlayerList["0"].Posx +20+ "px";
	Boss_HP_div.innerHTML = PlayerList["0"].Hp+"/"+level.toString();
	return
}
function Change_Player2_HP_Pos(pos) {
	var level = 2000;
	var Boss_HP_div = document.getElementById('hp_player2');
	Boss_HP_div.style.top = PlayerList["1"].Posy - 1 + "px";
	Boss_HP_div.style.left = PlayerList["1"].Posx + "px";
	Boss_HP_div.innerHTML = PlayerList["1"].Hp+"/"+level.toString();
	return
}
function Change_Player3_HP_Pos(pos) {
	var level = 2000;
	var Boss_HP_div = document.getElementById('hp_player3');
	Boss_HP_div.style.top = PlayerList["14"].Posy - 1 + "px";
	Boss_HP_div.style.left = PlayerList["14"].Posx + "px";
	Boss_HP_div.innerHTML = PlayerList["14"].Hp+"/"+level.toString();
	return
}

function Change_Player4_HP_Pos(pos) {
	var level = 2000;
	var Boss_HP_div = document.getElementById('hp_player4');
	Boss_HP_div.style.top = PlayerList["15"].Posy + 10 + "px";
	Boss_HP_div.style.left = PlayerList["15"].Posx + 20+"px";
	Boss_HP_div.innerHTML = PlayerList["15"].Hp+"/"+level.toString();
	return
}