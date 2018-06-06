var table = document.getElementById("table-wrapper");
var region = document.getElementById("region");
var product = document.getElementById("product");
var container = document.getElementById("container");
var savaBut = document.getElementById("saveData");
var tds = document.getElementsByClassName("td-data");
var imgs = document.getElementsByTagName("img");
var rawData = "";

// 重新打开网页时清楚ifedata
delete window.localStorage["ifedata"];
init();

// 一开始设置全选都选中  所有数据都显示
function init(){
  var regionAll = document.getElementById("regionAll-checkbox");
  var productAll = document.getElementById("productAll-checkbox");
  changeCheckboxStatus(regionAll);
  changeCheckboxStatus(productAll);
  if(localStorage.getItem("ifedata")){
    var data = JSON.parse(localStorage.getItem("ifedata"));
    data = sortData(data);
    createTable(getData(data));
  }else{
    createTable(getData(sourceData));
  }
  tdMouseLeave();
}

// checkbox点击事件代理
container.onclick = function(event){
  var event = event || window.event;
  var target = event.target;
  if(target.nodeName.toLowerCase() === "input" && target.type == "checkbox"){
    changeCheckboxStatus(target);
    // 如果有localStorage的数据先使用该数据
    if(localStorage.getItem("ifedata")){
      var data = JSON.parse(localStorage.getItem("ifedata"));
      data = sortData(data);
      createTable(getData(data));
    }else{
      createTable(getData(sourceData));
    }
    tdMouseLeave();
  }
  // 编辑按钮点击事件  同一时刻只能有一个输入框
  if(target.className == "editImg"){
    if(document.getElementsByClassName("okImg").length > 0){
      var ok = document.getElementsByClassName("okImg")[0];
      ok.parentNode.textContent = ok.parentNode.getAttribute("data-value");
    }
    var text = document.createElement("input");
    var okImg = document.createElement("img");
    var noImg = document.createElement("img");
    var td = target.parentNode;
    text.type = "text";
    text.className = "text-data";
    text.value = target.parentNode.getAttribute("data-value");
    okImg.src = "images/ok.png";
    okImg.className = "okImg";
    noImg.src = "images/no.png";
    noImg.className = "noImg";
    td.innerHTML = "";
    // 编辑按钮不显示 确定和取消按钮显示
    td.appendChild(okImg);
    td.appendChild(noImg);
    td.appendChild(text);
    text.focus();
    // input键盘事件
    text.onkeydown = function(event){
      if(event.keyCode == 13){   // 回车
        if(islegal(text.value))
          text.parentNode.textContent = text.value;
        else{
          alert("数据输入不合法!");
          text.value = rawData;
          text.focus();
        }
      }
      else if(event.keyCode == 27)  // Esc
        text.parentNode.textContent = text.parentNode.getAttribute("data-value"); 
    }
  }
  // 确定按钮点击事件
  if(target.className == "okImg"){
    var td = target.parentNode;
    var text = td.getElementsByClassName("text-data")[0];
    td.setAttribute("data-value",text.value);
    td.textContent = text.value;
  }
  // 取消按钮点击事件
  if(target.className == "noImg"){
    var td = target.parentNode;
    td.textContent = td.getAttribute("data-value");
  }
}

// 保存按钮点击事件  如果页面有确定和取消标签则alert
savaBut.onclick = function(){
  saveLocal(getTextData());
  if(document.getElementsByClassName("okImg").length > 0)
    alert("含有未确认项!");
  else
    alert("保存成功");
}

// text文本框blur和focus事件代理  table没有onblur事件  使用addEventListener捕获blur事件
// text文本框focus事件   记录某一文本框在blur之前的数据 以便于输入不合法时重新设置为该数据
table.addEventListener("focus",function(event){
  var event = event || window.event;
  var target = event.target;
  if(target.nodeName.toLowerCase() == "input"){
    rawData = target.value;
  }
},true);

// text文本框blur事件  blur后如果数据合法则文本框消失
table.addEventListener("blur",function(event){
  var event = event || window.event;
  var target = event.target;
  var td = target.parentNode;
  if(target.nodeName.toLowerCase() == "input"){
    if(!islegal(target.value)){
      alert("输入数据不合法!");
      target.value = rawData;
    }
  } 
},true);

// 判断输入的数据是否合法 不合法给出警告 并且不进行数据设置
function islegal(inputData){
  // isNaN会将空字符串和null按照0处理  所以先去除  返回true表示合法
  if(inputData == "" || inputData == null)
    return false;
  else
    return !(isNaN(inputData));
}

// td onmouseover 事件代理
table.onmouseover = function(event){
  var event = event || window.event;
  var target = event.target;
  // 鼠标落在有数据的td上并且该td内没有显示input
  if(target.className == "td-data" && !target.getElementsByClassName("text-data")[0]){
    var editImg = document.createElement("img");
    editImg.src = "images/icon1.png";
    editImg.className = "editImg";
    target.appendChild(editImg);
    for(var i=0;i<imgs.length;i++){
      if(imgs[i].className == "editImg"){
        imgs[i].onmouseleave = function(event){
          var event = event || window.event;
          var target = event.target;
          target.parentNode.removeChild(target);
        }
      }
    }
  }
}

// td onmouse 事件代理  第三个参数设置为true  指事件在捕获阶段执行  事件代理失败
// table.addEventListener("onmouseleave",function(event){
//   console.log("leave");
//   var event = event || window.event;
//   var target = event.target;
//   if(target.nodeName.toLowerCase() == "td" && target.className == "td-data" ){
//       if(target.getElementsByClassName("editImg")[0])
//         target.removeChild(target.getElementsByClassName("editImg")[0]);
//     }
// },true);

function tdMouseLeave(){
  for(var i=0;i<tds.length;i++){
    tds[i].onmouseleave = function(event){
      var event = event || window.event;
      var target = event.target;
      if(target.nodeName.toLowerCase() == "td" && target.className == "td-data" ){
        if(target.getElementsByClassName("editImg")[0])
          target.removeChild(target.getElementsByClassName("editImg")[0]);
      }
    }
  }
}


