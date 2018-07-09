var data = [{
    value: 'zhinan',
    label: '指南',
    children: [{
        value: 'shejiyuanze',
        label: '设计原则',
        children: [{
            value: 'yizhi',
            label: '一致'
        }, {
            value: 'fankui',
            label: '反馈'
        }, {
            value: 'xiaolv',
            label: '效率'
        }, {
            value: 'kekong',
            label: '可控'
        }]
    }, {
        value: 'daohang',
        label: '导航',
        children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
        }, {
            value: 'dingbudaohang',
            label: '顶部导航'
        }]
    }]
},  {
    value: 'ziyuan',
    label: '资源',
    children: [{
        value: 'axure',
        label: 'Axure Components'
    }, {
        value: 'sketch',
        label: 'Sketch Templates'
    }, {
        value: 'jiaohu',
        label: '组件交互文档'
    }]
}];

var list = san.defineComponent({
    template: `
        <div class="list" on-click="operateClick">
            <div>
                <span class="list-content">{{ content }}</span>
                <img s-if="imgDis == 1" class="list-img" src="{{ imgSrc }}">
            </div>
        </div>
    `,
    initData: function(){
        return {
            content: "content",
            imgSrc: "icon.png",
            value: "",
            flag: false,
            imgDis: 1,       // 0 无箭头 1 有箭头
        };
    },
    operateClick: function(){
        if(this.data.get("imgDis") == 1){
            this.data.set("flag",false);
            this.searchChild(this.data.get("value"),data,1);
        }else{
            this.dispatch("message-setChoose",this.data.get("content"));
        }
    },
    searchChild: function(value,data,index){
        var index = index;
        // value 要查找的数据  data 第n级数据 index 第n级 从1开始
        if(this.data.get("flag"))
            return;
        var datas = [];
        for(var i=0;i<data.length;i++){
            if(data[i].value == value && data[i].children){
                for(var j=0;j<data[i].children.length;j++){
                    datas.push({
                        value: data[i].children[j].value,
                        label: data[i].children[j].label,
                        imgDis: data[i].children[j].children ? 1 : 0
                    });
                }
                index++;
                this.data.set("flag",true);
                if(index == 2){
                    this.dispatch("message-datasTwo",datas);
                }else if(index == 3){
                    this.dispatch("message-datasThree",datas);
                }
                break;
            }else if(data[i].children){
                this.searchChild(value,data[i].children,index+1);
            }
        }
        index++;
    }
});


var cascadedComp = san.defineComponent({
    template: `
        <div id="root">
            <div id="choose-box" on-click="operateClick">
                <span>{{ chooseValue }}</span>
                <img class="choose-box-img" src="{{ imgSrc }}" style='{{ listsDisplay ? "transform:rotate(180deg)" : ""}}'>
            </div>
            <div on-click="listsConClick" id="lists" s-if="listsDisplay" s-transition="operateTransition">
                <div id="lists-con">
                    <div id="triangle"></div>
                    <div id="lists-first"><list s-for="data in datasOne" content="{{ data.label }}" value="{{ data.value }}" imgDis="{{ data.imgDis }}"></list></div>
                    <div id="lists-second"><list s-for="data in datasTwo" content="{{ data.label }}" value="{{ data.value }}" imgDis="{{ data.imgDis }}"></list></div>
                    <div id="lists-third"><list s-for="data in datasThree" content="{{ data.label }}" value="{{ data.value }}" imgDis="{{ data.imgDis }}"></list></div>
                <div>
            </div>
        </div>
    `,
    components: {
        "list": list
    },
    messages: {
        "message-datasTwo": function(arg){
            this.data.set("datasTwo",[]);
            this.data.set("datasThree",[]);
            for(var i=0;i<arg.value.length;i++){
                this.data.push("datasTwo",arg.value[i]);
            }
        },
        "message-datasThree": function(arg){
            this.data.set("datasThree",[]);
            for(var i=0;i<arg.value.length;i++){
                this.data.push("datasThree",arg.value[i]);
            }
        },
        "message-setChoose": function(arg){
            this.data.set("chooseValue",arg.value);
            this.data.set("listsDisplay",false);
        }
    },
    initData: function(){
        return {
            datasOne: [],
            datasTwo: [],
            datasThree: [],
            chooseValue: "请选择",
            imgSrc: "icon.png",
            listsDisplay: false
        };
    },
    operateClick: function(){
        this.data.set("datasTwo",[]);
        this.data.set("datasThree",[]);
        this.data.set("listsDisplay",!this.data.get("listsDisplay"));
        // JavaScript Array 格式的 data
        var datas = [];
        for(var i=0;i<data.length;i++){
            datas[i] = {};
            datas[i].value = data[i].value;
            datas[i].label = data[i].label;
            datas[i].imgDis = 1;
            this.data.set("datasOne",datas);
        }
    },
    listsConClick: function(event){
        var event = event || window.event;
        var target = event.target;
        var flag = false;
        if(target.className == "list"){
            flag = true;
        }else if(target.parentNode.parentNode.className="list"){
            target = target.parentNode.parentNode;
            flag = true;
        }
        if(flag){
            target.style.color = "blue";
            var divs = target.parentNode.getElementsByClassName("list");
            for(var i=0;i<divs.length;i++){
                if(divs[i] != target){
                    divs[i].style.color = "black";
                }
            }
        }
    },
    operateTransition: {
        enter: function(el,done){
            var steps = 20;
            var currentStep = 0;
            function goStep(){
                if(currentStep > steps){
                    el.style.opacity = 1;
                }else{
                    el.style.opacity = currentStep / steps;
                    currentStep++;
                    requestAnimationFrame(goStep);
                }
            }
            goStep();
        },
        leave: function(el,done){
            var steps = 20;
            var currentStep = 0;
            function goStep(){
                if(currentStep > steps){
                    el.style.opacity = 0;
                }else{
                    el.style.opacity = 1 - currentStep / steps;
                    currentStep++;
                    requestAnimationFrame(goStep);
                }
            }
            goStep();
        }
    }
});

new cascadedComp().attach(document.body);