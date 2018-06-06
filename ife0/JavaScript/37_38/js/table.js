// 根据选择的地区创建表格并显示
function createTable(list){
  var rLength = getCheckedValue(region).length;
  var pLength = getCheckedValue(product).length;
  var firstCol = getFirstColumn(rLength,pLength);
  var arr = [];
  if(firstCol == "商品")
    arr = ["product","region","商品","地区"];
  else
    arr = ["region","product","地区","商品"];
  table.innerHTML = "<tr><th>" + arr[2] + "</th><th>" + arr[3] + "</th><th>1月</th><th>2月</th><th>3月</th><th>4月</th><th>5月</th><th>6月</th><th>7月</th><th>8月</th><th>9月</th><th>10月</th><th>11月</th><th>12月</th></tr>";
  var tableHtml = "";
  for(var i=0;i<list.length;i++){
    var tr = "<tr><td>";
    tr += list[i][arr[0]] + "</td><td>" + list[i][arr[1]];
    for(var j=0;j<list[i].sale.length;j++)
      tr += '</td><td class="td-data" data-value="' + list[i].sale[j] + '">' + list[i].sale[j];
    tr += "</td></tr>";
    tableHtml += tr;
  }   
  //不能生成一行tr就直接加到table.innerHTML中，这样的话浏览器会自动的给每行添加一个tbody导致rowspan失效
  table.innerHTML += tableHtml; 
  if(isMerge(rLength,pLength))
    setRowspan();
}
// 设置td的rowspan
function setRowspan(){
  var trs = table.getElementsByTagName("tr");
  var tds = [];
  for(var i=1;i<trs.length;i++)
    tds.push(trs[i].firstChild);
  if(tds.length === 0)
    return;
  var rowspan = 1;
  var index = 0;        // 记录相邻的相同值中的第一个td的下标
  for(var i=0;i<tds.length;i++){
    var str = tds[index].innerHTML;
    if(i === 0)
      continue;
    if(str == tds[i].innerHTML){
      trs[i+1].removeChild(trs[i+1].childNodes[0]);
      rowspan++;
      if(rowspan > 1){
        tds[index].setAttribute("rowspan",rowspan);
      }
    }
    else{
      index = i;
      rowspan = 1;
    }
  }
}
// 判断商品or地区作为第一列
function getFirstColumn(rLength,pLength){
  if(pLength == 1)
    return "商品";
  else if(rLength == 1)
    return "地区";
  return "商品";
}
// 只有在两个长度都为1时不进行合并  其他情况都对第一列相同值进行合并
function isMerge(rLength,pLength){
  if(rLength <= 1 && pLength <= 1)
    return false;
  return true;
}