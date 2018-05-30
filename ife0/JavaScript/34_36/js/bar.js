function drawBarGraph(barData,graphWidth,graphHeight){
  // 定义柱状图的宽度和高度以及坐标轴的长度和宽度
  // var graphWidth = 500;
  // var graphHeight = 500;
  var axisLengthX = graphWidth * 0.8;
  var axisLengthY = graphHeight * 0.8;
  var strokeWidth = 3;
  // 定义柱子宽度及柱子间隔宽度
  var colWidth = Math.round(axisLengthX/(barData.length*1.6));
  var spaceWidth = 0.5*colWidth;
  // 定义柱子的颜色以及轴的颜色
  var colColor = ["#60acfc","#32d3eb","#5bc49f","#feb64d","#ff7c7c","#9287e7","#60acfc","#32d3eb","#5bc49f","#feb64d","#ff7c7c","#9287e7"];
  var axisColorX = "#cdaa7d";
  var axisColorY = "#b7b7b7";
  // 获取销售额最大值
  var maxNum = 0;
  for(var i=0;i<barData.length;i++){
    if(barData[i]>maxNum)
      maxNum = barData[i];
  }
  // 计算出每个柱子对应的高度
  var colHeights = [];
  for(var i=0;i<barData.length;i++){
    colHeights.push(Math.round(barData[i]/maxNum*axisLengthY));
  }
  // 绘制
  var svg = document.getElementById("svg-graph");
  var xmlns = "http://www.w3.org/2000/svg";
  //图表框
  var backRect = document.createElementNS(xmlns,"rect");
  backRect.setAttribute("width",graphWidth);
  backRect.setAttribute("height",graphHeight);
  backRect.setAttribute("style","fill:#fffaf0;");
  svg.appendChild(backRect);

  var deltaX = (graphWidth-axisLengthX)/2;
  var deltaY = (graphHeight-axisLengthY)/2;

  // x轴
  var xLine = document.createElementNS(xmlns,"line");
  xLine.setAttribute("x1",deltaX);
  xLine.setAttribute("y1",deltaY+axisLengthY);
  xLine.setAttribute("x2",deltaX+axisLengthX);
  xLine.setAttribute("y2",deltaY+axisLengthY);
  xLine.setAttribute("style","stroke-width:" + strokeWidth + ";stroke:" + axisColorX + ";");
  svg.appendChild(xLine);
  // x轴三角形
  var xLineTri = document.createElementNS(xmlns,"polygon");
  var xLineTriPos = (deltaX + axisLengthX) + "," + (deltaY + axisLengthY - 5) + " " + (deltaX + axisLengthX + 15) + "," 
                    + (deltaY + axisLengthY) + " " + (deltaX + axisLengthX) + "," + (deltaY + axisLengthY + 5);
  xLineTri.setAttribute("points",xLineTriPos);
  xLineTri.setAttribute("style","fill:"+axisColorX);
  svg.appendChild(xLineTri);
  // y轴三角形
  var yLineTri = document.createElementNS(xmlns,"polygon");
  var yLineTriPos = (deltaX - 5) + "," + deltaY + " " + deltaX + "," 
                    + (deltaY - 15) + " " + (deltaX + 5) + "," + deltaY;
  yLineTri.setAttribute("points",yLineTriPos);
  yLineTri.setAttribute("style","fill:"+axisColorY);
  svg.appendChild(yLineTri);
  // y轴
  var yLine = document.createElementNS(xmlns,"line");
  yLine.setAttribute("x1",deltaX);
  yLine.setAttribute("y1",deltaY+axisLengthY);
  yLine.setAttribute("x2",deltaX);
  yLine.setAttribute("y2",deltaY);
  yLine.setAttribute("style","stroke-width:" + strokeWidth + ";stroke:" + axisColorY + ";");
  svg.appendChild(yLine);
  // 柱子
  for(var i=0;i<colHeights.length;i++){
    var col = document.createElementNS(xmlns,"rect");
    col.setAttribute("x",deltaX+spaceWidth*(i+1)+colWidth*i);
    col.setAttribute("y",deltaY+axisLengthY-colHeights[i]);
    col.setAttribute("width",colWidth);
    col.setAttribute("height",colHeights[i]);
    col.setAttribute("style","fill:"+colColor[i]+";");
    svg.appendChild(col);
  }
}

// 绘制多列柱状图
function drawAllBarGraph(barData,graphWidth,graphHeight){
  // 清空盛放svg的div
  document.getElementById("svg").innerHTML = "";
  // 获得显示在表头的内容
  var firstTd = getFirstTd();
  for(var i=0;i<firstTd.length;i++){
    var bar = [];
    for(var j=0;j<barData.length;j++){
      if(barData[j].region == firstTd[i] || barData[j].product == firstTd[i])
        bar.push(barData[j]);
    }
    drawBarGraph1(firstTd[i],bar,graphWidth,graphHeight);
  }
}

