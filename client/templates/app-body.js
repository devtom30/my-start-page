IN_MODIFICATION_STATE = 'started_modifications';
Session.setDefault(IN_MODIFICATION_STATE, false);

CURRENT_DASHBOARD = 'dashboard_displayed';
Session.setDefault(CURRENT_DASHBOARD, false);
Template.appBody.helpers({
    dashboard: function () {
        return Dashboards.findOne(Session.get(CURRENT_DASHBOARD));
    }
});
Template.appBody.events({
    'click #modification_toggle': function () {
        Session.set(IN_MODIFICATION_STATE, !Session.get(IN_MODIFICATION_STATE));
    },
    'click #change_background': function () {
        $('#backgroundConfigModal').modal('show');
    },
    'click #add_widget': function () {
        $('#widgetAddModal').modal('show');
    }
});

Template.registerHelper('in_modification_state', function () {
    return Session.get(IN_MODIFICATION_STATE);
});