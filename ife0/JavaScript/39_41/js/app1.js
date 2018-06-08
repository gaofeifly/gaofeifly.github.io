var table = document.getElementById("table-wrapper");
var region = document.getElementById("region");
var product = document.getElementById("product");
var container = document.getElementById("container");

render();
// checkbox点击事件代理  点击后更改hash  
container.onclick = function(event){
  var event = event || window.event;
  if(event.target.nodeName.toLowerCase() === "input"){
    changeCheckboxStatus(event.target);
    createTable(getData());
    setHash();
  }
}
// 设置hash  hash格式  #product笔记本&手机region华北&华东
function setHash(){
  var regionValue = getCheckedValue(region);
  var productValue = getCheckedValue(product);
  location.hash = "#product";
  for(var i=0;i<productValue.length;i++){
    location.hash += productValue[i];
    if(i < productValue.length - 1)
      location.hash += "&";
  }
  location.hash += "region";
  for(var i=0;i<regionValue.length;i++){
    location.hash += regionValue[i];
    if(i < regionValue.length - 1)
      location.hash += "&";
  }
}
// 获取hash状态
function getHashState(){
  if(location.hash.length > 0)
    return location.hash;
  else
    return "";
}
// 渲染
function render(){
  // 浏览器会对url进行编码  需要解码
  var hash = decodeURI(getHashState());
  console.log(hash);
  var r = ["华北","华东","华南"];
  var p = ["手机","笔记本","智能音箱"];
  var rChe = region.getElementsByTagName("input");
  var pChe = product.getElementsByTagName("input");
  for(var i=0;i<r.length;i++){
    if(hash.indexOf(r[i]) > -1){
      for(var j=0;j<rChe.length;j++){
        if(r[i] == rChe[j].value){
          changeCheckboxStatus2(rChe[j]);
        }
      }
    }
  }
  for(var i=0;i<p.length;i++){
    if(hash.indexOf(p[i]) > -1){
      for(var j=0;j<pChe.length;j++){
        if(p[i] == pChe[j].value){
          changeCheckboxStatus2(pChe[j]);
        }
      }
    }
  }
  createTable(getData());
}