CURRENT_CONFIGURED_WIDGET = 'current_configured_widget';
Session.setDefault(CURRENT_CONFIGURED_WIDGET, false);

Template.grid.rendered = function() {
    Tracker.autorun(function () {
        //Using count triggers re-computation when adding a new widget.
        Widgets_Collection.find({}).count();
        Widgets.modificationStartStop(Session.get(IN_MODIFICATION_STATE));
    });
};
Template.grid.helpers({
	widgets:function(){
		return Widgets_Collection.find({});
	},
	widgetsReady:function(){
		return dashboards.ready() && current_widgets.ready();
	}
});

Template.grid.events({
	'click .configure-btn':function(){
		Session.set('current_configured_widget',this._id);
		$('#widgetConfigModal').modal('show');
	}
});