IN_MODIFICATION_STATE = 'started_modifications';
Session.setDefault(IN_MODIFICATION_STATE, false);

CURRENT_DASHBOARD = 'dashboard_displayed';
Template.appBody.helpers({
    gridname: function () {
        var dashboard = Dashboards.findOne(Session.get(CURRENT_DASHBOARD));
        if(!dashboard){
           return 'Select a grid';
        }
        return dashboard.name;
    },
    user_dashboards: function () {
        return Dashboards.find({ownerid: Meteor.userId()});
    },
    dashboard_public: function () {
        if (Dashboards.find(Session.get(CURRENT_DASHBOARD)).count() > 0) {
            return Dashboards.find(Session.get(CURRENT_DASHBOARD)).fetch()[0].public == 1;
        }
    },
    gridlist_attr: function () {
        if (Meteor.userId()) {
            return {class: "dropdown"};
        }
        return {};
    },
    gridname_attr: function () {
        if (Meteor.userId()) {
            return {
                'class': "dropdown-toggle navbar-text",
                'data-toggle': "dropdown",
                'role': "button",
                'aria-haspopup': "true",
                'aria-expanded': "false"
            }
        } else {
            return {
                'class': "navbar-text"
            }
        }
    },
    dashboard_view:function(){
        return Session.get(CURRENT_DASHBOARD)!==false;
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
        var $modal = $('#widgetAddModal');
        $modal.find('[data-toggle="tooltip"]').tooltip();
        $modal.modal('show');
    },
    'click #toggle_share': function () {
        var $modal = $('#shareToggleModal');
        $modal.modal('show');
    }
});

Template.registerHelper('in_modification_state', function () {
    return Session.get(IN_MODIFICATION_STATE);
});
Template.registerHelper('momentFromNow', function (time) {
    return moment(time).fromNow();
});
Template.registerHelper('formattedDate', function (time) {
    return moment(time).format('LLLL');
});
Template.registerHelper('absoluteUrl',function(path){
    return Meteor.absoluteUrl(path);
});