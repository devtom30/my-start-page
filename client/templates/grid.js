Template.grid.rendered = function() {
	$(".gridster ul").gridster({
		widget_margins : [ 5, 5 ],
		widget_base_dimensions : [ 140, 140 ],
		resize : {
			enabled : true
		},
		max_cols: 7
	});
};

Template.grid.helpers({
	widgets:function(){
		return Dashboards.findOne();
	}
});