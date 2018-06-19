var w = document.getElementById("waiter");
var co = document.getElementById("cook");
var cusOne = document.getElementById("customer-one");
var cusTwo = document.getElementById("customer-two");
var cusThree = document.getElementById("customer-three");
var animates = document.getElementsByClassName("animate");

var money = document.getElementsByClassName("money")[0]
var cookState = document.getElementsByClassName("cook-state")[0];
var cookLeftTime = document.getElementsByClassName("cook-left-time")[0];
var cookDishes = document.getElementsByClassName("cook-dishes")[0];
var customerDishes = document.getElementsByClassName("customer-dishes");
var customerStates = document.getElementsByClassName("customer-state");
var cusWait = document.getElementById("cus-wait");

// ok and wait imgs
var dishStateImgs = cookDishes.getElementsByTagName("img");

var customerNumAll = 0;

var t = 1000;    // 时间单位 1000ms

var ifeRestaurant = new Restaurant({
    money: 1000000,
    seatNum: 20,
    staff: []
});

var customerQueue = [];    // 排队顾客

var waiter = Waiter.getInstance("ife-waiter","300000");
ifeRestaurant.hire(waiter);
var cook = Cook.getInstance("ife-cook","666");
ifeRestaurant.hire(cook);
console.log(ifeRestaurant.staff);

var customers = [];    
customers.push(new Customer());
customers.push(new Customer());
customers.push(new Customer());

var unOrderNum = customers.length;

// 菜单
var dishList = [];
dishList.push(new Dishes("鱼香肉丝",100,200,4));
dishList.push(new Dishes("宫保鸡丁",200,250,4));
dishList.push(new Dishes("西红柿炒鸡蛋",66,100,3));
dishList.push(new Dishes("醋溜白菜",50,100,5));
dishList.push(new Dishes("爆炒茄子",60,160,5));
dishList.push(new Dishes("红烧肉",150,300,6));



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


comeCustomers(customers);
createCustomers(20,3);

