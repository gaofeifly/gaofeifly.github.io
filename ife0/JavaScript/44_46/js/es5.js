
// ES5

// 餐厅类
function Restaurant(res){
  this.money = res.money;
  this.seatNum = res.seatNum;
  this.staff = res.staff;
}
// 方法：招聘职员，解雇职员
Restaurant.prototype.hire = function(staff){
  this.staff.push(staff);
}
Restaurant.prototype.fire = function(staff){
  for(var i=0;i<this.staff.length;i++){
    if(this.staff[i].name == staff.name){
      // splice() 方法会直接对数组进行修改  slice不会修改原数组
      // splice(start,num)   slice(start,end)
      this.staff.splice(i,1);
    }
  }
}


// 职员类
function Staff(name,salary){
  // 属性：ID，姓名，工资
  this.id = 0;
  this.name = name || "";
  this.salary = salary || "100";
}
// 方法：完成一次工作
Staff.prototype.doAJob = function(){

}


// 服务员类，继承自职员
var Waiter = (function(){
  var instance = null;
  function createWaiter(name,salary){
    Staff.call(this,name,salary);
    console.log("Waiter " + this.name + " is created");
  };
  createWaiter.prototype = {
    constructor: createWaiter,
    // 完成一次工作：如果参数是个数组，则记录客人点菜，如果参数不是数组则是上菜行为
    doAJob: function(dishes){
      if(dishes instanceof Array){
        console.log("Waiter记录点菜 " + dishes);
        Waiter.getInstance().callCook(dishes);
      }
      else
        console.log("服务员上菜");
    },
    startOrder: function(){
      console.log("开始点菜");
    },
    callCook: function(dishes){
      console.log("告诉Cook做 " + dishes);
      Cook.getInstance().doAJob(dishes);
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

// 厨师类
var Cook = (function(){
  var instance = null;
  function createCook(name,salary){
    Staff.call(this,name,salary);
    console.log("Cook " + this.name + " is created");
  };
  createCook.prototype = {
    constructor: createCook,
    doAJob: function(dishes){
      console.log("烹饪出菜品 " + dishes);
      Waiter.getInstance().doAJob();
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


// 顾客类
function Customer(){
  console.log("来了一个顾客");
}
// 方法：点菜，吃
Customer.prototype.order = function(dish){
  console.log("顾客点菜 " + dish);
  var dishes = [];
  dishes.push(dish);
  Waiter.getInstance().doAJob(dishes);
}
Customer.prototype.eat = function(){
  console.log("顾客吃起来了");
  console.log("顾客吃完了离开");
}
// 告诉服务员来顾客了 服务员服务点菜
Customer.prototype.callWaiter = function(){
  Waiter.getInstance().startOrder();
}

// 菜品类
function Dishes(name,cost,price){
  // 属性：名字、烹饪成本、价格
  this.name = name;
  this.cost = cost;
  this.price = price;
}