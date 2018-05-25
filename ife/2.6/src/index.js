import san from 'san';

var taskMenu = san.defineComponent({
  template: '<div title="{= title =}" class="class">'
    + '<slot name="title"></slot><slot></slot>{{ title }}'
    + '</div>',
  initData: function(){
    return {
      "title":""
    }
  }
});

var taskItem = san.defineComponent({
  template: '<table><tr s-for="task in tasks">'
     + '<td s-for="col in columns">'
     + '<slot name="col-{{col.name}}" var-task="task" var-col="col">'
     + '{{col.label}}{{task[col.name]}}</slot>'
     + '</td>'
     + '</tr></table>',
});

var app = san.defineComponent({
  components: {
    "task-menu":taskMenu,
    "task-item":taskItem
  },
  template: '<div class="container">'
     + '<task-menu title="{{tasktitle}}" class="menu">'
     + '</task-menu>'
     + '<task-item tasks="{{tasks}}" columns="{{columns}}" s-ref="task">'
     + '<b slot="col-title">{{col.label}}{{task.title}}</b>'
     + '</task-item>'
     + '</div>',

  initData: function(){
    return {
      "tasktitle":"任务栏",
      "columns": [
          {name:"index",label:""},
          {name:"title",label:"标题:"},
          {name:"content",label:"内容:"},
          {name:"time",label:"时间:"}
      ],
      "tasks": [
          {index:"任务一",title:"插槽",content:"111",time:"2018-1"},
          {index:"任务二",title:"插槽",content:"222",time:"2018-1"},
          {index:"任务三",title:"插槽",content:"333",time:"2018-1"},
          {index:"任务四",title:"插槽",content:"444",time:"2018-1"},
          {index:"任务五",title:"插槽",content:"555",time:"2018-1"},
          {index:"任务六",title:"插槽",content:"666",time:"2018-1"}
      ]
    }
  },

  attached: function(){
    var slots = this.ref("task").slot();
  }
});

var myApp = new app();
myApp.attach(document.body);