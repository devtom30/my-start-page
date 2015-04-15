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
		
	}
});