function bodyScale(){
  var width = document.documentElement.clientWidth;
  var scale = width / 640;
  document.body.style.zoom = scale;
}

window.onload = window.onresize = bodyScale;

var minesCon = document.getElementById("mines-con");
var container = document.getElementById("container");
var fanpai = document.getElementById("fanpai");
var biaoqi = document.getElementById("biaoqi");
var modeCon = document.getElementById("mode-con");
var moveTimes = document.getElementById("move-times");
var score = document.getElementById("score");
var leftTime = document.getElementById("left-time");

var maxMinesNum = 5;  //周围八个格中雷的最多个数
var minesPos = [];
var size = 10;
var minesNum = 18;
var mines = [];
var gameTime = 180;
var isSetFlag = false;    // 是否处于标旗状态
var moveNum = 0;
var inter;      // 倒计时计时器
var timeout;
var scoreNum = 0;
var flagNum = 0;    // 记录已标旗的数量

// var timeOutEvent;  // 用于长按事件计时器
// var timeOutFlag = false;

init();
function init(){
  var r = document.getElementById("restart-con");
  if(r)
    container.removeChild(r);
  minesCon.innerHTML = "";
  mines = generateMines(size,minesNum);
  while(!judgeDistribution(size,mines)){
    mines = generateMines(size,minesNum);
  }
  setAroundNum(size,mines);
  createMineDivs(size,mines);
  moveTimes.innerHTML = 0;
  score.innerHTML = 0;
  leftTime.innerHTML = gameTime;
  moveNum = 0;
  scoreNum = 0;
  inter = 0;
  // console.log(mines);
  createLeftTime(gameTime);
}

// 事件监听
minesCon.addEventListener("click",function(event){
  var event = event || window.event;
  var target = event.target;
  var divs = document.getElementsByClassName("fangkuai");
  if(!isSetFlag){
    for(var i=0;i<divs.length;i++){
      if(divs[i] == target){
        if(target.getAttribute("data-flag") != 1)
          moveTimes.innerHTML = ++moveNum;
        var row = Math.floor(i / size);
        var col = i - row * size;
        displayInfo(row,col);
      }
    }
  }else{
    setFlag(target);
  }
  if(judgeSuccess()){
    scoreNum += minesNum * 5;
    updateScore();
    restart("厉害哟");
  }
  updateScore();
});

modeCon.onclick = function(event){
  var event = event || window.event;
  var target = event.target;
  if(target.id == "fanpai"){
    isSetFlag = false;
    fanpai.className = "choose";
    biaoqi.className = "un-choose";
  }else if(target.id == "biaoqi"){
    isSetFlag = true;
    biaoqi.className = "choose";
    fanpai.className = "un-choose";
  }
}

// 判断是否所有牌都已经翻开或标旗  游戏成功
function judgeSuccess(){
  console.log("a");
  var divs = document.getElementsByClassName("fangkuai");
  var flagPos = [];
  for(var i=0;i<divs.length;i++){
    if(divs[i].getAttribute("data-flag") == 0){
      return false;
    }else if(divs[i].getAttribute("data-flag") == 2){
      flagPos.push(i+1);
    }
  }
  if(flagPos.length != minesPos.length)
    return false;
  for(var i=0;i<flagPos.length;i++){
    if(minesPos.indexOf(flagPos[i]) == -1)
      return false;
  }
  return true;
}

// 计算得分
function updateScore(){
  // 每翻开一个不是雷的牌得1分 最后标记成功所有的雷每个雷加5分
  score.innerHTML = scoreNum;
}

// $("#mines-con").on({
//   touchstart: function(e){
//     // 长按事件
//     timeOutFlag = false;
//     timeOutEvent = setTimeout(function(){
//       console.log("a");
//       setFlag(e.target);
//       timeOutFlag = true;
//     },666);
//     e.preventDefault();
//   },
//   touchmove: function(){
//     if(!timeOutFlag)
//       clearTimeout(timeOutEvent); 
//   },
//   touchend: function(e){
//     if(!timeOutFlag){
//       // 单击事件
//       clearTimeout(timeOutEvent);
//       var target = e.target;
//       if(target.nodeName.toLowerCase() != "div" || target.getAttribute("data-flag") != 0)
//         return;
//       var divs = document.getElementsByClassName("fangkuai");
//       for(var i=0;i<divs.length;i++){
//         if(divs[i] == target){
//           var row = Math.floor(i / size);
//           var col = i - row * size;
//           displayInfo(row,col);
//         }
//       }
//     }
//   }
// });

// 设置倒计时
function createLeftTime(gameTime){
  timeout = setTimeout(function(){
    clearInterval(inter);
    restart("时间到");
  },gameTime*1000);
  var span = document.getElementById("left-time");
  span.innerHTML = gameTime--;
  inter = setInterval(function(){
    span.innerHTML = gameTime--;
  },1000);
}

// 创建重新开始
function restart(str){
  var div = document.createElement("div");
  div.id = "restart-con";
  var div2 = document.createElement("div");
  div2.id = "restart-div";
  div2.className = "animated tada";
  var span1 = document.createElement("span");
  var span2 = document.createElement("span");
  span1.innerHTML = str;
  span1.id = "die-info";
  span2.innerHTML = "重新开始";
  span2.id = "restart";
  div2.appendChild(span1);
  div2.appendChild(span2);
  div.appendChild(div2);
  container.appendChild(div);
  span2.onclick = init;
}

