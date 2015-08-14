FlowRouter.route('/g/:gridId', {
    action: function(params, queryParams) {
        Session.set(CURRENT_DASHBOARD,params.gridId);
    }
});