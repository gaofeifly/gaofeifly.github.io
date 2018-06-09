
// ES6

// 餐厅类
class Restaurant {
  constructor(res){
    this.money = res.money;
    this.seatNum = res.seatNum;
    this.staff = res.staff;
  }
  hire(staff){
    this.staff.push(staff);
  }
  fire(staff){
    for(var i=0;i<this.staff.length;i++){
      if(this.staff[i] == staff)
        this.staff.splice(i,1);
    }
  }
}

// 职员类
class Staff {
  constructor(name,salary){
    this.id = 0;
    this.name = name;
    this.salary = salary;
  }
  doAJob(){

  }
}

// 服务员类，继承自职员
class Waiter extends Staff {
  constructor(job){
    super();
    this.job = job;
  }
  doAJob(){
    if(this.job instanceof Array)
      console.log("记录点菜");
    else
      console.log("上菜");
  }
}

// 厨师类，继承自职员
class Cook extends Staff {
  constructor(){
    super();
  }
  doAJob(){
    console.log("烹饪出菜品");
  }
}

// 顾客类
class Customer {
  constructor(){

  }
  order(){
    console.log("点菜");
  }
  eat(){
    console.log("吃");
  }
}

// 菜品类
class Dishes {
  constructor(name,cost,price){
    this.name = name;
    this.cost = cost;
    this.price = price;
  }
}

