var stage = document.getElementById("stage");

var factory = new footballFieldFactory();
var fieldLength = 120;
var fieldWidth = 75;
var containerLength = 700;
var containerWidth = 450;
var proportion = 0;
var playerNum = 0;

var inter = null; 
var players = [];
var ball = null;

var sliderFoo1 = document.getElementById("player-kick1");
var sliderFoo2 = document.getElementById("player-kick2");

init();

function init(){
  createFootballField();
  createBall();
  for(var i=0;i<3;i++){
    players[i] = new Player(proportion,fieldLength,fieldWidth,++playerNum);
    addAPlayer(players[i].createPlayer());
    players[i].run(ball.meterX,ball.meterY);
  }
  setSelect();
}

// 设置球的位置
$("#setball").click(function(){
  var x = $("#ball-x-set").val();
  var y = $("#ball-y-set").val();
  if(judgeXY(x,y))
    ball.setBallPos(Number(x),Number(y));
});

// 设置人的位置
$("#setplayer").click(function(){
  var x = $("#player-x-set").val();
  var y = $("#player-y-set").val();
  if(judgeXY(x,y)){
    var num = $("#player-list").val();
    players[num].setPlayerPos(Number(x),Number(y)); 
  }
});

// 跑向足球
$("#gotoball").click(function(){
  var num = $("#player-list").val();
  players[num].run(ball.meterX,ball.meterY); 
});

// 运动员停下
$("#stopplayer").click(function(){
  var num = $("#player-list").val();
  players[num].stopmove(); 
});

// 添加运动员
$("#addplayer").click(function(){
  var x = $("#player-x-set-add").val();
  var y = $("#player-y-set-add").val();
  var VNum = $("#player-vnum").val();
  var angle = $("#player-angle").val();
  var explosiveNum = $("#player-explosive").val();
  var physicalNum = $("#player-physical").val();
  var tech = $("#player-tech").val();
  var energy = $("#player-energy").val();

  if(!judgeXY(x,y))
    return;

  x = Number(x);
  y = Number(y);
  VNum = VNum == "" ? 45 : Number(VNum);
  angle = angle == "" ? 0 : Number(angle);
  explosiveNum = explosiveNum == "" ? 45 : Number(explosiveNum);
  physicalNum = physicalNum == "" ? 45 : Number(physicalNum);
  tech = tech == "" ? 45 : Number(tech);
  energy = energy == "" ? 45 : Number(energy);

  if(!(VNum>=1 && VNum<=99 && explosiveNum>=1 && explosiveNum<=99 && physicalNum>=1 && physicalNum<=99
     && tech>=1 && tech<=99 && energy>=1 && energy<=99 && angle>=0 && angle<=Math.PI*2)){
    alert("输入数据不合法!");
    return;
  }

  var index = playerNum;
  players[index] = new Player(proportion,fieldLength,fieldWidth,++playerNum);
  players[index].VNum = VNum;
  players[index].angle = angle;
  players[index].explosiveNum = explosiveNum;
  players[index].physicalNum = physicalNum;
  players[index].tech = tech;
  players[index].energy = energy;

  setSelect();
  addAPlayer(players[index].createPlayer(x,y));
});

// 踢球
$("#kick").click(function(){
  var v0 = $("#player-kick-v0").val();
  var angle = $("#player-kick-angle").val();

  if(v0 != "" && angle != "" && Number(v0) > 0 && Number(angle) >= 0 && Number(angle) <= 360){
    var num = $("#player-list").val();
    angle = angle / 180 * Math.PI;
    players[num].kickBall(v0,angle,ball);
  }else{
    alert("输入数据不合法!");
  }
});

// 判断x y值是否合法
function judgeXY(x,y){
  if(x == "" || isNaN(Number(x)) || isNaN(Number(x)) || Number(x) < 0 || Number(x) > fieldLength
     || y == "" || Number(y) < 0 || Number(y) > fieldWidth){
    alert("输入数据不合法!");
    return false;
  }  
  return true;
}

// 生成球员选择列表
function setSelect(){
  var select;
  for(var i=0;i<playerNum;i++){
    select += `<option value="` + i + `">` + (i+1) + `号</option>`;
  }
  $("#player-list").html(select);
}

// 创建足球让足球动
function createBall(){
  ball = new Ball(proportion,90*Math.random(),80*Math.random(),fieldLength,fieldWidth);
}

// 创建足球场
function createFootballField(){
  stage.innerHTML = "";
  var container = factory.createField(fieldLength,fieldWidth,containerLength,containerWidth);
  stage.appendChild(container);
  // 每次重新设置球场大小时更新比例
  proportion = Math.max(fieldLength/containerLength,fieldWidth/containerWidth);
}

// 添加一个球员
function addAPlayer(player){
  var field = document.getElementsByClassName("field")[0];
  field.appendChild(player);
}

// 滑块
var s1 = new slider(sliderFoo1);
s1.maxNum = 50;
s1.foo.innerHTML =  `<div class="con">
    <div class="bar"></div>
    <div class="bar-v"></div>
    <div class="but"></div>
    <input id="player-kick-v0" type="text" placeholder="踢球初速度(m/s)" class="text">
  </div>`;
var s2 = new slider(sliderFoo2);
s2.maxNum = 360;
s2.foo.innerHTML =  `<div class="con">
    <div class="bar"></div>
    <div class="bar-v"></div>
    <div class="but"></div>
    <input id="player-kick-angle" type="text" placeholder="踢球角度(度)" class="text">
  </div>`;
