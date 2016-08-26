var Component = new Brick.Component();
Component.requires = {
    mod: [
        {name: 'team', files: ['teamList.js']},
        {name: '{C#MODNAME}', files: ['lib.js']}
    ]
};
Component.entryPoint = function(NS){

    var Y = Brick.YUI,
        COMPONENT = this,
        SYS = Brick.mod.sys,
        NSTeam = Brick.mod.team;

    NS.TeamRowWidget = Y.Base.create('TeamRowWidget', SYS.AppWidget, [
        NSTeam.TeamRowWidgetExt
    ], {

    }, {
        ATTRS: {
            component: {value: COMPONENT},
            templateBlockName: {value: 'item'},
        },
    });

    NS.TeamListWidget = Y.Base.create('teamListWidget', SYS.AppWidget, [], {
        onInitAppWidget: function(err, appInstance, options){
            var tp = this.template;
            this._teamListWidget = new NSTeam.TeamListWidget({
                srcNode: tp.one('teamList'),
                ownerModule: '{C#MODNAME}'
            });
        },
        destructor: function(){
            if (this._teamListWidget){
                this._teamListWidget.destroy();
            }
        },
    }, {
        ATTRS: {
            component: {value: COMPONENT},
            templateBlockName: {value: 'widget'},
        },
        CLICKS: {}
    });

};