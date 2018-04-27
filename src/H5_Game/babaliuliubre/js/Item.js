// 变量
var Item_Lan = false;
var Item_HDJ = false;

function ItemInIt() {
	var logo = document.getElementById("Itme_1");
	logo.draggable = true;

	// 获取隐藏的div模块
	var box = document.getElementById('GGame');
	box.ondragover = function(event) {
		event.preventDefault(); // 除去事件的默认行为
	};
	box.ondrop = function(event) {
		box.appendChild(logo);
	}

	//重置地图
	var ReMap = document.getElementById('Itme_1');
	ReMap.onmousedown = function(e) {
		ShowItemData();
	};
}

// 显示道具列表
function ShowItemData() {
	if(Item_Lan == false) {
		var ShowItemHub = document.getElementById('DaoJuLan');
		ShowItemHub.style.display = "block";
		Item_Lan = true;
	} else {
		var ShowItemHub = document.getElementById('DaoJuLan');
		ShowItemHub.style.display = "none";
		Item_Lan = false;
	}
}

// 道具2被点击
function onclick_Item2(){

//	if (Item_HDJ == false)
//	{
//			alert("[选择核打击支援]");
//			Item_HDJ = true;
//	}
//	else
//	{
//		alert("[取消选择核打击支援]");
//		Item_HDJ = false;
//	}
	return
}
