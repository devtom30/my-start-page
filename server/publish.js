Meteor.publish("dashboards", function () {
  return Dashboards.find({$or:[{ownerid: this.userId},{ownerid: null}]});
});

Meteor.publish("current_widgets", function () {
	return Widgets_Collection.find({$or:[{ownerid: this.userId},{ownerid: null}]});
});