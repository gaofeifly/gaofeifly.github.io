var table = document.getElementById("table-wrapper");
var region = document.getElementById("region");
var product = document.getElementById("product");
var container = document.getElementById("container");
var stateobj = {"region":[],"product":[]};

render();

// checkbox点击事件代理  点击后更改state  
container.onclick = function(event){
  var event = event || window.event;
  if(event.target.nodeName.toLowerCase() === "input"){
    changeCheckboxStatus(event.target);
    createTable(getData());
    setState();
    render();
  }
}
// 设置state
function setState(){
  stateobj.product = getCheckedValue(product);
  stateobj.region = getCheckedValue(region);
  if(history.state){
    history.replaceState(stateobj,null,stateobj.product + "&" + stateobj.region);
    console.log("A1");
  }
  else{
    history.pushState(stateobj,null,stateobj.product + "&" + stateobj.region);
    console.log("A2");
  }
}
// 渲染
function render(){
  var r,p;
  var rChe = region.getElementsByTagName("input");
  var pChe = product.getElementsByTagName("input");
  if(history.state){
    r = history.state.region;
    p = history.state.product;
    for(var i=0;i<r.length;i++){
      for(var j=0;j<rChe.length;j++){
        if(r[i] == rChe[j].value)
          changeCheckboxStatus2(rChe[j]);
      }
    }
    for(var i=0;i<p.length;i++){
      for(var j=0;j<pChe.length;j++){
        if(p[i] == pChe[j].value)
          changeCheckboxStatus2(pChe[j]);
      }
    }
  }
  createTable(getData());
}