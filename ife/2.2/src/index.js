import san from 'san';
import './style.css';
// import app from './app.san';

var MyApp = san.defineComponent({
	template: '<div id="container">'+
				'<button id="but" on-click="add()">添加</button>'+
				'<table cellspacing="0">'+
					'<tr><th>姓名</th><th>审核状态</th><th>操作</th></tr>'+
					'<tr s-for="p,index in persons">'+
					'<td>{{p.name}}</td><td>{{p.examine}}</td><td><button on-click="operate(index)">{{p.operate}}</button></td></tr>'+				
				'</table>'+
			'</div>',
	initData:function(){
		return {
			persons:[
				{"name":"张三","examine":"合格","operate":"删除"},
				{"name":"李四","examine":"不合格","operate":"删除"},
				{"name":"王五","examine":"待审核","operate":"审核"},
				{"name":"赵六","examine":"待审核","operate":"审核"},
				{"name":"孙七","examine":"待审核","operate":"审核"}
			]
		};
	},
	add:function(){
		var name1 = prompt("输入姓名：","张三");
		var examine1 = prompt("输入审核状态：","待审核or合格or不合格");
		var operate1;
		if(examine1 === "合格" || examine1 === "不合格"){
			operate1 = "删除";
		}else if(examine1 === "待审核" ){
			operate1 = "审核";
		}else{
			alert("输入无效!");
			return;
		}
		this.data.push('persons',{name:name1,examine:examine1,operate:operate1});
	},
	operate:function(index){
		if(this.data.get('persons['+ index +'].operate')==='删除')
			this.data.removeAt("persons",index);
		else{
			this.data.set('persons['+ index +'].operate',"删除");
			this.data.set('persons['+ index +'].examine',"合格");
		}
	}
});
var myApp = new MyApp();
myApp.attach(document.body);