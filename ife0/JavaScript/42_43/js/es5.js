
// ES5

// 餐厅类
// function Restaurant(money,seatNum,staff){
//   // 属性：金钱，座位数量、职员列表
//   this.money = money;
//   this.seatNum = seatNum;
//   this.staff = staff;
// }
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
  this.name = name;
  this.salary = salary;
}
// 方法：完成一次工作
Staff.prototype.doAJob = function(){

}


// 服务员类，继承自职员
function Waiter(id=0,name,salary,job){
  this.job = job;
  Staff.call(this,id,name,salary);
}
// 完成一次工作：如果参数是个数组，则记录客人点菜，如果参数不是数组则是上菜行为
Waiter.prototype.doAJob = function(){
  if(this.job instanceof Array)
    console.log("记录点菜");
  else
    console.log("上菜");
}


// 厨师类，继承自职员
function Cook(id=0,name,salary){
  Staff.call(this,id,name,salary);
}
// 完成一次工作：烹饪出菜品
Cook.prototype.doAJob = function(){
  console.log("烹饪出菜品");
}


// 顾客类
function Customer(){
  
}
// 方法：点菜，吃
Customer.prototype.order = function(){
  console.log("点菜");
}
Customer.prototype.eat = function(){
  console.log("吃");
}


// 菜品类
function Dishes(name,cost,price){
  // 属性：名字、烹饪成本、价格
  this.name = name;
  this.cost = cost;
  this.price = price;
}