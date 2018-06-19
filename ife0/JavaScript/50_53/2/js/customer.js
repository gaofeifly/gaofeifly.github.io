
// 顾客类

function Customer(){
  this.seatPos = null;
  this.ordered = false;
  this.eatDishes = [];
  this.eating = false;
}
// 方法：点菜
Customer.prototype.order = function(dishes,customer){
  updateCusDishList(customer);
  unOrderNum--;
  customerStates[customer.seatPos].innerHTML = "等待上菜";
}
Customer.prototype.eat = function(customer){
  if(this.eating)
    return;
  if(this.eatDishes.length>0){
    var dish = this.eatDishes[0];
    updateCusDish(dish,customer);
    customerStates[customer.seatPos].innerHTML = "正在吃" + dish;
    customer.eating = true;
  }
}
// 顾客吃完了某道菜
Customer.prototype.isFinishEat = function(customer){
  customer.dishNum--;
  if(customer.dishNum == 0){
    customerStates[customer.seatPos].innerHTML = "顾客全部吃完了";
    customer.pay(customer);
  }
}
// 顾客付款
Customer.prototype.pay = function(customer){
  var payMoney = 0;
  for(var i=0;i<customer.dishes.length;i++){
    payMoney += customer.dishes[i].price;
  }
  updateMoney(Number(payMoney));
  updateWaiterPos(0);
  setTimeout(function(){
    customerStates[customer.seatPos].innerHTML = "顾客支付了" + payMoney + "元后走人";
    customers[customer.seatPos] = null;
    if(customerQueue.length > 0){
      comeACustomer(customerQueue[0]);
      updateCustomerWaitList();
    }
    if(isAllOK()){
      allCustomerOK();
    }
  },1000);
}
// 入座一位顾客
function comeACustomer(customer){
  var flag = false;
  for(var i=0;i<customers.length;i++){
    if(customers[i] == null){
      customerQueue.shift();
      customers[i] = customer;
      flag = true;
      customer.seatPos = i;
      customer.dishes = createDishes();
      customer.dishNum = customer.dishes.length;
      customer.ordered = false;
      unOrderNum++;
      updateCusState(customer);
      animates[customer.seatPos].style.display = "block";
      break;
    }
  }
  if(!flag)
    return;
  new Promise(function(resolve,reject){
    setTimeout(function(){
      resolve(customer);
    },3*t);
  }).then(function(customer){
    customerStates[customer.seatPos].innerHTML = "等待点菜";
    animates[customer.seatPos].style.display = "none";
    callWaiterOrder(customer);
  });
}

// 来了几个顾客  3
function comeCustomers(customers){
  customerNumAll += 3;
  for(var i=0;i<customers.length;i++){
    customers[i].seatPos = i;
    updateCusState(customers[i]);
    animates[i].style.display = "block";
  }
  for(var i=0;i<customers.length;i++){
    customers[i].dishes = createDishes();
    customers[i].dishNum = customers[i].dishes.length;
    (function(i){
      new Promise(function(resolve,reject){
        setTimeout(function(){
          resolve(customers[i]);
        },3*t);
      }).then(function(customer){
        customerStates[customer.seatPos].innerHTML = "等待点菜";
        animates[i].style.display = "none";

        callWaiterOrder(customers[i]);
      });
    })(i)
  }
}
// 有顾客想好要点的菜后叫空闲服务员来点菜
function callWaiterOrder(customer){
  var waiter = getFreeWaiter();
  if(waiter != null){
    waiter.goToCustomerOrder(waiter,customer);
  }
}
// 更新顾客排队列表
function updateCustomerWaitList(){
  cusWait.innerHTML = "<span>排队顾客</span>";
  if(customerQueue.length > 10){
    customerNumAll -= (customerQueue.length-10);
    customerQueue.splice(10,customerQueue.length-10);
  }
  var num = customerQueue.length;
  for(var i=0;i<customerQueue.length;i++){
    var span = document.createElement("span");
    span.innerHTML = "customer-wait-" + (customerNumAll-num+i+1);
    cusWait.appendChild(span);
  }
}
// 每n个时间单位生成m个顾客
function createCustomers(n,m){
  setInterval(function(){
    for(var i=0;i<m;i++){
      customerQueue.push(new Customer());
    }
    customerNumAll += m;
    var tempNum = customerQueue.length;
    for(var i=0;i<tempNum;i++){
      comeACustomer(customerQueue[0]);
    }
    updateCustomerWaitList();
    addWaitAnimation(m);
  },n*t);
}
// 生成点菜菜单
function createDishes(){
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
  return dishes;
}
// 更新顾客点菜状态
function updateCusState(customer){
  var time = 3*t;
  customerStates[customer.seatPos].innerHTML = "思考点菜中,还有 " + time/1000 + " 秒钟思考完";
  var inter = setInterval(function(){
    if(time > 1000){
      time -= 1000;
      customerStates[customer.seatPos].innerHTML = "思考点菜中,还有 " + time/1000 + " 秒钟思考完";
    }
    else{
      clearInterval(inter);
    }
  },1000);  
}
// 更新顾客点菜菜单列表
function updateCusDishList(customer){
  customerDishes[customer.seatPos].innerHTML = "";
  for(var i=0;i<customer.dishes.length;i++){
    var span = document.createElement("span");
    var div = document.createElement("div");
    var img = document.createElement("img");
    img.setAttribute("src","images/wait.png");
    span.innerHTML = customer.dishes[i].name;
    div.appendChild(span);
    div.appendChild(img);
    customerDishes[customer.seatPos].appendChild(div);
  }
}
// 更新顾客菜品食用状态
function updateCusDish(dishName,customer){
  var div = null;
  var cusDishDivs = customerDishes[customer.seatPos].getElementsByTagName("div");
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

        customer.eating = false;
        customer.eatDishes.shift();
        checkEatDish(customer);


        clearInterval(inter);
        customer.isFinishEat(customer);    // 检查是否全部吃完
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
// 判断所有座位上都没有人了
function isAllOK(){
  for(var i=0;i<customers.length;i++){
    if(customers[i] != null)
      return false;
  }
  return true;
}
// 新来了顾客排队动画
function addWaitAnimation(m){
  var span = document.createElement("span");
  span.innerHTML = "来了 " + m +" 个顾客排队";
  span.className = "add-wait animated ";
  document.body.appendChild(span);
  setTimeout(function(){
    document.body.removeChild(span);
  },2000);
}
// 查看是否有饭没吃
function checkEatDish(customer){
  if(customer.eatDishes.length > 0){
    customer.eat(customer);
  }
}
