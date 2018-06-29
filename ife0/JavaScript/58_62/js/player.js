function Player(proportion,fieldLength,fieldWidth,playerNum){
  this.stop = false;
  this.length = 2/proportion;
  this.proportion = proportion;
  this.x = 0;     // 单位是像素
  this.y = 0;
  this.angle = 0;   // 运动方向
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
  this.interArray = [];     // 存放run中的所有interval
  this.timeoutArray = [];     // 存放run中的所有timeout
  this.v = 0;     // 球员速度
  this.interNum = 0;    // 计时器的数量
  this.timeoutNum = 0;
  this.tech = 45;      // 技术 1~99
  this.energy = 45;    // 力量 1~99
  this.kickVMax = 50 - 45 * (99 - this.energy) / 98;    // 踢球最大初速度
}
// 创建一个球员
Player.prototype.createPlayer = function(x,y){
  var random1 = 0.1 + 0.8 * Math.random();  // 0.1 ~ 0.9
  var random2 = 0.1 + 0.8 * Math.random();  
  this.p.className = "player";
  this.p.id = "player" + playerNum; 
  this.p.style.width = this.length + "px";
  this.p.style.height = this.length + "px";
  this.x = x/proportion || (fieldLength/proportion)*random1;
  this.y = y/proportion || (fieldWidth/proportion)*random2;
  this.p.style.left = this.x + "px";
  this.p.style.top = this.y + "px";
  this.p.style.backgroundColor = "rgb(" + Math.random()*255 + "," + Math.random()*255 + "," + Math.random()*255 + ")";
  this.p.innerHTML = this.playerNum;

  return this.p;
}
// 踢球
Player.prototype.kickBall = function(v0,angle,ball){
  var pi = Math.PI;
  var angle = angle;
  // 速度和踢球角度分别要受到运动员本身的技术值和实际踢球时的角度差的两次影响
  // 球员和球之间的距离小于2米时才可踢球
  if(!(this.x * proportion - ball.meterX < 2 && this.y * proportion - ball.meterY < 2)){
    alert("踢不着啊!");
    return;
  }
  var sgema = 1 + (99 - this.tech) / (98*2) * (Math.random() <= 0.5 ? 1 : -1);

  if(this.v == 0 && ball.v == 0){
    // 静止踢静止
    this.angle = 0;
    // 计算初速度   加速度暂定为0
    var v = v0 / sgema;
    var ang = 0.4 - Math.abs(this.angle - angle) / pi * 0.8;
    if(ang > pi)
      ang = 0.4 - (2 * pi - Math.abs(this.angle - angle)) / pi * 0.8;
    v += ang * v; 
    if(v > this.kickVMax)
      v = this.kickVMax;

    angle /= sgema;
    ball.move(angle,v,0);
  }else if(this.v == 0 && ball.v > 0){
    // 静止踢运动
    var a = angle - ball.angle > 0 ? angle - ball.angle : angle - ball.angle + 2 * pi;
    var c;
    if(a > 0 && a <= pi / 2){
      c = a/3;
    }else if(a > pi / 2 && a <= 3*pi/2){
      c = pi/3 - a/3;
    }else{
      c = a/3 - 2*pi/3;
    }
    c *= (1 - (this.tech - 1)/98);

    var v = v0 / sgema;
    var ang = 0.4 - Math.abs(this.angle - angle) / pi * 0.8;
    if(ang > Math.PI)
      ang = 0.4 - (2 * pi - Math.abs(this.angle - angle)) / pi * 0.8;
    v += ang * v; 
    if(v > this.kickVMax)
      v = this.kickVMax;

    angle /= sgema;
    angle += c;
    ball.move(angle,v,0);
  }else if(this.v > 0 && ball.v == 0){
    // 运动踢静止
    var a = this.angle - angle > 0 ? this.angle - angle : this.angle - angle + 2 * pi;
    var b;
    if(a <= pi){
      b = 1 + (pi - a) / pi;
    }else{
      b = 2 - (2 * pi - a) / pi;
    }
    sgema = sgema * b;

    var v = v0 / sgema;
    var ang = 0.4 - Math.abs(this.angle - angle) / pi * 0.8;
    if(ang > pi)
      ang = 0.4 - (2 * pi - Math.abs(this.angle - angle)) / pi * 0.8;
    v += ang * v; 
    if(v > this.kickVMax)
      v = this.kickVMax;

    angle /= sgema;
    ball.move(angle,v,0);
  }else{

    // 运动踢运动
    var a = this.angle - ball.angle > 0 ? this.angle - ball.angle : this.angle - ball.angle + 2 * pi;
    var d;
    if(a > 0 && a <= pi / 2){
      d = a/3;
    }else if(a > pi / 2 && a <= 3*pi/2){
      d = pi/3 - a/3;
    }else{
      d = a/3 - 2*pi/3;
    }
    d *= (1 - (this.tech - 1)/98);

    var v = v0 / sgema;
    var ang = 0.4 - Math.abs(this.angle - angle) / pi * 0.8;
    if(ang > Math.PI)
      ang = 0.4 - (2 * pi - Math.abs(this.angle - angle)) / pi * 0.8;
    v += ang * v; 
    if(v > this.kickVMax)
      v = this.kickVMax;

    angle /= sgema;
    angle += d;
    ball.move(angle,v,0);
  }
}
// 改变css位置
Player.prototype.setPos = function(){
  this.p.style.left = this.x + "px";
  this.p.style.top = this.y + "px";
}
Player.prototype.setPlayerPos = function(x,y){
  this.x = x / this.proportion;
  this.y = y / this.proportion;
  this.p.style.left = this.x + "px";
  this.p.style.top = this.y + "px";
}
Player.prototype.stopmove = function(){
  for(var i=0;i<this.interArray.length;i++){
    clearInterval(this.interArray[i]); 
  }
  for(var i=0;i<this.timeoutArray.length;i++){
    clearTimeout(this.timeoutArray[i]); 
  }
  this.v = 0;
}
// 球员奔跑到指定地点   相对于球场左上角的米的坐标
Player.prototype.run = function(meterX,meterY){
  this.interNum = 0;
  this.timeoutNum = 0;
  this.v = 0;
  var proportion = this.proportion;
  // 清空上次run中的所有计时器
  for(var i=0;i<this.interArray.length;i++){
    clearInterval(this.interArray[i]); 
  }
  for(var i=0;i<this.timeoutArray.length;i++){
    clearTimeout(this.timeoutArray[i]); 
  }
  if(this.stop){
    console.log("stop");
    return;
  }
  var x1 = this.x*proportion;     // 单位：米
  var y1 = this.y*proportion;
  var x2 = meterX;
  var y2 = meterY;
  // console.log(x1+","+x2);
  var dX = x2 - x1;    // 起始点与终点的距离
  var dY = y2 - y1;
  var d = Math.sqrt(dX*dX+dY*dY);
  var t = 0.05;      // 每t秒变换一次位置
  var totalTime = 0;    // 完成本次运动需要的时间

  if(dX > 0 && dY > 0){
    // pi/2 ~ pi
    this.angle = Math.atan2(dY,dX) + Math.PI/2;
  }else if(dX < 0 && dY > 0){
    // pi ~ 3pi/2
    this.angle = Math.atan2(dY,dX) + Math.PI/2;
  }else if(dX < 0 && dY < 0){
    // 3pi/2 ~ 2pi
    this.angle = Math.atan2(dY,dX) + 5*Math.PI/2;
  }else if(dX > 0 && dY < 0){
    // 0 ~ pi/2
    this.angle = Math.atan2(dY,dX) + Math.PI/2;
  }
  
  var that = this;

  if(d < 5){
    // console.log("s0");

    // 离得特别近 匀速
    totalTime = 2;

    that.interArray[that.interNum++] = setInterval(function(){
      that.v = d / totalTime; 
      if(that.v > that.VMax)
        that.v = that.VMax;
      
      var s = that.v * t;
      that.x += (s * Math.sin(that.angle))/proportion;
      that.y -= (s * Math.cos(that.angle))/proportion;
      that.setPos();
    },t*1000);

    that.timeoutArray[that.timeoutNum++] = setTimeout(function(){
      clearInterval(that.interArray[0]);
      // 跑到足球位置后不自动停下 以低速慢跑
      that.interArray[that.interNum++] = setInterval(function(){
        that.v = 1;
        that.x += (that.v * t * Math.sin(that.angle))/proportion;
        that.y -= (that.v * t * Math.cos(that.angle))/proportion;
        that.setPos();
      },t*1000);
    },totalTime*1000);

    that.timeoutArray[that.timeoutNum++] = setTimeout(function(){
      clearInterval(that.interArray[1]);
    },totalTime*1000+10000);

  }else if(d <= this.s1){
    // 加速阶段
    totalTime = Math.sqrt(2*d/this.Va);
    // console.log("s1");

    that.interArray[that.interNum++] = setInterval(function(){
      that.v += that.Va * t;
      if(that.v > that.VMax)
        that.v = that.VMax;
      that.x += (that.v * t * Math.sin(that.angle))/proportion;
      that.y -= (that.v * t * Math.cos(that.angle))/proportion;
      that.setPos();
    },t*1000);

    that.timeoutArray[that.timeoutNum++] = setTimeout(function(){
      clearInterval(that.interArray[0]);
      that.interArray[that.interNum++] = setInterval(function(){
        that.v = 1;
        that.x += (that.v * t * Math.sin(that.angle))/proportion;
        that.y -= (that.v * t * Math.cos(that.angle))/proportion;
        that.setPos();
      },t*1000);
    },totalTime*1000);

    that.timeoutArray[that.timeoutNum++] = setTimeout(function(){
      clearInterval(that.interArray[1]);
    },totalTime*1000+10000);

  }else if(d <= this.s2){
    // console.log("s2");
    
    totalTime = this.TUp + (d-this.s1)/this.VMax;


    // 加速阶段
    that.interArray[that.interNum++] = setInterval(function(){
      that.v += that.Va * t;
      if(that.v > that.VMax){
        that.v = that.VMax;
      }
      that.x += (that.v * t * Math.sin(that.angle))/proportion;
      that.y -= (that.v * t * Math.cos(that.angle))/proportion;
      that.setPos();
    },t*1000);


    that.timeoutArray[that.timeoutNum++] = setTimeout(function(){

      clearInterval(that.interArray[0]);
      // 匀速阶段
      that.interArray[that.interNum++] = setInterval(function(){
        that.x += (that.v * t * Math.sin(that.angle))/proportion;
        that.y -= (that.v * t * Math.cos(that.angle))/proportion;
        that.setPos();
      },t*1000);
    },that.TUp*1000);

    that.timeoutArray[that.timeoutNum++] = setTimeout(function(){
      clearInterval(that.interArray[1]);
      that.interArray[that.interNum++] = setInterval(function(){
        that.v = 1;
        that.x += (that.v * t * Math.sin(that.angle))/proportion;
        that.y -= (that.v * t * Math.cos(that.angle))/proportion;
        that.setPos();
      },t*1000);
    },totalTime*1000);

    that.timeoutArray[that.timeoutNum++] = setTimeout(function(){
      clearInterval(that.interArray[2]);
    },totalTime*1000+10000);

  }else if(d > this.s2){

    // console.log("s3");
    totalTime = this.TUp + this.TMax + 2;
    // 加速阶段
    that.interArray[that.interNum++] = setInterval(function(){

      that.v += that.Va * t;
      if(that.v > that.VMax)
        that.v = that.VMax;

      that.x += (that.v * t * Math.sin(that.angle))/proportion;
      that.y -= (that.v * t * Math.cos(that.angle))/proportion;
      that.setPos();
    },t*1000);

    that.timeoutArray[that.timeoutNum++] = setTimeout(function(){

      clearInterval(that.interArray[0]);
      // 匀速阶段
      that.interArray[that.interNum++] = setInterval(function(){
        that.x += (that.v * t * Math.sin(that.angle))/proportion;
        that.y -= (that.v * t * Math.cos(that.angle))/proportion;
        that.setPos();
      },t*1000);
    },that.TUp*1000);

    that.timeoutArray[that.timeoutNum++] = setTimeout(function(){
      clearInterval(that.interArray[1]);
      // 减速阶段
      that.interArray[that.interNum++] = setInterval(function(){
        that.v = (d - that.s2) / 2; 
        that.x += (that.v * t * Math.sin(that.angle))/proportion;
        that.y -= (that.v * t * Math.cos(that.angle))/proportion;
        that.setPos();
      },t*1000);
    },(that.TUp + that.TMax)*1000);

    that.timeoutArray[that.timeoutNum++] = setTimeout(function(){
      clearInterval(that.interArray[2]);
      that.interArray[that.interNum++] = setInterval(function(){
        that.v = 1;
        that.x += (that.v * t * Math.sin(that.angle))/proportion;
        that.y -= (that.v * t * Math.cos(that.angle))/proportion;
        that.setPos();
      },t*1000);
    },totalTime*1000);

    that.timeoutArray[that.timeoutNum++] = setTimeout(function(){
      clearInterval(that.interArray[3]);
    },totalTime*1000+10000);

  }
}