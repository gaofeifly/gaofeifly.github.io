var table = document.getElementById("table-wrapper");
var region = document.getElementById("region");
var product = document.getElementById("product");
var container = document.getElementById("container");

// checkbox点击事件代理
container.onclick = function(event){
  var event = event || window.event;
  if(event.target.nodeName.toLowerCase() === "input"){
    changeCheckboxStatus(event.target);
    createTable(getData());
  }
}