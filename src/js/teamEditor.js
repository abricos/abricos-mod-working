var Component = new Brick.Component();
Component.requires = {
    mod: [
        {name: 'team', files: ['teamEditor.js']},
        {name: '{C#MODNAME}', files: ['lib.js']}
    ]
};
Component.entryPoint = function(NS){

    var Y = Brick.YUI,
        COMPONENT = this,
        SYS = Brick.mod.sys;

    var NSTeam = Brick.mod.team;

    NS.TeamEditorWidget = Y.Base.create('TeamEditorWidget', SYS.AppWidget, [
        SYS.WidgetEditorStatus
    ], {
        onInitAppWidget: function(err, appInstance){
            var tp = this.template;

            this.teamEditorFormWidget = new NSTeam.TeamEditorFormWidget({
                srcNode: tp.one('teamEditorFormWidget')
            });
        },
        save: function(){
            var app = this.get('appInstance'),
                data = this.teamEditorFormWidget.toJSON();

            data.id = this.get('teamid');

            this.set('waiting', true);
            app.teamSave(data, function(err, result){
                this.set('waiting', false);
            }, this);
        }
    }, {
        ATTRS: {
            component: {value: COMPONENT},
            templateBlockName: {value: 'widget'},
            teamid: {value: 0},
            isEdit: {
                getter: function(){
                    return (this.get('teamid') | 0) > 0;
                }
            }
        },
        CLICKS: {
            save: 'save',
        },
        parseURLParam: function(args){
            return {
                teamid: args[0] | 0
            };
        }
    });

};

