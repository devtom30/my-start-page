if (Meteor.isClient) {
    Tracker.autorun(function () {
        dashboards = Meteor.subscribe('user-dashboards');
        if (Meteor.userId() && !Session.get(CURRENT_DASHBOARD) && Dashboards.find({}).count() > 0) {
            var home_dashboard = Dashboards.findOne({
                ownerid: Meteor.userId(), home: true
            });
            if (!home_dashboard) {
                home_dashboard = Dashboards.findOne({
                    ownerid: Meteor.userId()
                });
                Dashboards.update(home_dashboard._id, {
                    $set: {home: 1}
                });
            }
            Session.set(CURRENT_DASHBOARD, home_dashboard._id);
        }
        current_widgets = Meteor.subscribe('current_widgets', Session.get(CURRENT_DASHBOARD));
        images = Meteor.subscribe('user-images', Session.get(CURRENT_DASHBOARD));
        if (!Meteor.userId()) {
            current_widgets.stop();
            images.stop();
        }
    });

    Tracker.autorun(function(){
        if(Session.get(CURRENT_DASHBOARD)){
            FlowRouter.go('/g/'+Session.get(CURRENT_DASHBOARD));
            dashboard = Dashboards.findOne(Session.get(CURRENT_DASHBOARD));
            if(dashboard && dashboard.ownerid != Meteor.userId()){
                Session.set(IN_MODIFICATION_STATE,false);
            }
        }
    });

    Template.body.rendered = function () {
        Tracker.autorun(function () {
            var dashboard = Dashboards.find({_id: Session.get(CURRENT_DASHBOARD)}).fetch();
            if (dashboard[0]) {
                if (Images.find().count() > 0 && Images.findOne(dashboard[0].background)) {
                    $('body').css('background-image', 'url(' + Images.findOne(dashboard[0].background).url() + ')');
                } else {
                    $('body').css('background-image', '');
                }
            } else {

            }
        });
    };
}

if (Meteor.isServer) {
    FastRender.route('/', function () {
        if(Meteor.userId()){
            this.subscribe('user-dashboards',Dashboards.findOne({
                ownerid: Meteor.userId(), home: true
            })._id);
        }
    });
}