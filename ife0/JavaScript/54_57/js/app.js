var stage = document.getElementById("stage");
var restart = document.getElementById("restart");

var factory = new footballFieldFactory();
var fieldLength = 120;
var fieldWidth = 75;
var containerLength = 900;
var containerWidth = 450;
var proportion = 0;
var playerNum = 0;

var inter = null; 
var players = [];

restart.onclick = function(){
  if(inter != null)
    clearInterval(inter);
  playerNum = 0;
  players = [];
  init();
}

init();
function init(){
  createFootballField();
  for(var i=0;i<3;i++){
    players[i] = new Player(proportion,fieldLength,fieldWidth,++playerNum);
    addAPlayer(players[i].createPlayer());
    players[i].run(Math.random()*fieldLength,Math.random()*fieldWidth);
  }
  // 每隔5秒钟随机生成一个位置让球员跑过去
  inter = setInterval(function(){
    for(var i=0;i<3;i++){
      players[i].run(Math.random()*fieldLength,Math.random()*fieldWidth);
    }
  },5000);
}

// 创建足球场
function createFootballField(){
  stage.innerHTML = "";
  var container = factory.createField(fieldLength,fieldWidth,containerLength,containerWidth);
  stage.appendChild(container);
  // 每次重新设置球场大小时更新比例
  proportion = Math.max(fieldLength/containerLength,fieldWidth/containerWidth);
}

function addAPlayer(player){
  var field = document.getElementsByClassName("field")[0];
  field.appendChild(player);
}


var controls = new function(){
  // 长度90—120米，宽度45—90米
  this.fieldLength = 100;
  this.fieldWidth = 75;
  this.containerLength = 600;
  this.containerWidth = 400;
  this.changeData = function(){
    fieldLength = controls.fieldLength;
    fieldWidth = controls.fieldWidth;
    containerLength = controls.containerLength;
    containerWidth = controls.containerWidth;
    createFootballField();
    clearInterval(inter);
    inter = null;
  }
}

var gui = new dat.GUI();
gui.add(controls,"fieldLength",90,120).onChange(controls.changeData);
gui.add(controls,"fieldWidth",45,90).onChange(controls.changeData);
gui.add(controls,"containerLength",500,800).onChange(controls.changeData);
gui.add(controls,"containerWidth",350,500).onChange(controls.changeData);
