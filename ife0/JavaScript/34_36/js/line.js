// 绘制一条折线
function drawLineGraph(lineData,graphWidth,graphHeight){
  var canvas = document.getElementById("canvas-graph");
  // 定义折线图的宽度和高度以及坐标轴的长度和宽度
  // var graphWidth = 500;
  // var graphHeight = 500;
  var axisLengthX = graphWidth * 0.8;
  var axisLengthY = graphHeight * 0.8;
  var axisWidth = 2;

  var deltaX = (graphWidth - axisLengthX) / 2;
  var deltaY = (graphHeight - axisLengthY) / 2;
  // 折点颜色  坐标轴颜色  折线颜色
  var pointsColor = ["#60acfc","#32d3eb","#5bc49f","#feb64d","#ff7c7c","#9287e7","#60acfc","#32d3eb","#5bc49f","#feb64d","#ff7c7c","#9287e7"];
  var axisColor = "#cdaa7d";
  var lineColor = "#a0522d";
  // 折点直径  折线宽度
  var pointDiameter = 5;
  var lineWidth = 2;
   // 获取销售额最大值
  var maxNum = 0;
  for(var i=0;i<lineData.length;i++){
    if(lineData[i]>maxNum)
      maxNum = lineData[i];
  }
  // 计算出每个折点对应的高度
  var colHeights = [];
  for(var i=0;i<lineData.length;i++){
    colHeights.push(Math.round(lineData[i]/maxNum*axisLengthY));
  }
 
  // 每个折点的间隔距离
  var spaceWidth = (axisLengthX - (pointDiameter * lineData.length)) / lineData.length;
  // 绘制坐标轴
  var ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.fillStyle = "#fffaf0";
  ctx.rect(0,0,graphWidth,graphHeight);
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = axisColor;
  ctx.strokeStyle = axisColor;
  ctx.lineWidth = axisWidth;
  ctx.moveTo(deltaX,deltaY);
  ctx.lineTo(deltaX-5,deltaY);
  ctx.lineTo(deltaX,deltaY-15);
  ctx.lineTo(deltaX+5,deltaY);
  ctx.lineTo(deltaX,deltaY);
  ctx.fill();
  ctx.moveTo(deltaX,deltaY);
  ctx.lineTo(deltaX,deltaY+axisLengthY);
  ctx.lineTo(deltaX+axisLengthX,deltaY+axisLengthY);
  ctx.stroke();
  ctx.beginPath();
  ctx.lineTo(deltaX+axisLengthX,deltaY+axisLengthY+5);
  ctx.lineTo(deltaX+axisLengthX+15,deltaY+axisLengthY);
  ctx.lineTo(deltaX+axisLengthX,deltaY+axisLengthY-5);
  ctx.lineTo(deltaX+axisLengthX,deltaY+axisLengthY);
  ctx.fill();
  // 绘制折点和折线  先画线后画点
  // 记录上一个点圆心的位置
  var lastPoint = [];   
  // 记录每个折点圆心的位置
  var pointsPos = [];   
  for(var i=0;i<lineData.length;i++){
    if(i === 0){
      lastPoint[0] = deltaX + spaceWidth * (i + 1) + pointDiameter / 2;
      lastPoint[1] = deltaY + axisLengthY-colHeights[i];
      pointsPos.push({"x":deltaX + spaceWidth * (i + 1) + pointDiameter / 2,"y":deltaY + axisLengthY-colHeights[i]});
      ctx.beginPath();
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = lineColor;
      ctx.moveTo(lastPoint[0],lastPoint[1]);
    }
    else{
      lastPoint[0] = deltaX + spaceWidth * (i + 1) + pointDiameter / 2;
      lastPoint[1] = deltaY + axisLengthY-colHeights[i];
      pointsPos.push({"x":deltaX + spaceWidth * (i + 1) + pointDiameter / 2,"y":deltaY + axisLengthY-colHeights[i]});
      ctx.lineTo(lastPoint[0],lastPoint[1]);
    } 
  }
  ctx.stroke();
  for(var i=0;i<pointsPos.length;i++){
    ctx.beginPath();
    ctx.fillStyle = pointsColor[i];
    ctx.arc(pointsPos[i].x,pointsPos[i].y,pointDiameter/2,0,Math.PI*2);
    ctx.fill();
  }
}

