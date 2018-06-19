// 服务员类，继承自职员
var Waiter = function(name="ife-waiter",salary=1000){   
  Staff.call(this,name,salary);
  this.waiterPos = null;   // 1在座位1旁边  2在座位2旁边  3在座位3旁边  0在厨师旁边
  console.log("Waiter " + this.name + " is created");
  staffNum++;
  this.id = staffNum;
  this.waiterState = false;   // false闲着  true正在工作
  waiterImgs[waiters.length].style.opacity = 1;
  
};
Waiter.prototype = {
  // 记录客人点菜
  goToCustomerOrder: function(waiter,customer){
    if(customer.ordered)
      return;
    var dishes = customer.dishes;
    waiter.waiterState = true;
    waiter.waiterPos = customer.seatPos+1;
    updateWaiterPos(waiter);
    updateWaiterState(waiter);
    customer.ordered = true;
    customer.order(customer.dishes,customer);
    waiter.sendMenu(dishes,customer);
    new Promise(function(resolve,reject){
      setTimeout(function(){
        resolve();
      },1*t);
    }).then(function(){
      waiter.waiterPos = 0;
      updateWaiterPos(waiter);
      waiter.waiterState = false;
      updateWaiterState(waiter);
      checkOrderAndTakeFood();
    });
  },
  goToTakeDish: function(waiter,dish){
    var seatPos = dish.seatPos;
    var name = dish.name;
    var customer = null;
    for(var i=0;i<customers.length;i++){
      if(customers[i] != null && customers[i].seatPos == seatPos){
        customer = customers[i];
      }
    }
    if(customer == null)
      return;
    waiter.waiterPos = seatPos+1;
    updateWaiterPos(waiter);
    waiter.waiterState = true;
    updateWaiterState(waiter);
    new Promise(function(resolve,reject){
      setTimeout(function(){
        resolve();
      },1*t);
    }).then(function(){
      waiter.waiterPos = 0;
      updateWaiterPos(waiter);
      waiter.waiterState = false;
      updateWaiterState(waiter);
      checkOrderAndTakeFood();
      customer.eatDishes.push(dish.name);
      customer.eat(customer);
    });
  },
  sendMenu: function(dishes,customer){
    for(var i=0;i<dishes.length;i++){
      cookMenu.push({"name":dishes[i].name,"seatPos":customer.seatPos,"startCook":false,"endCook":false});
    }
    sortMenu(cookMenu,0);
    callCook();
    updateCookList();
  }
};
// 更新服务员的位置
function updateWaiterPos(waiter){
  var pos = Number(waiter.waiterPos);
  var index = null;
  for(var i=0;i<waiters.length;i++){
    if(waiters[i].id == waiter.id){
      index = i;
      break;
    }
  }
  if(index != null)
    var w = waiterImgs[index];
  if(pos == 0){ //厨师
    w.style.top = "120px";
    w.style.left = (350 + index*30) + "px";
  }else if(pos == 1){  // 座位1
    w.style.top = "100px";
    w.style.left = "650px";
  }else if(pos == 2){  // 座位2
    w.style.top = "300px";
    w.style.left = "650px";
  }else if(pos == 3){  // 座位3
    w.style.top = "500px";
    w.style.left = "650px";
  }
}
// 添加服务员和删除服务员 事件代理
waiterCon.onclick = function(event){
  var event = event || window.event;
  var target = event.target;
  // 删除服务员  只有在空闲状态下才能删除
  if(target.nodeName.toLowerCase() == "img"){
    for(var i=0;i<fireWaiterImgs.length;i++){
      if(fireWaiterImgs[i] == target){
        if(waiters[i].waiterState){
          alert("只有在空闲状态下才能删除");
          return;
        }
        ifeRestaurant.fire(waiters[i]);
        waiterImgs[i].style.opacity = 0;
        waiters.splice(i,1);
      }
    }
    waiterCon.removeChild(target.parentNode);
  }else if(target.nodeName.toLowerCase() == "input"){
    if(waiters.length == 5)
      return;
    var waiter = new Waiter("ife-waiter",1000)
    waiters.push(waiter);
    ifeRestaurant.hire(waiter);
    addAWaiter();
  }
}
// 渲染服务员列表
function addAWaiter(){ 
  var names = ["Tom","Elan","Jack","Pony","Robin"];
  waiterCon.removeChild(document.getElementById("add-waiter"));
  var str = `<div class="waiter-div">
              <span>服务员`+ names[Math.floor(Math.random()*5)] +`</span>
              <span class="waiter-pos-span">空闲</span>
              <img src="images/fire.png" title="开除">
            </div>`;
  $("#waiterCon").append(str);
  $("#waiterCon").append(`<input id="add-waiter" type="button" value="雇佣一个服务员">`); 
}
// 查找空闲服务员
function getFreeWaiter(){
  for(var i=0;i<waiters.length;i++){
    if(waiters[i].waiterState == false){
      return waiters[i];
    }
  }
  return null;
}
// 当有服务员空闲时查看是否有顾客需要点菜服务或者是否有做好的菜需要上
function checkOrderAndTakeFood(){
  for(var i=0;i<customers.length;i++){
    if(customers[i] != null && !customers[i].ordered){
      callWaiterOrder(customers[i]);
      // break;
    }
  }
  for(var i=0;i<cookMenu.length;i++){
    if(cookMenu[i].endCook){
      callWaiterTakeDish(cookMenu[i]);
      // break;
    }
  }
}
// 更新服务员的状态
function updateWaiterState(waiter){
  var waiterStates = document.getElementsByClassName("waiter-pos-span");
  var index = null;
  for(var i=0;i<waiters.length;i++){
    if(waiter.id == waiters[i].id){
      index = i;
      break;
    }
  }
  if(index != null){
    if(!waiter.waiterState)
      waiterStates[index].innerHTML = "空闲";
    else{
      switch(Number(waiter.waiterPos)){
        case 0:
          waiterStates[index].innerHTML = "厨师";
          break;
        case 1:
          waiterStates[index].innerHTML = "顾客1";
          break;
        case 2:
          waiterStates[index].innerHTML = "顾客2";
          break;
        case 3:
          waiterStates[index].innerHTML = "顾客3";
          break;
      }
    }
  }
}