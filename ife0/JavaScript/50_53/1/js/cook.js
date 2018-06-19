// 厨师类   单例模式 只有一个厨师
var Cook = (function(){
  var instance = null;
  function createCook(name,salary){
    Staff.call(this,name,salary);
    // 厨师状态   false 空闲  true 正在做饭
    this.cookState = false; 
    this.cookMenu = [];   // 所有要做的菜按点菜顺序放在这里
    console.log("Cook " + this.name + " is created");
  };
  createCook.prototype = {
    constructor: createCook,
    // 做菜
    doAJob: function(){ 
      if(!cook.cookState){
        // 做菜时间间隔
        var time;    // 对号是做完了以后在更新   正在做 是立刻更新 
        var menu = cook.cookMenu;
        time = Number(getDishTime(menu[0].name));
        updateCookState(menu[0].name);
        updateCookLeftTime(Number(getDishTime(menu[0].name))); 
        initCookList();
        new Promise(function(resolve,reject){
          setTimeout(function(){
            resolve(menu[0]);
          },time*t);
        }).then(function(dish){
          updateMoney(-Number(getDishCost(dish.name)));
          cook.cookMenu.shift();
          cook.cookState = false;
          updateCookList();
          waiter.doAJob(dish.name,customers[dish.seatPos]);
        });
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
// 对未做的菜进行排序 使后面的菜中和前面菜相同的排到前面来一起做
function sortMenu(arr,j){
  var t = arr[j].name;
  for(var i=j+1;i<arr.length;i++){
    if(t == arr[i].name){
      var temp = arr[i];
      for(var k=i-1;k>j;k--){
        arr[k+1] = arr[k];
      }
      arr[j+1] = temp;
      j++;
    }
  }
  if(j<arr.length-1){
    j++;
    sortMenu(arr,j);
  }
}
// 获取做某一道菜需要的时间
function getDishTime(dishName){
  for(var i=0;i<dishList.length;i++){
    if(dishName == dishList[i].name)
      return dishList[i].time;
  }
}
// 获取做某一道菜需要的成本
function getDishCost(dishName){
  for(var i=0;i<dishList.length;i++){
    if(dishName == dishList[i].name)
      return dishList[i].cost;
  }
}
// 更新cook状态
function updateCookState(name){
  if(name != "空闲"){
    cook.cookState = true; 
    cookState.innerHTML = "正在做 " + name;
  }
  else{
    cook.cookState = false; 
    cookState.innerHTML = "空闲";
  }
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
// 更新厨师待做菜列表    做完一道菜就更新一下列表 然后让厨师做当前列表中的第一道菜
function updateCookList(){
  cookDishes.innerHTML = "";
  for(var i=0;i<cook.cookMenu.length;i++){
    var div = document.createElement("div");
    var span = document.createElement("span");
    span.innerHTML = cook.cookMenu[i].name + " " + (Number(cook.cookMenu[i].seatPos)+1) + "号座";
    var img = document.createElement("img");
    img.setAttribute("src","images/wait.png");
    div.appendChild(img);
    div.appendChild(span);
    cookDishes.appendChild(div);
  }
  if(cook.cookMenu.length>0){
    cook.doAJob();
  }else{
    updateCookState("空闲");
  }
}
// 初始化厨师待做菜列表  第一次
function initCookList(){
  cookDishes.innerHTML = "";
  for(var i=0;i<cook.cookMenu.length;i++){
    var div = document.createElement("div");
    var span = document.createElement("span");
    span.innerHTML = cook.cookMenu[i].name + " " + (Number(cook.cookMenu[i].seatPos)+1) + "号座";
    var img = document.createElement("img");
    img.setAttribute("src","images/wait.png");
    div.appendChild(img);
    div.appendChild(span);
    cookDishes.appendChild(div);
  }
}