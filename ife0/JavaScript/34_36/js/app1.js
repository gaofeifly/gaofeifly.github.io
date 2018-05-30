var list = [];

list = getDataByRegionAndMonth("华东","手机");
drawBarGraph(list,350,350);
drawLineGraph(list,350,350);
// 获取某个地区某一品类产品的销售额
function getDataByRegionAndMonth(region,product){
  var list = [];
  for(var i=0;i<sourceData.length;i++){
    if(sourceData[i].region == region && sourceData[i].product == product)
      list = sourceData[i].sale;
  }
  return list;
}
