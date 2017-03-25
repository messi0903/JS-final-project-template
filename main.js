
var HP = 100;
var score = 0;
var money = 100;
var FPS = 60;
var clock = 0;
// 創造 img HTML 元素，並放入變數中
var bgImg = document.createElement("img");
var enemyImg = document.createElement("img");
var btnImg = document.createElement("img");
var towerImg = document.createElement("img");
var crosshairImg = document.createElement("img");

// 設定這個元素的要顯示的圖片
bgImg.src = "images/map.png";
enemyImg.src = "images/slime.gif";
btnImg.src = "images/tower-btn.png";
towerImg.src = "images/tower.png";
crosshairImg.src = "images/crosshair.png"

// 找出網頁中的 canvas 元素
var canvas = document.getElementById("messi");

// 取得 2D繪圖用的物件
var ctx = canvas.getContext("2d");

function draw(){
	clock++;
	if((clock%80)==0){
		var newEnemy = new Enemy();
		enemies.push(newEnemy);
	}
	
	// 將背景圖片畫在 canvas 上的 (0,0) 位置
	ctx.drawImage(bgImg,0,0);
	for(var i = 0; i < enemies.length; i++){
		if(enemies[i].HP <= 0){
			enemies.splice(i, 1);
			score += 10;
			money += 30;
		}else{
			enemies[i].move();	
			ctx.drawImage(enemyImg,enemies[i].x,enemies[i].y);
		}
	}
	ctx.drawImage(btnImg,640-64,480-64,64,64);

	if(isBuilding == true){
		ctx.drawImage(towerImg,cursor.x-cursor.x%32,cursor.y-cursor.y%32);
	} else{
		ctx.drawImage(towerImg,tower.x,tower.y);
	}
	tower.searchEnemy();
	if(tower.aimingEnemyId != null){
		var id = tower.aimingEnemyId;
		ctx.drawImage(crosshairImg, enemies[id].x, enemies[id].y)
	}
	ctx.font = "24px Arial";
	ctx.fillStyle = "white";
	ctx.fillText("HP: " + HP, 10, 32);
	ctx.fillText("Score: " +  score, 10, 64)
	ctx.fillText("Money: " + money, 10,96)
if(HP < 0){
clearInterval(intervalID)
ctx.font = "24px Arial";
ctx.fillStyle = "white";	
	}
}

// 執行 draw 函式
var intervalID = setInterval(draw, 1000/FPS);

var enemypath =[
{x: 96, y: 64},
{x: 384,y: 64 },
{x: 384,y: 192 },
{x: 224,y: 192 },
{x: 224,y: 320 },
{x: 544,y: 320 },
{x: 544,y: 96 }
];
function Enemy () {
	this.x= 96;
	this.y= 480-32;
	this.speedX= 0;
	this.speedY= -64;
	this.pathDes= 0;
	this.HP = 100;
	this.move= function(){
		
		if(iscollided(enemypath[this.pathDes].x, enemypath[this.pathDes].y, this.x, this.y,64/FPS,64/FPS)){

			this.x = enemypath[this.pathDes].x;
			this.y = enemypath[this.pathDes].y;
			this.pathDes++;
			if (this.pathDes == enemypath.length) {
				this.HP = 0;
				HP -= 10;
				return;
			}
			if(enemypath[this.pathDes].y < this.y){
				this.speedX = 0;
				this.speedY = -64;
			}else if(enemypath[this.pathDes].x > this.x){
				this.speedX = 64;
				this.speedY = 0;
			}else if (enemypath[this.pathDes].y > this.y) {
				this.speedX = 0;
				this.speedY = 64;
			}else if (enemypath[this.pathDes].x < this.x) {
				this.speedX = -64;
				this.speedY = 0;
			}
			

		}else{
			this.x += this.speedX/FPS;
			this.y += this.speedY/FPS;
		}
			
	}
}
var enemies = [];
var cursor = {
	x: 100,
	y: 200
}
	var tower = {
	x: 0,
	y: 0,
	range: 96,
	aimingEnemyId: null,
	searchEnemy: function(){
		for(var i=0; i<enemies.length; i++){
			var distance = Math.sqrt(Math.pow(this.x-enemies[i].x,2) + Math.pow(this.y-enemies[i].y,2));
			if (distance<=this.range) {
				this.aimingEnemyId = i;
				return;
			}
		}

	


	this.aimingEnemyId = null;
	}

}

var tower = {
shoot:function(id){
ctx.beginPath();
ctx.moveTo(this.x, this.y);
ctx.lineTo(enemies[id].x, enemies[id].y);
ctx.strokeStyle = 'yellow';
ctx.lineWidth = 3;
ctx.stroke();
enemies[id].HP -= this.danage;
},
	fireRate: 1,
readyToshootTime: 1,
	x: 0,
	y: 0,
danage :100,
range: 96,
	aimingEnemyId: null,
	searchEnemy: function(){
		this.readyToshootTime -= 1000/FPS;
		for(var i=0; i<enemies.length; i++){
			var distance = Math.sqrt(Math.pow(this.x-enemies[i].x,2) + Math.pow(this.y-enemies[i].y,2));
			if (distance<=this.range) {
				this.aimingEnemyId = i;
				if(this.readyToshootTime <= 0){
					this.shoot(i);
					this.readyToshootTime = this.fireRate;
				}
				return;
			}
		}
		// 如果都沒找到，會進到這行，清除鎖定的目標
		this.aimingEnemyId = null;
	}
}

$("#messi").on("mousemove", mousemove);
function mousemove(event){
	cursor.x = event.offsetX;
	cursor.y = event.offsetY;
}

var isBuilding = false;

$("#messi").on("click", mouseclick);
function mouseclick(){
	if(cursor.x > 576 && cursor.y > 416){
		isBuilding = true;
	} else{
		// 蓋塔
		if(isBuilding == true){
			tower.x = cursor.x - cursor.x%32;
			tower.y = cursor.y - cursor.y%32;
		}
		// 建造完成
		isBuilding = false;
	}
}
function iscollided(pointX, pointY, targetX, targetY, targetwidth, targetheight){
	if(targetX <= pointX &&
					pointX <= targetX +targetwidth &&
		targetY <= pointY &&
					pointY <= targetY + targetheight){
		return true;
	}else{								
		return false;
	}
}