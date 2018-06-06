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