var monthSelect = document.getElementById("month-select");
var daySelect = document.getElementById("day-select");
var hourSelect = document.getElementById("hour-select");
var minuteSelect = document.getElementById("minute-select");
var selects = document.getElementById("selects");
var title = document.getElementById("title");
var text = document.getElementById("text-canvas");
var canvas = document.getElementById("clock-canvas");
var timeTitle = document.getElementById("time-title");

var width = text.width = canvas.width = timeTitle.clientWidth;
var height = text.height = canvas.height = timeTitle.clientHeight;
var radius = 180;
var transformNum = 0;
var clickFlag = false;

var animates = ["bounce","flash","pulse"];
var aniIndex = 0;
var time = [];  // 月(+1) 日 时 分
var targetTime;

init();

function init(){
  if(localStorage.getItem("left-time")){
    time = JSON.parse(localStorage.getItem("left-time"));
  }else{
    time = [8,8,8,8];
    localStorage.setItem("left-time",JSON.stringify(time));
  }
  createOptions();
  setNumberCard();
  updateLeftTime();
  drawClock();
  drawText();
}

setInterval(function(){
  drawClock();
  updateLeftTime();
},1000);

setInterval(function(){
  title.className = "animated " + animates[aniIndex++];
  if(aniIndex>3)
    aniIndex=0;
},2000);

var clickInter = setInterval(function(){
  if(!clickFlag){
    createTip();
  }else{
    clearInterval(clickInter);
  }
},4000);

// 点击文字显示时钟提示
function createTip(){
  var span = document.createElement("span");
  span.innerHTML = "点我呀~";
  span.id = "tip";
  span.className = "animated swing";
  timeTitle.appendChild(span);
  setTimeout(function(){
    timeTitle.removeChild(span);
  },1000);
}

// 画文字
function drawText(){
  var textCtx = text.getContext("2d");
  textCtx.fillStyle = "black";
  textCtx.fillRect(0,0,400,400);
  textCtx.beginPath();
  textCtx.fillStyle = "white";
  textCtx.font = "60px Arial";
  textCtx.textAlign = "center";
  textCtx.fillText("距离回家还有",200,200);
}

// 画时钟
function drawClock(){
  var ctx1 = canvas.getContext("2d");
  ctx1.fillStyle = "#000";
  ctx1.fillRect(0,0,400,400);
  // 时钟外圆
  ctx1.beginPath();
  ctx1.fillStyle = "#ffd700";
  ctx1.arc(width/2,height/2,150,0,2*Math.PI);
  ctx1.fill();
  
  // 时钟上的数字
  ctx1.beginPath();
  ctx1.fillStyle = "red";
  ctx1.font = "20px Arial";
  for(var i=1;i<=12;i++){
  ctx1.fillText(i,width/2-5+Math.sin(i*(Math.PI/6))*140,height/2+10-Math.cos(i*(Math.PI/6))*140);
  }
  // 时针 分针 秒针
  var date = new Date();
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  var hl = 100;
  var ml = 120;
  var sl = 140;

  ctx1.lineWidth = "10";
  ctx1.beginPath();
  ctx1.strokeStyle = "#f2f2f2";
  ctx1.moveTo(width/2,height/2);
  ctx1.lineTo(width/2+Math.sin((h+m/60)/12*2*Math.PI)*hl,height/2-Math.cos((h+m/60)/12*2*Math.PI)*hl);
  ctx1.stroke();
  ctx1.lineWidth = "5";
  ctx1.beginPath();
  ctx1.strokeStyle = "#f2f2f2";
  ctx1.moveTo(width/2,height/2);
  ctx1.lineTo(width/2+Math.sin((m+s/60)/60*2*Math.PI)*ml,height/2-Math.cos((m+s/60)/60*2*Math.PI)*ml);
  ctx1.stroke();
  ctx1.lineWidth = "3";
  ctx1.beginPath();
  ctx1.strokeStyle = "#ee9572";
  ctx1.moveTo(width/2,height/2);
  ctx1.lineTo(width/2+Math.sin(s/60*2*Math.PI)*sl,height/2-Math.cos(s/60*2*Math.PI)*sl);
  ctx1.stroke();

  // 时钟中心
  ctx1.beginPath();
  ctx1.fillStyle = "#333";
  ctx1.arc(width/2,height/2,5,0,2*Math.PI);
  ctx1.fill();
}

