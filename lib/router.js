FlowRouter.route('/g/:gridId', {
    action: function(params, queryParams) {
        Session.set(CURRENT_DASHBOARD,params.gridId);
        Meteor.subscribe('dashboard',params.gridId);
    }
});
FlowRouter.route('/', {
    action: function(params, queryParams) {
        Session.set(CURRENT_DASHBOARD,false);
    }
});
if (Meteor.isServer) {
    FastRender.route('/g/:gridId?', function (params) {
        this.subscribe('dashboard',params.gridId);
    });
    FastRender.route('/', function () {
        if(Meteor.userId()){
            this.subscribe('user-dashboards',Dashboards.findOne({
                ownerid: Meteor.userId(), home: true
            })._id);
        }
    });
}