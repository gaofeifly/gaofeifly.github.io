
// 顾客类

function Customer(){
  
}
// 方法：点菜，吃
Customer.prototype.order = function(dishes){
  customer.dishes = dishes;
  customer.dishNum = dishes.length;
  updateCusDishList();
  waiter.doAJob(dishes);
}
Customer.prototype.eat = function(dish){
  // 认为有没吃完的菜时又上来新菜则两个菜同时吃
  updateCusDishOk(dish);
  cusStateSpan.innerHTML = "正在吃" + dish;
}
// 告诉服务员来顾客了 服务员服务点菜
Customer.prototype.callWaiter = function(){
  waiter.startOrder();
}
// 顾客吃完了某道菜
Customer.prototype.isFinishEat = function(name){
  customer.dishNum--;
  if(customer.dishNum == 0){
    cusStateSpan.innerHTML = "顾客全部吃完了";
    customer.pay();
  }
}
// 顾客付款
Customer.prototype.pay = function(){
  var payMoney = 0;
  for(var i=0;i<customer.dishes.length;i++){
    payMoney += customer.dishes[i].price;
  }
  updateMoney(Number(payMoney));
  updateWaiterPos(0);
  setTimeout(function(){
    cusStateSpan.innerHTML = "顾客支付了" + payMoney + "元后走人";
  },1000); 
  if(CustomerQueue.length > 0){
    setTimeout(function(){
      comeACustomer();
    },2000);
  }else{
    allCustomerOK();
  }
}
// 启用一个顾客
function comeACustomer(){
  customer = CustomerQueue[0];  // 排在最前的顾客最先用餐
  CustomerQueue.shift();
  updateCusQueue();
  updateCookState("空闲");

  var dishes = [];
  var dishNum = Math.ceil(Math.random()*6);  // 1~6 点菜数量
  var index = [];
  for(var i=0;i<dishNum;i++){     // 0~5 点菜下标  不能重复
    var r =Math.floor(Math.random()*6);
    if(index.indexOf(r) > -1)
      continue;
    index.push(r);
  }
  for(var i=0;i<index.length;i++)
    dishes.push(dishList[index[i]]);

  customer.callWaiter();
  updateCusState();
  animationOne.style.display = "block";
  new Promise(function(resolve,reject){
    setTimeout(function(){
      resolve();
    },3*t);
  }).then(function(){
    customer.order(dishes);
    cusStateSpan.innerHTML = "等待上菜";
    animationOne.style.display = "none";
  });
}
// 更新顾客点菜状态
function updateCusState(){
  var time = 3*t;
  cusStateSpan.innerHTML = "点菜中,还有 " + time/1000 + " 秒钟点完";
  var inter = setInterval(function(){
    if(time > 1000){
      time -= 1000;
      cusStateSpan.innerHTML = "点菜中,还有 " + time/1000 + " 秒钟点完";
    }
    else{
      clearInterval(inter);
    }
  },1000);  
}
// 更新顾客排队列表显示
function updateCusQueue(){
  customerList.innerHTML = "排队顾客";
  for(var i=0;i<CustomerQueue.length;i++){
    var span = document.createElement("span");
    span.innerHTML = CustomerQueue[i].name;
    customerList.appendChild(span);
  }
}
// 更新顾客点菜菜单列表
function updateCusDishList(){
  customerDishes.innerHTML = "";
  for(var i=0;i<customer.dishes.length;i++){
    var span = document.createElement("span");
    var div = document.createElement("div");
    var img = document.createElement("img");
    img.setAttribute("src","images/wait.png");
    span.innerHTML = customer.dishes[i].name;
    div.appendChild(span);
    div.appendChild(img);
    customerDishes.appendChild(div);
  }
}
// 更新顾客菜品食用状态
function updateCusDishOk(dishName){
  var div = null;
  for(var i=0;i<customer.dishes.length;i++){
    if(customer.dishes[i].name == dishName){
      div = cusDishDivs[i];
      break;
    }
  }
  if(div != null){
    // 将wait图片更改为倒计时
    var time = 3*t;
    div.getElementsByTagName("span")[0].innerHTML = dishName + "  还剩 " + time/1000 + " 秒";
    div.getElementsByTagName("img")[0].style.opacity = 0;
    
    var inter = setInterval(function(){
      if(time > 1000){
        time -= 1000;
        div.getElementsByTagName("span")[0].innerHTML = dishName + "  还剩 " + time/1000 + " 秒";
      }else{
        // 将倒计时替换为ok图片
        div.getElementsByTagName("span")[0].innerHTML = dishName;
        div.getElementsByTagName("img")[0].style.opacity = 1;
        div.getElementsByTagName("img")[0].setAttribute("src","images/ok.png");
        clearInterval(inter);
        customer.isFinishEat();    // 检查是否全部吃完
      }
    },1000);
  }
}
// 所有顾客都吃完了动画
function allCustomerOK(){
  var span = document.createElement("span");
  span.innerHTML = "所有顾客都吃完了!";
  span.className = "animated tada all-ok";
  document.body.appendChild(span);
  setTimeout(function(){
    document.body.removeChild(span);
  },2000);
}





