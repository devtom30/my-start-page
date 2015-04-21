CURRENT_CONFIGURED_WIDGET = 'current_configured_widget';
Session.setDefault(CURRENT_CONFIGURED_WIDGET, false);

Template.grid.rendered = function() {
};

Template.grid.helpers({
	widgets:function(){
		return Widgets_Collection.find({});
	},
	widgetsReady:function(){
		return current_dashboard.ready() && current_widgets.ready();
	}
});

Template.grid.events({
	'click .configure-btn':function(){
		Session.set('current_configured_widget',this._id);
		$('#widgetConfigModal').modal('show');
	}
});