// 绘制多条折线
function drawAllLineGraph(lineData,graphWidth,graphHeight){
  // 获取所有数据中的最大值
  var max = 0;
  for(var i=0;i<lineData.length;i++){
    for(var j=0;j<lineData[i].sale.length;j++)
      if(max<lineData[i].sale[j])
        max = lineData[i].sale[j];
  }
  var canvas = document.getElementById("lines-graph");
  // 定义折线图的宽度和高度以及坐标轴的长度和宽度
  var axisLengthX = graphWidth * 0.8;
  var axisLengthY = graphHeight * 0.8;
  var axisWidth = 2;

  var deltaX = (graphWidth - axisLengthX) / 2;
  var deltaY = (graphHeight - axisLengthY) / 2;
  // 坐标轴颜色
  var axisColor = "#cdaa7d";
  // 折线颜色
  var lineColors = ["#A52A2A","#ABABAB","#B0E2FF","#9A32CD","#90EE90","#8E8E38","#8B2500","#7B68EE","#FF83FA"];
  // 绘制坐标轴
  var ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.fillStyle = "#fffaf0";
  ctx.rect(0,0,graphWidth,graphHeight);
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = axisColor;
  ctx.strokeStyle = axisColor;
  ctx.lineWidth = axisWidth;
  ctx.moveTo(deltaX,deltaY);
  ctx.lineTo(deltaX-5,deltaY);
  ctx.lineTo(deltaX,deltaY-15);
  ctx.lineTo(deltaX+5,deltaY);
  ctx.lineTo(deltaX,deltaY);
  ctx.fill();
  ctx.moveTo(deltaX,deltaY);
  ctx.lineTo(deltaX,deltaY+axisLengthY);
  ctx.lineTo(deltaX+axisLengthX,deltaY+axisLengthY);
  ctx.stroke();
  ctx.beginPath();
  ctx.lineTo(deltaX+axisLengthX,deltaY+axisLengthY+5);
  ctx.lineTo(deltaX+axisLengthX+15,deltaY+axisLengthY);
  ctx.lineTo(deltaX+axisLengthX,deltaY+axisLengthY-5);
  ctx.lineTo(deltaX+axisLengthX,deltaY+axisLengthY);
  ctx.fill();
  // 绘制多条折线
  for(var i=0;i<lineData.length;i++){
    // 计算出每个折点对应的高度
    var colHeights = [];
    for(var j=0;j<lineData[i].sale.length;j++){
      colHeights.push(Math.round(lineData[i].sale[j]/max*axisLengthY));
    }
    drawLineAndPoint(lineData[i].sale,colHeights,deltaX,deltaY,axisLengthX,axisLengthY,ctx,lineColors[i]);
  }
}

function drawLineAndPoint(lineData,colHeights,deltaX,deltaY,axisLengthX,axisLengthY,ctx,lineColor){
  // 折点的颜色
  var pointsColor = ["#60acfc","#32d3eb","#5bc49f","#feb64d","#ff7c7c","#9287e7","#60acfc","#32d3eb","#5bc49f","#feb64d","#ff7c7c","#9287e7"];
  // 折点直径  折线宽度
  var pointDiameter = 3;
  var lineWidth = 1;
  // 每个折点的间隔距离
  var spaceWidth = (axisLengthX - (pointDiameter * lineData.length)) / lineData.length;
  // 记录上一个点圆心的位置
  var lastPoint = [];   
  // 记录每个折点圆心的位置
  var pointsPos = [];   
  for(var i=0;i<lineData.length;i++){
    if(i === 0){
      lastPoint[0] = deltaX + spaceWidth * (i + 1) + pointDiameter / 2;
      lastPoint[1] = deltaY + axisLengthY-colHeights[i];
      pointsPos.push({"x":deltaX + spaceWidth * (i + 1) + pointDiameter / 2,"y":deltaY + axisLengthY-colHeights[i]});
      ctx.beginPath();
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = lineColor;
      ctx.moveTo(lastPoint[0],lastPoint[1]);
    }
    else{
      lastPoint[0] = deltaX + spaceWidth * (i + 1) + pointDiameter / 2;
      lastPoint[1] = deltaY + axisLengthY-colHeights[i];
      pointsPos.push({"x":deltaX + spaceWidth * (i + 1) + pointDiameter / 2,"y":deltaY + axisLengthY-colHeights[i]});
      ctx.lineTo(lastPoint[0],lastPoint[1]);
    } 
  }
  ctx.stroke();
  for(var i=0;i<pointsPos.length;i++){
    ctx.beginPath();
    ctx.fillStyle = pointsColor[i];
    ctx.arc(pointsPos[i].x,pointsPos[i].y,pointDiameter/2,0,Math.PI*2);
    ctx.fill();
  }
}