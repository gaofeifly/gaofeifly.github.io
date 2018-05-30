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
    drawAllBarGraph(getData(),1000,300);
  }
}