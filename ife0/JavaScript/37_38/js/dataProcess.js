// 根据选择的地区和商品来获取相应的数据并返回
function getData(data){
  var regionValue = getCheckedValue(region);
  var productValue = getCheckedValue(product);
  var list = [];
  for(var i=0;i<data.length;i++){
    for(var j=0;j<regionValue.length;j++){
      for(var k=0;k<productValue.length;k++){
        if(regionValue[j] == data[i].region && productValue[k] == data[i].product)
          list.push(data[i]);
      }
    }
  }
  return list;
}
// 根据数据域和给定的商品和地区来获取数据
function getData2(data,productValue,regionValue){
  for(var i=0;i<data.length;i++){
    if(regionValue == data[i].region && productValue == data[i].product)
      return data[i];
  }
}
// 将表格数据保存到localStorage
function saveLocal(data){
  // 存放时要序列化  取出时要反序列化   
  var prod = ["手机","笔记本","智能音箱"];
  var regi = ["华北","华东","华南"];
  var sale = [0,0,0,0,0,0,0,0,0,0,0,0];
  var temparray = [];
  var tempdata;
  if(data.length < 9 ){
    if(localStorage.getItem("ifedata")){
      tempdata = JSON.parse(localStorage.getItem("ifedata"));
    }
    else
      tempdata = sourceData;
    // 如果用户第一次保存时是在数据不完全显示的状态下进行的  则使用sourceData的数据  保证tempdata始终数据齐全
    if(tempdata.length<9){
        for(var j=0;j<prod.length;j++){
          for(var k=0;k<regi.length;k++){
            var flag = false;
            for(var i=0;i<data.length;i++){
              if(data[i].product == prod[j] && data[i].region == regi[k]){
                flag = true;    // 找到了
                break;
              }
            }
            if(!flag)
              tempdata.push({region:regi[k],product:prod[j],sale:sale});
          }
      }
    }
    // console.log("temp在我的下方");
    // console.log(tempdata);
    // 从之前保存的数据中找出未进行设置的数据保存
    for(var j=0;j<prod.length;j++){
      for(var k=0;k<regi.length;k++){
        var flag = false;
        for(var i=0;i<data.length;i++){
          if(data[i].product == prod[j] && data[i].region == regi[k]){
            flag = true;    // 找到了
            break;
          }
        }
        if(!flag)
          temparray.push(getData2(tempdata,prod[j],regi[k]));
      }
    }

    for(var i=0;i<temparray.length;i++){
      data.push(temparray[i]);
    }
  } 
  // 将数据存放进localStorage
  // console.log(data);
  localStorage.setItem("ifedata",JSON.stringify(data));
}
// 获取地区和商品相对应的数据  保存为ifedata格式  商品-地区-数据   
// 如果在未显示全部数据的情况下保存  对没有显示出来的在保存时默认设置数据为上一次存入localStorage的数据 
// 如果没有则设置为sourceData的数据
function getTextData(){
  var localDatas = [];    // 用于存放获取的text的数据
  // 判断第一列为商品还是地区
  var rLength = getCheckedValue(region).length;
  var pLength = getCheckedValue(product).length;
  var firstCol = getFirstColumn(rLength,pLength);

  var trs = table.getElementsByTagName("tr");
  var rowspan = 1;
  var tds0 = "";      // 记录rowspan>1的行的第一列的值  用于第一列为商品的情况
  var tds1 = "";      // 记录rowspan>1的行的第一列的值  用于第一列为地区的情况
  for(var i=1;i<trs.length;i++){
    var data = {};
    var sales = [];
    var tds = trs[i].childNodes;
    // length  13 or 14
    if(tds.length == 14 && tds[0].getAttribute("rowspan")){
      rowspan = tds[0].getAttribute("rowspan");
      if(firstCol == "商品"){
        tds0 = tds[0].textContent;
        data.product = tds[0].textContent;
        data.region = tds[1].textContent;
      }else{
        tds1 = tds[0].textContent;
        data.product = tds[1].textContent;
        data.region = tds[0].textContent;
      }
      for(var j=2;j<14;j++){
        // sales.push(tds[j].childNodes[0].value);
        sales.push(tds[j].textContent);
      }
    }
    else{
      if(rowspan > 1){
        if(firstCol == "商品"){
          data.product = tds0;
          data.region = tds[0].textContent;
        }else{
          data.region = tds1;
          data.product = tds[0].textContent;
        }
        rowspan--;
        for(var j=1;j<13;j++){
          // sales.push(tds[j].childNodes[0].value);
          sales.push(tds[j].textContent);
        }
      }
    }
    data.sale = sales;
    localDatas.push(data);
  }
  return localDatas;
}
// 在将ifedata取出来以后先对数据进行排序 然后再将数据传给createTable函数 
// 使同一商品名称的数据放在一起 这样在调用table.js 里的setRospan函数时才不会出错
function sortData(data){
  var arr = [];   // 记录data中所有商品名称
  var result = [];
  for(var i=0;i<data.length;i++){
    if(arr.indexOf(data[i].product) > -1)
      continue;
    arr.push(data[i].product);
  }
  for(var i=0;i<arr.length;i++){
    for(var j=0;j<data.length;j++){
      if(data[j].product == arr[i])
        result.push(data[j]);
    }
  }
  return result;
}