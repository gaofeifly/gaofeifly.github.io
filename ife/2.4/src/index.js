// import san from 'san';


var son = san.defineComponent({
	template:'<div>子组件：<input type="text" value="{= valueSon =}" /><button on-click="callFoo()">通知父组件</button></div>',
	callFoo:function(){
		var value = this.data.get('valueSon');
		this.fire("sonClick",value);
		this.dispatch("son-item",value);
	},
	initData:function(){
		return{
			"valueSon":''
		};
	}
});

var foo1 = san.defineComponent({
	template:'<div><ui-son on-sonClick="foo1Click" valueSon="{{valueFoo1}}">'+
			'</ui-son>'+
			'<span style="color:blue;">我是父组件</span><input style="border:0px;" type="text" value="{= valueFoo1 =}" placeholder="静静地等待用户输入"/></div>',
	components: {
        "ui-son": son
    },
    foo1Click:function(arg){
    	this.data.set("valueFoo1",arg);
    }
    // initData:function(){
    // 	return {
    // 		"valueFoo1":"静静"
    // 	};
    // }
});


var app = san.defineComponent({
	template:'<div>'+
					'<ui-foo1></ui-foo1>'+
					'<span style="color:green;">我是更高层父组件</span><input style="border:0px;" type="text" value="{= valueFoo1 =}" placeholder="静静地等待用户输入"/></div>'+
			'</div>',
	components:{
		"ui-foo1":foo1
	},
	messages:{
		"son-item":function(arg){
			var value = arg.value;
			this.data.set('valueFoo2',value);
		}
	}
});

var myapp = new app();
myapp.attach(document.body);

