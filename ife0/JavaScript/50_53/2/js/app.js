
var waiterImgs = document.getElementsByClassName("waiter-img");
var co = document.getElementById("cook");
var cusOne = document.getElementById("customer-one");
var cusTwo = document.getElementById("customer-two");
var cusThree = document.getElementById("customer-three");
var animates = document.getElementsByClassName("animate");

var money = document.getElementsByClassName("money")[0];


var cookDishes = document.getElementsByClassName("cook-dishes")[0];
var customerDishes = document.getElementsByClassName("customer-dishes");
var customerStates = document.getElementsByClassName("customer-state");
var cusWait = document.getElementById("cus-wait");

var addWaiterBut = document.getElementById("add-waiter");
var addCookBut = document.getElementById("add-cook");
var waiterCon = document.getElementById("waiterCon");
var fireWaiterImgs = waiterCon.getElementsByTagName("img");
var fireCookImgs = co.getElementsByTagName("img");

// ok and wait imgs
var dishStateImgs = cookDishes.getElementsByTagName("img");

var customerNumAll = 0;   //累计顾客总数 包含排队顾客
var staffNum = 0;   // 累计员工总数 包含已开除员工

var t = 1000;    // 时间单位 1000ms

var ifeRestaurant = new Restaurant({
    money: 1000000,
    seatNum: 20,
    staff: []
});

var customerQueue = [];    // 排队顾客

var cookMenu = [];        // 所有要做的菜

var waiters = [];     // 当前餐厅的服务员
var cooks = [];     // 当前餐厅的厨师

var waiter = new Waiter();
waiters.push(waiter);
addAWaiter();
ifeRestaurant.hire(waiter);
var cook = new Cook();
cooks.push(cook);
addACook();
ifeRestaurant.hire(cook);


var customers = [];   // 当前正在就餐的顾客   
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
createCustomers(20,5);

