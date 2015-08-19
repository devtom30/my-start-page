FlowRouter.route('/g/:gridId', {
    action: function(params, queryParams) {
        Session.set(CURRENT_DASHBOARD,params.gridId);
        Meteor.subscribe('dashboard',params.gridId);
    }
});
FlowRouter.route('/', {
    action: function(params, queryParams) {

    }
});