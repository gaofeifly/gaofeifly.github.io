// 服务员类，继承自职员
var Waiter = (function(){
  var instance = null;
  function createWaiter(name,salary){
    Staff.call(this,name,salary);
    this.waiterPos = null;   // 0在顾客旁边   1在厨师旁边
    console.log("Waiter " + this.name + " is created");
  };
  createWaiter.prototype = {
    constructor: createWaiter,
    // 完成一次工作：如果参数是个数组，则记录客人点菜，如果参数不是数组则是上菜行为
    doAJob: function(dishes){
      if(dishes instanceof Array){
        this.waiterPos = 0;
        waiter.callCook(dishes);
        updateWaiterPos(this.waiterPos);
      }
      else{
        this.waiterPos = 0;
        updateWaiterPos(this.waiterPos);
        customer.eat(dishes);
        if(customer.dishNum > 1){
          setTimeout(function(){
            waiter.waitToTakeFood();
          },0.5*t);
        }
      }
    },
    startOrder: function(customer){
      this.waiterPos = 0;
      updateWaiterPos(this.waiterPos);
    },
    callCook: function(dishes){
      this.waiterPos = 1;
      updateWaiterPos(this.waiterPos);
      cookDishes.innerHTML = "";
      for(var i=0;i<dishes.length;i++){
        var div = document.createElement("div");
        var span = document.createElement("span");
        span.innerHTML = dishes[i].name;
        var img = document.createElement("img");
        img.setAttribute("src","images/wait.png");
        div.appendChild(img);
        div.appendChild(span);
        cookDishes.appendChild(div);
      }
      cook.doAJob(dishes);
    },
    waitToTakeFood: function(){
      this.waiterPos = 1;
      updateWaiterPos(this.waiterPos);
    }
  };
  return {
    getInstance: function(name,salary){
      if(instance === null)
        instance = new createWaiter(name,salary);
      return instance;
    }
  };
})();
// 更新服务员的位置
function updateWaiterPos(pos){
  if(pos == 1){ //厨师
    w.style.top = "100px";
    w.style.left = "300px";
  }else{  //顾客
    w.style.top = "350px";
    w.style.left = "650px";
  }
}