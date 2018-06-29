var Ball = function(proportion,x,y,fieldLength,fieldWidth){
  this.proportion = proportion;
  this.stop = false;
  this.size = 2 / proportion;
  this.meterX = x;     
  this.meterY = y;
  this.v = 0;
  this.a = 0;
  this.x = x / proportion;      // 单位是像素
  this.y = y / proportion;
  var img = document.createElement("img");
  img.src = "ball.png";
  img.id = "ball";
  document.getElementsByClassName("field")[0].appendChild(img);
  img.style.left = this.x + "px";
  img.style.top = this.y + "px";
  img.style.width = img.style.height = this.size + "px";
  this.dom = img;
  this.angle = 0;

  // 参数为运动方向、初速度、加速度
  this.move = function(angle,v0,a){
    if(this.stop){
      this.angle = 0;
      return;
    }
    this.a = a;
    this.v = v0;
    var that = this;
    var inter = setInterval(function(){
      var t = 0.2;
      that.v += a * t;
      var s = (that.v * t + a * t * t / 2) / that.proportion;

      that.x += s * Math.sin(angle);
      that.y -= s * Math.cos(angle);
      that.angle = angle;

      if(that.x < 0)
        that.x = 0;
      if(that.y < 0)
        that.y = 0;
      if(that.x > fieldLength/that.proportion)
        that.x = fieldLength/that.proportion;
      if(that.y > fieldWidth/that.proportion)
        that.y = fieldWidth/that.proportion;

      that.meterX = that.x * that.proportion;
      that.meterY = that.y * that.proportion;

      that.dom.style.transition = "all " + 0.2 + "s linear";
      that.dom.style.left = that.x + "px";
      that.dom.style.top = that.y + "px";  
      setTimeout(function(){
        clearInterval(inter);
      },2000);
    },200);
  }
  // 设置足球的位置
  this.setBallPos = function(x,y){
    this.meterX = x;
    this.meterY = y;
    this.x = x / this.proportion;
    this.y = y / this.proportion;
    this.dom.style.left = this.x + "px";
    this.dom.style.top = this.y + "px";  
  }
}