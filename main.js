if (Meteor.isClient) {

    Tracker.autorun(function(){
        dashboards = Meteor.subscribe('dashboards', function () {
            if (Meteor.userId() && !Session.get(CURRENT_DASHBOARD)) {
                Session.set(CURRENT_DASHBOARD, Dashboards.findOne({
                    ownerid: Meteor.userId()
                })._id);
            }
        });
        current_widgets =  Meteor.subscribe('current_widgets', Session.get(CURRENT_DASHBOARD));
    })

    images = Meteor.subscribe('user-images', function () {

    });
    Template.body.rendered = function () {
        Tracker.autorun(function () {
            var dashboard = Dashboards.find({_id: Session.get(CURRENT_DASHBOARD)}).fetch();
            if (dashboard[0] && Images.find().count() > 0 && Images.findOne(dashboard[0].background)) {
                $('body').css('background-image', 'url(' + Images.findOne(dashboard[0].background).url() + ')');
            } else {
                $('body').css('background-image', '');
            }
        });
    };
}

