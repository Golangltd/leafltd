// 游戏引擎
var DuiZhan = function(){
	
	
};

// 定义游戏引擎的属性
DuiZhan.prototype = {
	// 定义方法
	draw:function(now){
		
	},
	
	// 创建一个精灵对象
	// 游戏单元格加载，加载图片并分割
	//  游戏图片只要一个就可以了
	creatGameSprites: function(){
		var DuiZahn,
		    DuiZahnArtist = new  SpriteSheetArtist(this.spritesheet,this.DuiZhanCells);
		    for(var i = 0;i<this.DuiZhanData.lenth;++i){
		    	// 加载所有的精灵的图片数据
		    	DuiZahn = new Sprite('DuiZhan',DuiZahnArtist,
		    	[
		    	this.paceBehavior,
		    	this.DuiZhanBehavior,
		    	new CucleBehavior(
		    		300,
		    		5000)
		    	]);
		    	
		    	//数据的
		    	DuiZahn.width = this.DUIZHAN_CELLS_WIDTH;
		    	DuiZahn.height = this.DUIZHAN_CELLS_HEIGHT;
		    	DuiZahn.velocityX = DuiZhanBait.DUIZHAN_PACE_VELOCITY;
		        this.DuiZahns.push(DuiZahn);
		    }
	},

};
