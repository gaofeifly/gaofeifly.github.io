var dataList = [];      // 存放绘制svg和canvas的数据

// 获取某个地区某一品类产品的销售额
function getDataByRegionAndMonth(region,product){
  var list = [];
  for(var i=0;i<sourceData.length;i++){
    if(sourceData[i].region == region && sourceData[i].product == product)
      list = sourceData[i].sale;
  }
  return list;
}
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
    drawAllLineGraph(getData(),350,250);
    drawAllBarGraph(getData(),350,250);
  }
}
table.onmouseover = function(event){
  var event = event || window.event;
  if(event.target.nodeName.toLowerCase() === "td"){
    var tr = event.target.parentNode;
    var j = tr.childNodes.length - 1;
    // 鼠标在tr上方时改变tr背景颜色
    for(var i=12;i>0;i--){
      tr.childNodes[j].style.backgroundColor = "#99ccff";
      // 方式二  拿到响应事件对应的tr，然后依次遍历其中的td，获取其中的数据 
      dataList.push(Number(tr.childNodes[j].textContent));
      j--;
    }
    var region = tr.dataset.region;
    var product = tr.dataset.product;
    // 方式一    相应实现在table.js中
    // dataList = getDataByRegionAndMonth(region,product);
    // drawBarGraph(dataList,350,250);
    // drawLineGraph(dataList,350,250);

    // 方式二
    drawBarGraph(dataList,350,250);
    drawLineGraph(dataList,350,250);
    dataList = [];    //绘图结束后清空dataList
  }
}
// 鼠标移走后背景颜色消失
table.onmouseout = function(event){
  var event = event || window.event;
  if(event.target.nodeName.toLowerCase() === "td"){
    var tr = event.target.parentNode;
    var j = tr.childNodes.length - 1;
    for(var i=12;i>0;i--){
      tr.childNodes[j].style.backgroundColor = "";
      j--;
    }
  }
}