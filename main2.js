// 創造 img HTML 元素，並放入變數中
var bgImg = document.createElement("img");
var enemyImg = document.createElement("img");
var bnImg = document.createElement("img");
var bnImg = document.createElement("img");

// 設定這個元素的要顯示的圖片
bnImg.src ="images/tower-btn.png";
bgImg.src = "images/map.png";
enemyImg.src = "images/slime.gif";
// 找出網頁中的 canvas 元素
var canvas = document.getElementById("messi");

// 取得 2D繪圖用的物件
var ctx = canvas.getContext("2d");

function draw(){
	// 將背景圖片畫在 canvas 上的 (0,0) 位置
ctx.drawImage(bgImg,0,0);
ctx.drawImage(enemyImg,enemy.x,enemy.y);
ctx.drawImage(bnImg,640-64,480-64,64,64)
ctx.drawImage(bnImg,towerImg,cursor.x,cursor.y)

}
// 執行 draw 函式
setInterval(draw, 16)
 
 var enemy={
 x:96,
 y:480-32


}

$('#messi').on('mousemove',cursorMove);

function cursorMove(event){
    console.log("x: " + event.offsetX + "y: " + event.offsetY)
cursor.x = event.offsetX;
cursor.y = event.offsetY;
}
var cursor ={
	x: 100,
y:200
}