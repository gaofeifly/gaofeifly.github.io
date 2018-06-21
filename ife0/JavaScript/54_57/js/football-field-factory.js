var footballFieldFactory = function(){};
footballFieldFactory.prototype = {
  createField: function(fieldLength,fieldWidth,containerLength,containerWidth){
    // 足球场米数长  米数宽  容器像素长  像素宽
    // 折算出一个像素对应多少米  长宽不对应成比例时 取大值
    var proportion = Math.max(fieldLength/containerLength,fieldWidth/containerWidth);
    var con = document.createElement("div");
    con.style.width = containerLength + "px";     // 容器长
    con.style.height = containerWidth + "px";     // 容器宽
    con.className = "container";
    var field = document.createElement("div");
    var width = field.style.width = fieldLength/proportion + "px";     // 球场长
    var height = field.style.height = fieldWidth/proportion + "px";     // 球场宽
    field.className = "field";
    con.appendChild(field);
    var canvas = document.createElement("canvas");
    canvas.width = width.substring(0,width.length-2);
    canvas.height = height.substring(0,height.length-2);
    field.appendChild(canvas);
    var ctx = canvas.getContext("2d");

    // 四个边角
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(0,0,10,0,Math.PI/2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(canvas.width,0,10,0,-Math.PI/2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0,canvas.height,10,-Math.PI/2,0);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(canvas.width,canvas.height,10,0,-Math.PI/2);
    ctx.stroke();

    // 中间分线和大圆圈(半径9.15米)
    ctx.moveTo(canvas.width/2,0);
    ctx.lineTo(canvas.width/2,canvas.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(canvas.width/2,canvas.height/2,9.15/proportion,0,Math.PI*2);
    ctx.stroke();

    // 左侧球门区域
    ctx.beginPath();
    ctx.moveTo(0,canvas.height/2-14.4/proportion);
    ctx.lineTo(12.82/proportion,canvas.height/2-14.4/proportion);
    ctx.lineTo(12.82/proportion,canvas.height/2+14.4/proportion);
    ctx.lineTo(0,canvas.height/2+14.4/proportion);
    ctx.moveTo(0,canvas.height/2+8.25/proportion);
    ctx.lineTo(4.5/proportion,canvas.height/2+8.25/proportion);
    ctx.lineTo(4.5/proportion,canvas.height/2-8.25/proportion);
    ctx.lineTo(0,canvas.height/2-8.25/proportion);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(9.15/proportion,canvas.height/2,1,0,Math.PI*2);
    ctx.stroke();
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(9.15/proportion,canvas.height/2,7.32/proportion,-Math.PI/3,Math.PI/3);
    ctx.stroke();

    // 右侧球门区域
    ctx.beginPath();
    ctx.moveTo(canvas.width,canvas.height/2-14.4/proportion);
    ctx.lineTo(canvas.width-12.82/proportion,canvas.height/2-14.4/proportion);
    ctx.lineTo(canvas.width-12.82/proportion,canvas.height/2+14.4/proportion);
    ctx.lineTo(canvas.width,canvas.height/2+14.4/proportion);
    ctx.moveTo(canvas.width,canvas.height/2+8.25/proportion);
    ctx.lineTo(canvas.width-4.5/proportion,canvas.height/2+8.25/proportion);
    ctx.lineTo(canvas.width-4.5/proportion,canvas.height/2-8.25/proportion);
    ctx.lineTo(canvas.width,canvas.height/2-8.25/proportion);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(canvas.width-9.15/proportion,canvas.height/2,1,0,Math.PI*2);
    ctx.stroke();
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(canvas.width-9.15/proportion,canvas.height/2,7.32/proportion,Math.PI*2/3,-Math.PI*2/3);
    ctx.stroke();

    return con;
  }
}