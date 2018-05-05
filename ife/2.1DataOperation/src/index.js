import san,{DataTypes} from 'san';
import './style.css';

var MyApp = san.defineComponent({
	//html
	template:'<div id="container">' +
	'<div class="info">' +
		'<input type="text" name="username" placeholder=" 姓名(string)" value="{= person.username =}" size="30" />' +
		'<input type="text" name="age" placeholder=" 年龄(age)" value="{= person.age =}" size="30" on-input="setAge()" />' +
		'<input type="text" name="introduction" placeholder=" 简介(string)" value="{= person.introduction =}" size="30"  />' + 
	'</div>' +
	'<div class="rmInfo">' +
		'信息：<input type="button" value="移除信息" on-click="removeInfo()">' +
	'</div>' +
	'<div class="result">' +
		'<p>姓名：<u>{{person.username}}</u></p>' +
		'<p>年龄：<u>{{person.age}}</u></p>' +
		'<p>简介：<u>{{person.introduction}}</u></p>' +
	'</div>'  +
	'</div>' ,
	initData:function(){
		return{
			//person类
			person:{
				username:'',
				age:'',
				introduction:''
			}
		};
	},
	dataTypes:{
		//设置person类中变量的数据类型
		person:DataTypes.shape({
			username:DataTypes.string,
			// age:DataTypes.number,
			introduction:DataTypes.string
		})
	},
	//移除信息
	removeInfo:function(){
		this.data.set('person.username','');
		this.data.set('person.age','');
		this.data.set('person.introduction','');
	},
	//设置年龄只能为整型
	setAge:function(){
		this.data.set('person.age',isNaN(parseInt(this.data.get('person.age')))? undefined:parseInt(this.data.get('person.age')));
	}
	
});
var myApp = new MyApp();
myApp.attach(document.body);