if (Meteor.isClient) {
    dashboards = Meteor.subscribe('dashboards', function () {
        if (Meteor.userId() && !Session.get(CURRENT_DASHBOARD)) {
            Session.set(CURRENT_DASHBOARD, Dashboards.findOne({
                ownerid: Meteor.userId()
            })._id);
        }
    });
    current_widgets = Meteor.subscribe('current_widgets');

    Tracker.autorun(function () {
        var dashboard = Dashboards.findOne(Session.get(CURRENT_DASHBOARD));
        if (dashboard && Images.findOne(dashboard.background)) {
            $('body').css('background-image', 'url(' + Images.findOne(dashboard.background).url() + ')');
        } else {
            $('body').css('background-image', '');
        }
    });
}