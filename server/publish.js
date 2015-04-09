Meteor.publish("dashboard", function () {
  return Dashboards.find({$or:[{ownerid: this.userId},{ownerid: null}]});
});