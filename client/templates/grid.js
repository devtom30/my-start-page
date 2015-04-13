Template.grid.rendered = function() {
	console.log('grid-rendered');
//	$(".gridster ul").gridster({
//		widget_margins : [ 5, 5 ],
//		widget_base_dimensions : [ 140, 140 ],
//		resize : {
//			enabled : true
//		},
//		max_cols: 7
//	});
};

Template.grid.helpers({
	widgets:function(){
		return Widgets_Collection.find({});
	},
	widgetsReady:function(){
		return current_dashboard.ready() && current_widgets.ready();
	}
});