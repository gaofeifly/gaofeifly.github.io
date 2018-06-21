function Player(proportion,fieldLength,fieldWidth,playerNum){
  this.length = 2/proportion;
  this.VNum = Math.ceil(Math.random()*99);
  this.VMax = Math.round(3 + (this.VNum - 1) * (9 / 98));   // m/s 最高速度
  this.explosiveNum = Math.ceil(Math.random()*99);       // 爆发力
  this.physicalNum = Math.ceil(Math.random()*99);        // 体力
  this.TUp = 4 - 3 / 98 *(this.explosiveNum - 1);           // 达到最大速度需要的时间
  this.TMax = 10 + 5 / 98 *(this.physicalNum - 1);           // 在最大速度维持的时间
  this.p = document.createElement("div"); 
  this.playerNum = playerNum;
  this.Va = this.VMax/this.TUp;         // 加速度  米每二次方秒
  this.s1 = 0.5 * this.Va * this.TUp * this.TUp;     // 达到最大速度时移动的距离
  this.s2 = this.s1 + this.TMax * this.VMax;      // 以最大速度运动结束时移动的距离
}
// 创建一个球员
Player.prototype.createPlayer = function(){
  var random1 = 0.1 + 0.8 * Math.random();  // 0.1 ~ 0.9
  var random2 = 0.1 + 0.8 * Math.random();  
  this.p.className = "player";
  this.p.id = "player" + playerNum; 
  this.p.style.width = this.length + "px";
  this.p.style.height = this.length + "px";
  this.p.style.left = (fieldLength/proportion)*random1 + "px";
  this.p.style.top = (fieldWidth/proportion)*random2 + "px";
  this.p.style.backgroundColor = "rgb(" + Math.random()*255 + "," + Math.random()*255 + "," + Math.random()*255 + ")";
  this.p.innerHTML = this.playerNum;
  return this.p;
}
// 球员奔跑到指定地点   相对于球场左上角的米的坐标
Player.prototype.run = function(meterX,meterY){
  var left = this.p.style.left;
  var top = this.p.style.top;
  var x1 = Number(left.substring(0,left.length-2))*proportion;     // 单位：米
  var y1 = Number(top.substring(0,top.length-2))*proportion;
  var x2 = meterX;
  var y2 = meterY;
  var distance = Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));    // 起始点与终点的距离
  var d = distance - 10;        // 留出10米用于减速
  var t = 0;
  var v = 0;
  // 根据起始点与终点的位置关系不同更改正负号
  var flag1 = x2 - x1 > 0 ? 1 : -1;
  var flag2 = y2 - y1 > 0 ? 1 : -1;
  var that = this;
  if(d < 0){
    // 匀速
    this.p.style.transition = "all " + 2 + "s linear";
    this.p.style.left = x2/proportion + "px";
    this.p.style.top = y2/proportion + "px";
  }else if(d <= this.s1){
    t = Math.sqrt(2 * d / this.Va).toFixed(2);
    v = this.Va * t;
    // 加速阶段
    this.p.style.transition = "all " + t + "s cubic-bezier(.62,.13,.82,.43)";
    this.p.style.left = (x2-7*flag1)/proportion + "px";
    this.p.style.top = (y2-7*flag2)/proportion + "px";
    // 减速阶段
    setTimeout(function(){
      var tt = 20 / v;
      that.p.style.transition = "all " + tt + "s cubic-bezier(.25,.74,.6,.95)";
      that.p.style.left = x2/proportion + "px";
      that.p.style.top = y2/proportion + "px";
    },t);
  }else if(d <= this.s2){
    // 加速阶段
    this.p.style.transition = "all " + this.TUp + "s cubic-bezier(.62,.13,.82,.43)";
    this.p.style.left = (x1+this.s1*0.707*flag1)/proportion + "px";
    this.p.style.top = (y1+this.s1*0.707*flag2)/proportion + "px";
    // 匀速阶段
    setTimeout(function(){
      t = (d - that.s1) / that.VMax;
      that.p.style.transition = "all " + t + "s linear";
      that.p.style.left = (x2-7*flag1)/proportion + "px";
      that.p.style.top = (y2-7*flag2)/proportion + "px";
    },this.TUp);
    // 减速阶段
    v = this.VMax;
    setTimeout(function(){
      var tt = 20 / v;
      that.p.style.transition = "all " + tt + "s cubic-bezier(.25,.74,.6,.95)";
      that.p.style.left = x2/proportion + "px";
      that.p.style.top = y2/proportion + "px";
    },t + this.TUp);
  }else if(d > this.s2){
    // 加速阶段
    this.p.style.transition = "all " + this.TUp + "s cubic-bezier(.62,.13,.82,.43)";
    this.p.style.left = (x1+this.s1*0.707*flag1)/proportion + "px";
    this.p.style.top = (y1+this.s1*0.707*flag2)/proportion + "px";
    // 匀速阶段
    setTimeout(function(){
      that.p.style.transition = "all " + that.TMax + "s linear";
      that.p.style.left = (x1+that.s2*0.707*flag1)/proportion + "px";
      that.p.style.top = (y1+that.s2*0.707*flag2)/proportion + "px";
    },this.TUp);
    // 减速阶段
    v = this.VMax;
    setTimeout(function(){
      var tt = 20 / v;
      that.p.style.transition = "all " + tt + "s cubic-bezier(.25,.74,.6,.95)";
      that.p.style.left = x2/proportion + "px";
      that.p.style.top = y2/proportion + "px";
    },this.TMax + this.TUp);
  }
}