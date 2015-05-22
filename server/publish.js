Meteor.publish('dashboards', function () {
  return Dashboards.find({$or:[{ownerid: this.userId},{ownerid: null}]});
});


Meteor.publish('current_widgets', function (dashboard_id) {
    return Widgets_Collection.find({dashboard_id: dashboard_id});
});

