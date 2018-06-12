// 厨师类   单例模式 只有一个厨师
var Cook = (function(){
  var instance = null;
  function createCook(name,salary){
    Staff.call(this,name,salary);
    // 厨师状态   false 空闲  true 正在做饭
    this.cookState = false; 
    console.log("Cook " + this.name + " is created");
  };
  createCook.prototype = {
    constructor: createCook,
    // 做菜
    doAJob: function(dishes){ 
      this.cookState = true; 
      // 显示要做的菜列表在某一区域 
      var dishesDisplay = dishes;
      // 已经做的菜的数量
      var dishOkNum = 0; 
      // 做菜时间间隔
      var time1 = 0;    // 对号是做完了以后在更新
      var time2 = 0;    // 正在做 是立刻更新 
      for(var i=0;i<dishes.length;i++){
        time1 += Number(dishes[i].time);
        new Promise(function(resolve,reject){
          var j = i;
          var dish = dishes[j];
          setTimeout(function(){
            resolve(dish);
          },time1*t);
        }).then(function(dish){
          dishOkNum++;
          updateCookDishList(dishOkNum);
          updateMoney(-Number(dish.cost));
          waiter.doAJob(dish.name);
        });

        new Promise(function(resolve,reject){
          var j = i;
          var dish = dishes[j];
          setTimeout(function(){
            resolve(dish);
          },time2*t);
        }).then(function(dish){
          updateCookState(dish.name);
          updateCookLeftTime(dish.time);
        });
        time2 += Number(dishes[i].time);
      }
    }
  };
  return {
    getInstance: function(name,salary){
      if(instance === null)
        instance = new createCook(name,salary);
      return instance;
    }
  };
})();
// 更新cook状态
function updateCookState(name){
  if(name != "空闲")
    cookState.innerHTML = "正在做 " + name;
  else
    cookState.innerHTML = "空闲";
}
// 更新厨师做菜列表中菜的状态
function updateCookDishList(num){
  for(var i=0;i<num;i++){
    dishStateImgs[i].setAttribute("src","images/ok.png");
  }
}
// 更新当前所做菜的剩余时间
function updateCookLeftTime(dishtime){
  var time = dishtime*t;
  cookLeftTime.innerHTML = "还有 " + time/1000 + " 秒钟做完";
  var inter = setInterval(function(){
    if(time > 0){
      time -= 1000;
      cookLeftTime.innerHTML = "还有 " + time/1000 + " 秒钟做完";
    }
    else{
      clearInterval(inter);
    }
  },1000);  
}