// 更新倒计时
function updateLeftTime(){
  targetTime = new Date(2018,time[0],time[1],time[2],time[3],0);
  var date = new Date();
  var deltaTime = Date.parse(targetTime) - Date.parse(date);
  var seconds = Math.floor(deltaTime/1000);
  var dayNum = Math.floor(seconds/60/60/24);
  seconds -= dayNum * 24 * 60 * 60;
  var hourNum = Math.floor(seconds/60/60);
  seconds -= hourNum * 60 * 60;
  var minuteNum = Math.floor(seconds/60);
  seconds -= minuteNum * 60;
  var secondNum = seconds;
  $("#time-day").html(dayNum);
  $("#time-hour").html(hourNum);
  $("#time-minute").html(minuteNum);
  $("#time-second").html(secondNum);
}

// 适配屏幕
function bodyScale(){
  var deviceWidth = document.documentElement.clientWidth;
  var scale = deviceWidth / 640;
  document.body.style.zoom = scale;
}
window.onload = window.onresize = bodyScale;

// 生成options
function createOptions(){
  // month
  for(var i=0;i<12;i++){
    var option = document.createElement("option");
    option.innerHTML = i + 1;
    option.value = i + 1;
    if(i == time[0])
      option.selected = "true";
    monthSelect.appendChild(option);
  }
  var days = [31,28,31,30,31,30,31,31,30,31,30,31];
  // day
  for(var i=0;i<days[monthSelect.value - 1];i++){
    var option = document.createElement("option");
    option.innerHTML = i + 1;
    option.value = i + 1;
    if(i+1 == time[1])
      option.selected = "true";
    daySelect.appendChild(option);
  }
  // hour
  for(var i=0;i<24;i++){
    var option = document.createElement("option");
    option.innerHTML = i;
    option.value = i;
    if(i == time[2])
      option.selected = "true";
    hourSelect.appendChild(option);
  }
  // minute
  for(var i=0;i<60;i++){
    var option = document.createElement("option");
    option.innerHTML = i;
    option.value = i;
    if(i == time[3])
      option.selected = "true";
    minuteSelect.appendChild(option);
  }
}

// 根据月份更新日期
function updateDays(){
  var day = daySelect.value;
  daySelect.innerHTML = "";
  var days = [31,28,31,30,31,30,31,31,30,31,30,31];
  for(var i=0;i<days[monthSelect.value - 1];i++){
    var option = document.createElement("option");
    option.innerHTML = i + 1;
    option.value = i + 1;
    if(day == i+1)
      option.selected = "true";
    daySelect.appendChild(option);
  }
}

// 事件监听
selects.addEventListener("change",function(event){
  var event = event || window.event;
  var target = event.target;
  if(target.id == "month-select"){
    updateDays();
  }
  if(target.id == "month-select" || target.id == "hour-select" || target.id == "minute-select" || target.id == "day-select"){
    updateTime();
    setNumberCard();
  }
});

$("#time-title").click(function(){
  clickFlag = true;
  if(transformNum == 0){
    $(this).css("transform","rotateY(180deg)");
    transformNum++;
  }else{
    $(this).css("transform","");
    transformNum = 0;
  }
});

// 更新time
function updateTime(){
  time[0] = monthSelect.value - 1;
  time[1] = daySelect.value;
  time[2] = hourSelect.value;
  time[3] = minuteSelect.value;
  localStorage.setItem("left-time",JSON.stringify(time));
}

// 设置数字卡片
function setNumberCard(){
  $("#left-time-month").html(time[0]+1);
  $("#left-time-day").html(time[1]);
  $("#left-time-hour").html(time[2]);
  $("#left-time-minute").html(time[3]);
}
