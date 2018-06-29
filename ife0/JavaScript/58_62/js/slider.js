var slider = function(foo){
  // 传入一个具有id的父容器
  if(foo != "")
    this.foo = foo;
  else{
    alert("没有父容器");
    return;
  }

  this.foo.innerHTML = `<div class="con">
    <div class="bar"></div>
    <div class="bar-v"></div>
    <div class="but"></div>
    <input type="text" class="text">
  </div>`;

  this.mousedown = false;
  this.maxNum = 100;

  var that = this;

  this.foo.addEventListener("mousedown",function(event){
    event.preventDefault();

    var event = event || window.event;
    var target = event.target;
    // 鼠标相对于div容器左上角的位置
    var x = event.offsetX;
    if(target.className == "bar" || target.className == "bar-v"){
      if(x < 10)
        x = 10;
      if(x > 210)
        x = 210;
      target.parentNode.getElementsByClassName("but")[0].style.left = x + "px";
      target.parentNode.getElementsByClassName("bar-v")[0].style.width = (x - 10) + "px";
      var val = Math.round((x - 10)/200 * that.maxNum);
      target.parentNode.getElementsByClassName("text")[0].value = val;
    }else if(target.className == "but"){
      this.mousedown = true;
    }
  });

  this.foo.addEventListener("mousemove",function(event){
    if(this.mousedown){
      var event = event || window.event;
      var target = event.target;
      var offsetLeft = $("#"+that.foo.id).offset().left;
      // 相对于浏览器左上角
      var x = event.clientX;
      if(x < 10 + offsetLeft)
        x = 10 + offsetLeft;
      if(x > 210 + offsetLeft)
        x = 210 + offsetLeft;
      var val = Math.round((x - offsetLeft - 10)/200 * that.maxNum);
      target.parentNode.getElementsByClassName("text")[0].value = val;
      target.parentNode.getElementsByClassName("but")[0].style.left = (x - offsetLeft) + "px";
      target.parentNode.getElementsByClassName("bar-v")[0].style.width = (x - offsetLeft - 10) + "px";
    }
  });

  this.foo.addEventListener("mouseup",function(event){
    this.mousedown = false;
  });

  this.foo.addEventListener("mouseleave",function(event){
    if(event.target == that.foo)
      this.mousedown = false;
  });
}
