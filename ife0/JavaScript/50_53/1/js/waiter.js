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
    doAJob: function(dishes,customer){
      if(dishes instanceof Array){
        this.waiterPos = 1;
        waiter.callCook(dishes,customer);
        updateWaiterPos(this.waiterPos);
        if(unOrderNum > 0){
          setTimeout(function(){
            waiter.goToCustomerOrder();
          },1*t);
        }
      }
      else{
        this.waiterPos = 1;
        updateWaiterPos(this.waiterPos);
        customer.eat(dishes,customer);
        if(customer.dishNum > 1){
          setTimeout(function(){
            waiter.waitToTakeFood();
          },0.5*t);
        }
      }
    },
    startOrder: function(customer){
      this.waiterPos = 1;
      updateWaiterPos(this.waiterPos);
      customer.ordered = true;
    },
    callCook: function(dishes,customer){
      this.waiterPos = 0;
      updateWaiterPos(this.waiterPos);
      for(var i=0;i<dishes.length;i++){
        cook.cookMenu.push({"name":dishes[i].name,"seatPos":customer.seatPos});
      }
      sortMenu(cook.cookMenu,0);
    },
    waitToTakeFood: function(){
      this.waiterPos = 0;
      updateWaiterPos(this.waiterPos);
    },
    goToCustomerOrder: function(){
      for(var i=0;i<customers.length;i++){
        if(customers[i] != null && !customers[i].ordered){
          waiter.startOrder(customers[i]);
          customers[i].order(customers[i].dishes,customers[i]);
          updateCookList();
          break;
        }
      }
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
  if(pos == 0){ //厨师
    w.style.top = "100px";
    w.style.left = "350px";
  }else if(pos == 1){  // 座位
    w.style.top = "100px";
    w.style.left = "650px";
  }
}
