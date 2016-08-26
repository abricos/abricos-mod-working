var Component = new Brick.Component();
Component.requires = {
    mod: [
        {name: '{C#MODNAME}', files: ['lib.js']}
    ]
};
Component.entryPoint = function(NS){

    var Y = Brick.YUI,
        COMPONENT = this,
        SYS = Brick.mod.sys;

    NS.TeamListWidget = Y.Base.create('teamListWidget', SYS.AppWidget, [], {
        onInitAppWidget: function(err, appInstance, options){
            this.reloadTeamList();
        },
        destructor: function(){
        },
        reloadTeamList: function(){
            this.set('waiting', true);

            var appInstance = this.get('appInstance');
            appInstance.set('teamList', null);
            appInstance.teamList(function(err, result){
                this.set('waiting', false);
                if (!err){
                    this.renderTeamList();
                }
            }, this);
        },
        renderTeamList: function(){
            var teamList = this.get('appInstance').get('teamList');
            if (!teamList){
                return;
            }

            var tp = this.template,
                lst = "";

            teamList.each(function(team){
                var attrs = team.toJSON();
                lst += tp.replace('row', [
                    attrs, {
                        date: Brick.dateExt.convert(attrs.dateline),
                    }
                ]);
            });
            tp.gel('list').innerHTML = tp.replace('list', {
                'rows': lst
            });
            this.appURLUpdate();
        }
    }, {
        ATTRS: {
            component: {value: COMPONENT},
            templateBlockName: {value: 'widget,list,row'}
        },
        CLICKS: {
        }
    });

};