function drawBarGraph1(title,barData,graphWidth,graphHeight){
  // 定义柱状图的宽度和高度以及坐标轴的长度和宽度
  var axisLengthX = graphWidth * 0.8;
  var axisLengthY = graphHeight * 0.8;
  var strokeWidth = 3;
  // 定义柱子宽度及柱子间隔宽度
  var colWidth = Math.round(axisLengthX/((barData.length+1)*12));
  var spaceWidth = 0.98*colWidth;
  // 定义柱子的颜色以及轴的颜色
  var colColor = ["#60acfc","#5bc49f","#feb64d","#ff7c7c"];
  var axisColorX = "#cdaa7d";
  var axisColorY = "#b7b7b7";
  // 获取销售额最大值
  var maxNum = 0;
  for(var i=0;i<barData.length;i++){
    for(var j=0;j<barData[i].sale.length;j++)
    if(barData[i].sale[j]>maxNum)
      maxNum = barData[i].sale[j];
  }
  // 计算出每个柱子对应的高度
  var colHeights = [];
  for(var i=0;i<barData.length;i++){
    for(var j=0;j<barData[i].sale.length;j++)
      colHeights.push(Math.round(barData[i].sale[j]/maxNum*axisLengthY));
  }
  // 绘制
  var xmlns = "http://www.w3.org/2000/svg";
  var svg = document.createElementNS(xmlns,"svg");
  svg.setAttribute("xmlns",xmlns);
  svg.setAttribute("width",graphWidth);
  svg.setAttribute("height",graphHeight);
  document.getElementById("svg").appendChild(svg);
  var br = document.createElement("br");
  document.getElementById("svg").appendChild(br);
  //图表框
  var backRect = document.createElementNS(xmlns,"rect");
  backRect.setAttribute("width",graphWidth);
  backRect.setAttribute("height",graphHeight);
  backRect.setAttribute("style","fill:#fffaf0;");
  svg.appendChild(backRect);

  var deltaX = (graphWidth-axisLengthX)/2;
  var deltaY = (graphHeight-axisLengthY)/2;

  // x轴
  var xLine = document.createElementNS(xmlns,"line");
  xLine.setAttribute("x1",deltaX);
  xLine.setAttribute("y1",deltaY+axisLengthY);
  xLine.setAttribute("x2",deltaX+axisLengthX);
  xLine.setAttribute("y2",deltaY+axisLengthY);
  xLine.setAttribute("style","stroke-width:" + strokeWidth + ";stroke:" + axisColorX + ";");
  svg.appendChild(xLine);
  // x轴三角形
  var xLineTri = document.createElementNS(xmlns,"polygon");
  var xLineTriPos = (deltaX + axisLengthX) + "," + (deltaY + axisLengthY - 5) + " " + (deltaX + axisLengthX + 15) + "," 
                    + (deltaY + axisLengthY) + " " + (deltaX + axisLengthX) + "," + (deltaY + axisLengthY + 5);
  xLineTri.setAttribute("points",xLineTriPos);
  xLineTri.setAttribute("style","fill:"+axisColorX);
  svg.appendChild(xLineTri);
  // y轴三角形
  var yLineTri = document.createElementNS(xmlns,"polygon");
  var yLineTriPos = (deltaX - 5) + "," + deltaY + " " + deltaX + "," 
                    + (deltaY - 15) + " " + (deltaX + 5) + "," + deltaY;
  yLineTri.setAttribute("points",yLineTriPos);
  yLineTri.setAttribute("style","fill:"+axisColorY);
  svg.appendChild(yLineTri);
  // y轴
  var yLine = document.createElementNS(xmlns,"line");
  yLine.setAttribute("x1",deltaX);
  yLine.setAttribute("y1",deltaY+axisLengthY);
  yLine.setAttribute("x2",deltaX);
  yLine.setAttribute("y2",deltaY);
  yLine.setAttribute("style","stroke-width:" + strokeWidth + ";stroke:" + axisColorY + ";");
  svg.appendChild(yLine);
  // 标题
  var t = document.createElementNS(xmlns,"text");
  t.setAttribute("x","50");
  t.setAttribute("y","50");
  t.setAttribute("fill","red");
  t.innerHTML = title;
  svg.appendChild(t);
  // 月份
  var months = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];
  for(var i=0;i<12;i++){
    var m = document.createElementNS(xmlns,"text");
    m.setAttribute("x",deltaX+axisLengthX/12*i+spaceWidth);
    m.setAttribute("y",deltaY+axisLengthY+20);
    m.setAttribute("fill","red");
    m.innerHTML = months[i];
    svg.appendChild(m);
  }
  // 柱子
  // 获得柱子中每个月对应的列数及内容 1~3
  var secondTd = getSecondTd();
  var colNum = secondTd.length;
  for(var i=0;i<colHeights.length/colNum;i++){
    for(var j=0;j<colNum;j++){
      var col = document.createElementNS(xmlns,"rect");
      col.setAttribute("x",deltaX+spaceWidth*(i+1)+colWidth*i*colNum+colWidth*j);
      col.setAttribute("y",deltaY+axisLengthY-colHeights[i+j*12]);
      col.setAttribute("width",colWidth);
      col.setAttribute("height",colHeights[i+j*12]);
      col.setAttribute("style","fill:"+colColor[j]+";");
      svg.appendChild(col);
    }
  }
  // 图例
  for(var j=0;j<colNum;j++){
    var r = document.createElementNS(xmlns,"rect");
    r.setAttribute("x",deltaX+axisLengthX+20);
    r.setAttribute("y",deltaY+25*j);
    r.setAttribute("width",40);
    r.setAttribute("height",25);
    r.setAttribute("fill",colColor[j]);
    svg.appendChild(r);
    var t = document.createElementNS(xmlns,"text");
    t.setAttribute("x",deltaX+axisLengthX+60);
    t.setAttribute("y",deltaY+25*j+15);
    t.setAttribute("fill","red");
    t.innerHTML = secondTd[j];
    svg.appendChild(t);
  }
}

 