// 响应标旗点击事件
function setFlag(div){
  if(flagNum >= minesNum){
    alert("已经是最大数量了");
    return;
  }
  if(div.nodeName.toLowerCase() == "img")
    div = div.parentNode;
  var flag = div.getAttribute("data-flag");
  if(flag == 0){
    flagNum++;
    moveTimes.innerHTML = ++moveNum;
    div.setAttribute("data-flag",2);
    var img = document.createElement("img");
    img.src = "images/flag.png";
    div.appendChild(img);
  }else if(flag == 2){
    flagNum--;
    moveTimes.innerHTML = ++moveNum;
    div.setAttribute("data-flag",0);
    div.removeChild(div.getElementsByTagName("img")[0]);
  }
}

// 显示特定位置的数字或雷 如果点到空格则扩展到跟该空格直接相连的数字
function displayInfo(row,col){
  var divs = document.getElementsByClassName("fangkuai");
  var div = divs[row*size+col];
  if(div.getAttribute("data-flag") == 2)
    return;
  scoreNum++;
  mines[row][col].dis = true;
  div.setAttribute("data-flag",1);
  if(mines[row][col].num == 0){
    div.style.backgroundColor = "#6699ff";
    if(row - 1 >= 0 && !mines[row-1][col].dis)
      displayInfo(row-1,col);
    if(row + 1 < size && !mines[row+1][col].dis)
      displayInfo(row+1,col);
    if(col - 1 >= 0 && !mines[row][col-1].dis)
      displayInfo(row,col-1);
    if(col + 1 < size && !mines[row][col+1].dis)
      displayInfo(row,col+1);
  }else if(mines[row][col].num != 0){
    updateMineDiv(row,col);
  }
}

// 创建游戏主区域初始化divs
function createMineDivs(size,mines){
  for(var i=0;i<size;i++){
    for(var j=0;j<size;j++){
      var div = document.createElement("div");
      div.className = "fangkuai";
      div.setAttribute("data-flag",0);  // data-flag 0未翻开 1翻开 2标旗
      minesCon.appendChild(div);
    }
  }
}

// 改变指定位置的div样式
function updateMineDiv(row,col){
  var colors = ["red","blue","#99ff66","yellow","white"];
  var divs = document.getElementsByClassName("fangkuai");
  var div = divs[row*size+col];
  div.style.backgroundColor = "#6699ff";
  var num = mines[row][col].num;
  if(num == -1){
    var img = document.createElement("img");
    img.src = "images/dilei.png";
    div.appendChild(img);
    setTimeout(function(){
      clearInterval(inter);
      clearTimeout(timeout);
      restart("踩雷了");
    },100);
  }else if(num > 0){
    div.style.color = colors[num-1]
    div.innerHTML = num;
  }
}

// 生成地雷分布
function generateMines(size,minesNum){
  // size 区域长度和宽度8~12  minesNum  地雷数量 总数量的10%~20%
  var mines = [];
  // -1 表示有雷  >0 表示没有雷 数字表示周围八个格中雷的个数  数字<=maxMinesNum
  for(var i=0;i<size;i++){
    var arr = [];
    for(var j=0;j<size;j++){
      arr.push({num:0,dis:false});
    }
    mines.push(arr);
  }
  minesPos = [];
  var totalNum = size * size;
  while(minesPos.length < minesNum){
    var t = Math.round(Math.random()*totalNum);
    if(minesPos.indexOf(t) == -1)
      minesPos.push(t);
  }
  for(var i=0;i<minesPos.length;i++){
    var row = Math.floor(minesPos[i] / size);
    var col = minesPos[i] - row * size - 1;
    if(col == -1 && row != 0){
      col = size - 1;
      row -= 1;
    }else if(col == -1 && row == 0){
      col = 0;
    }
    mines[row][col].num = -1;
  }
  return mines;
}

// 判断周围8个格中雷的个数是否超出限制
function judgeDistribution(size,mines){
  for(var i=1;i<size-1;i++){
    for(var j=1;j<size-1;j++){
      var num = 0;
      if(mines[i-1][j-1].num == -1)
        num++;
      if(mines[i-1][j].num == -1)
        num++;
      if(mines[i-1][j+1].num == -1)
        num++;
      if(mines[i][j-1].num == -1)
        num++;
      if(mines[i][j+1].num == -1)
        num++;
      if(mines[i+1][j-1].num == -1)
        num++;
      if(mines[i+1][j].num == -1)
        num++;
      if(mines[i+1][j+1].num == -1)
        num++;
      if(num > maxMinesNum)
        return false;
      if(mines[i][j] == 0){
        mines[i][j].num = num;
      }
    }
  }
  return true;
}

// 设置周围雷的个数
function setAroundNum(size,mines){
  for(var i=0;i<size;i++){
    for(var j=0;j<size;j++){
      if(mines[i][j].num == -1)
        continue;
      var num = 0;
      if(i-1 >= 0 && j-1 >= 0 && mines[i-1][j-1].num == -1)
        num++;
      if(i-1 >= 0 && mines[i-1][j].num == -1)
        num++;
      if(i-1 >= 0 && j+1 < size && mines[i-1][j+1].num == -1)
        num++;
      if(j-1 >= 0 && mines[i][j-1].num == -1)
        num++;
      if(j+1 < size && mines[i][j+1].num == -1)
        num++;
      if(i+1 < size && j-1 >= 0 && mines[i+1][j-1].num == -1)
        num++;
      if(i+1 < size && mines[i+1][j].num == -1)
        num++;
      if(i+1 < size && j+1 < size && mines[i+1][j+1].num == -1)
        num++;
      mines[i][j].num = num;
    }
  }
}
