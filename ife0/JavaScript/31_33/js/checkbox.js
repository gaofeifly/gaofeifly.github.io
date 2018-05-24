// 改变checkbox的状态
function changeCheckboxStatus(che){
  var checks = che.parentNode.parentNode.getElementsByTagName("input");
  if(che.value === "全选"){
    for(var i=0;i<checks.length;i++){
      if(checks[i]!==che)
        checks[i].checked = true;
    }
    che.checked = true;
  }else{
    var checkedNum = 0;
    for(var i=1;i<checks.length;i++){
      if(checks[i].checked == true)
        checkedNum++;
    }
    if(checkedNum === 0)
      che.checked = true;
    if(checkedNum === 3)
      checks[0].checked = true;
    for(var i=1;i<checks.length;i++){
      if(!checks[i].checked)
        checks[0].checked = false;
    }
  }
}
// 根据选择的地区和商品来获取相应的数据并返回
function getData(){
  var regionValue = getCheckedValue(region);
  var productValue = getCheckedValue(product);
  var list = [];
  for(var i=0;i<sourceData.length;i++){
    for(var j=0;j<regionValue.length;j++){
      for(var k=0;k<productValue.length;k++){
        if(regionValue[j] == sourceData[i].region && productValue[k] == sourceData[i].product)
          list.push(sourceData[i]);
      }
    }
  }
  return list;
}
// 根据父容器来获取子元素中被选中的value
function getCheckedValue(foo){
  var checkboxs = foo.getElementsByTagName("input");
  var valArr = [];
  for(var i=1;i<checkboxs.length;i++){
    if(checkboxs[i].checked)
      valArr.push(checkboxs[i].value);
  }
  return valArr;
}