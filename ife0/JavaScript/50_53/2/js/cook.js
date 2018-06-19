// 厨师类  
var Cook = function(name="ife-cook",salary="1000"){
  Staff.call(this,name,salary);
  // 厨师状态   false 空闲  true 正在做饭
  this.cookState = false; 
  this.pos = cooks.length;     // 厨师所在位置
  this.cookingDish = null;  // 厨师正在做的菜
  console.log("Cook " + this.name + " is created");
  staffNum++;
  this.id = staffNum;
};
Cook.prototype = {
  // 做菜
  doAJob: function(cook){ 
    if(!this.cookState){
      var time = 0;   
      var dish = null;
      for(var i=0;i<cookMenu.length;i++){
        if(!cookMenu[i].startCook){
          cookMenu[i].startCook = true;
          cook.cookingDish = cookMenu[i];
          dish = cookMenu[i];
          break;
        }
      }
      if(dish == null)
        return;
      time = Number(getDishTime(dish.name));
      cook.cookState = true;
      updateCookState(cook);
      updateCookLeftTime(cook); 
      new Promise(function(resolve,reject){
        setTimeout(function(){
          resolve(dish);
        },time*t);
      }).then(function(dish){
        updateMoney(-Number(getDishCost(dish.name)));
        // updateCookOkDish(dish.index);
        cook.cookState = false;
        updateCookState(cook);
        checkMenuDish();
        dish.endCook = true;
        updateCookList();
        callWaiterTakeDish(dish);
      });
    }
  }
};
// 有做好的菜后叫空闲服务员去上菜
function callWaiterTakeDish(dish){
  var waiter = getFreeWaiter();
  if(waiter != null){
    waiter.goToTakeDish(waiter,dish);
  }
}
// 更新当前所做菜的剩余时间
function updateCookLeftTime(cook){
  var cookLeftTime = document.getElementsByClassName("cook-left-time");
  var time = Number(getDishTime(cook.cookingDish.name))*t;
  cookLeftTime[cook.pos].innerHTML = "还有 " + time/1000 + " 秒钟做完";
  var inter = setInterval(function(){
    if(time > 0){
      time -= 1000;
      cookLeftTime[cook.pos].innerHTML = "还有 " + time/1000 + " 秒钟做完";
    }
    else{
      clearInterval(inter);
    }
  },1000);  
}

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
function updateCookState(cook){
  // console.log("cook.pos: "+cook.pos);
  var cookState = document.getElementsByClassName("cook-state");
  if(cook.cookState){
    cookState[cook.pos].innerHTML = "正在做 " + cook.cookingDish.name;
  }
  else{
    cookState[cook.pos].innerHTML = "空闲";
  }
}

// 更新厨师待做菜列表  
function updateCookList(){
  cookDishes.innerHTML = "";
  for(var i=0;i<cookMenu.length;i++){
    var div = document.createElement("div");
    var span = document.createElement("span");
    span.innerHTML = cookMenu[i].name + " " + (Number(cookMenu[i].seatPos)+1) + "号座";
    var img = document.createElement("img");
    img.setAttribute("src","images/"+(cookMenu[i].endCook?"ok":"wait")+".png");
    div.appendChild(img);
    div.appendChild(span);
    cookDishes.appendChild(div);
  }
  for(var i=0;i<cookMenu.length;i++){
    if(cookMenu[i].endCook){
      cookMenu.splice(i,1);
      i--;
    }
  }
}
// 增加和删除厨师事件代理  只有当厨师为空闲状态时才能删掉
$("#cook").click(function(event){
  var event = event || window.event;
  var target = event.target;
  if(target.nodeName.toLowerCase() == "img"){
    for(var i=0;i<fireCookImgs.length;i++){
      if(fireCookImgs[i] == target){
        if(cooks[i].cookState){
          alert("只有当厨师为空闲状态时才能删掉");
          return;
        }
        ifeRestaurant.fire(cooks[i]);
        cooks.splice(i,1);
        co.removeChild(target.parentNode);
      }
    }
  }else if(target.nodeName.toLowerCase() == "input"){
    if(cooks.length == 5)
      return;
    var cook = new Cook();
    cooks.push(cook);
    ifeRestaurant.hire(cook);
    addACook();
  }
});
// 渲染服务员列表
function addACook(){ 
  var names = ["李师傅","王师傅","张师傅","孙师傅","梁师傅"];
  co.removeChild(document.getElementById("add-cook"));
  var str = `<div class="cookCon">
              <span>`+ names[Math.floor(Math.random()*5)] +`</span>
              <span class="cook-state">空闲</span>
              <span class="cook-left-time"></span>
              <img src="images/fire.png" title="开除">
            </div>`;
  $("#cook").append(str);
  $("#cook").append(`<input id="add-cook" type="button" value="雇佣一个厨师">`); 
}
// 查找空闲厨师
function getFreeCook(){
  for(var i=0;i<cooks.length;i++){
    if(cooks[i].cookState == false){
      return cooks[i];
    }
  }
  return null;
}
// 当待做菜单中有新的菜加入时叫厨师做菜
function callCook(){
  var cook = getFreeCook();
  if(cook != null){
    cook.doAJob(cook);
  }
}
// 当有厨师状态变为空闲时检查待做菜单中是否还有菜没做
function checkMenuDish(){
  for(var i=0;i<cookMenu.length;i++){
    if(!cookMenu[i].startCook){
      callCook();
    }
  }
}