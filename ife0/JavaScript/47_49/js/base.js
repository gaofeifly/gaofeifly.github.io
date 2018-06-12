
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

// 菜品类
function Dishes(name,cost,price,time){
  // 属性：名字、烹饪成本、价格
  this.name = name;
  this.cost = cost;
  this.price = price;
  this.time = time;
}

