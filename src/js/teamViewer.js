var Component = new Brick.Component();
Component.requires = {
    mod: [
        {name: 'team', files: ['teamViewer.js']},
        {name: '{C#MODNAME}', files: ['lib.js']}
    ]
};
Component.entryPoint = function(NS){
    var Y = Brick.YUI,
        COMPONENT = this,
        SYS = Brick.mod.sys,
        NSTeam = Brick.mod.team;

    NS.TeamViewerWidget = Y.Base.create('TeamViewerWidget', SYS.AppWidget, [], {
        onInitAppWidget: function(err, appInstance){
            var teamApp = appInstance.getApp('team'),
                teamid = this.get('teamid'),
                tp = this.template;

            teamApp.team(teamid, function(err, result){
                if (err){
                    return;
                }
                var team = result.team;

                this.set('team', team);
                tp.setHTML(team.toJSON(true));
            }, this);
        },
        destructor: function(){
        },
    }, {
        ATTRS: {
            component: {value: COMPONENT},
            templateBlockName: {value: 'widget'},
            teamid: {value: 0},
            team: {value: null}
        },
        CLICKS: {},
        parseURLParam: function(args){
            return {
                teamid: args[0] | 0
            };
        }
    });

};