
// 自动生产二维码函数
function Auto_QRCode(url) {
	var qrcode = new QRCode(document.getElementById("BaBaLiuLiu-EWM"), {
		width: "120", //设置宽高
		height:"120",
	});
	qrcode.makeCode(url);
}
