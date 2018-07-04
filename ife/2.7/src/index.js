
var list = san.defineComponent({
    template:`
        <div id="con">
          <button id="but" on-click="toggle">TOGGLE</button>
          <div id="div1" s-if="show" s-transition="hook">
            {{value1}}
          </div>
          <div id="div2" s-else s-transition="hook">
            {{value2}}
          </div>
        </div>
    `,
    toggle: function () {
        this.data.set("show",!this.data.get('show'));
    },
    initData: function () {
        return {
            show: true,
            value1: "Everyone can AI",
            value2: "Baidu Create 2018",
            transition: ""
        };
    },
    hook: {
        enter: function (el, done) {
            var steps = 30;
            var currentStep = 0;
            var width = el.offsetWidth;

            function goStep() {
                if (currentStep >= steps) {
                    el.style.width = width;
                    done();
                    return;
                }
                el.style.width = (width / steps * currentStep++) + "px";
                requestAnimationFrame(goStep);
            }
            goStep();
        },

        leave: function (el, done) {
            var steps = 30;
            var currentStep = 0;
            var width = el.offsetWidth;

            function goStep() {
                if (currentStep >= steps) {
                    el.style.width = 0;
                    done();
                    return;
                }
                el.style.width = (width - width / steps * currentStep++) + "px";
                requestAnimationFrame(goStep);
            }
            goStep();
        }
    }
});

var app = san.defineComponent({
    template: `
        <div id="container">
            <list></list>
            <list></list>
            <list></list>
            <list value1="用科技让复杂的世界更简单" value2="百度AI"></list>
            <list value1="让人们更平等便捷地获取AI" value2="百度AI"></list>
        </div>
    `,
    components: {
        'list' : list
    },
    
});
var myApp = new app();
myApp.attach(document.body);