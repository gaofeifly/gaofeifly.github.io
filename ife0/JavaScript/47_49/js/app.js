var w = document.getElementById("waiter");
var co = document.getElementById("cook");
var cu = document.getElementById("customer");
var animationOne = document.getElementById("animate-one");

var money = document.getElementsByClassName("money")[0]
var cookState = document.getElementsByClassName("cook-state")[0];
var cookLeftTime = document.getElementsByClassName("cook-left-time")[0];
var cookDishes = document.getElementsByClassName("cook-dishes")[0];
var customerList = document.getElementsByClassName("customer-list")[0];
var customerDishes = document.getElementsByClassName("customer-dishes")[0];
var customerState = document.getElementsByClassName("customer-state")[0];

// ok and wait imgs
var dishStateImgs = cookDishes.getElementsByTagName("img");

var cusStateSpan = document.createElement("span");
customerState.appendChild(cusStateSpan);
var cusDishDivs = customerDishes.getElementsByTagName("div");


var t = 2000;    // 时间单位 1000ms

var ifeRestaurant = new Restaurant({
    money: 1000000,
    seatNum: 20,
    staff: []
});

var waiter = Waiter.getInstance("ife-waiter","300000");
ifeRestaurant.hire(waiter);
var cook = Cook.getInstance("ife-cook","666");
ifeRestaurant.hire(cook);
console.log(ifeRestaurant.staff);

var customer = null;      // 当前正在用餐的顾客
var CustomerQueue = [];     // 数组头表示队头
for(var i=0;i<6;i++){
  var customer1 = new Customer();
  customer1.name = "customer" + (i+1);
  CustomerQueue.push(customer1);
}

// 菜单
var dishList = [];
dishList.push(new Dishes("鱼香肉丝",100,200,4));
dishList.push(new Dishes("宫保鸡丁",200,250,4));
dishList.push(new Dishes("西红柿炒鸡蛋",66,100,3));
dishList.push(new Dishes("醋溜白菜",50,100,5));
dishList.push(new Dishes("爆炒茄子",60,160,5));
dishList.push(new Dishes("红烧肉",150,300,6));

comeACustomer();

// 更新饭店的money
function updateMoney(deltamoney){
  ifeRestaurant.money = Number(ifeRestaurant.money) + deltamoney;
  money.innerHTML = ifeRestaurant.money;
  
  var span = document.createElement("span");
  if(deltamoney > 0)
    span.innerHTML = "+" + deltamoney;
  else
    span.innerHTML = deltamoney;
  span.className = "animated fadeOutUp money-up";
  document.body.appendChild(span);
  setTimeout(function(){
    document.body.removeChild(span);
  },1000);
}



