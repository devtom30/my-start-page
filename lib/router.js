var old_subscription = false;
FlowRouter.route('/g/:gridId', {
    action: function(params) {
        Session.set(CURRENT_DASHBOARD,params.gridId);

        if(old_subscription){
            old_subscription.stop();
        }
        console.log("yey");
        if(!Dashboards.findOne(params.gridId)){
            old_subscription =  Meteor.subscribe('dashboard',params.gridId, {
                onReady: function () {
                    //If the asked grid does not exist or the user does not have the right to see it, just go to the home for now.
                    FlowRouter.go('/');
                },
                onError: function () {
                    //If the asked grid does not exist or the user does not have the right to see it, just go to the home for now.
                    FlowRouter.go('/');
                }
            });
        }
    }
});
FlowRouter.route('/', {
    action: function() {
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