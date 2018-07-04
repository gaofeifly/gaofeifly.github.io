var expansion = san.defineComponent({
    template: `
        <div id="con">
            <div id="title">{{title}}<img id="icon" on-click="toggle" src="{{icon}}" /></div>
            <div id="content" s-if="open" s-transition="openDescription">{{description}}</div>
        </div>
    `,
    toggle: function(el){
        this.data.set("open",!this.data.get("open"));
        el.target.style.transform = this.data.get("open") ? "rotate(180deg)" : "";
    },
    initData: function(){
        return {
            open: false,
            title: "title",
            icon: "icon.png",
            description: "description",
        };
    },
    compiled: function(){
        console.log("编译");
    },
    inited : function(){
        console.log("初始化");
    },
    created: function(){
        console.log("创建");
    },
    attached: function(){
        console.log("添加到页面");
    },
    detached: function(){
        console.log("从页面删除");
    },
    disposed: function(){
        console.log("卸载");
    }
});
var app = san.defineComponent({
    template: `
        <div><expan open="true" description="Hello Baidu!" title="IFE"></expan></div>
    `,
    components: {
        "expan":expansion
    }
});

new app().attach(document.body);