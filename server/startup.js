Meteor.startup(function() {
//	Dashboards.remove({});
//	Widgets_Collection.remove({});
	if (Dashboards.find().count() === 0) {
		
		var dashboardID = Dashboards.insert({
			ownerid : null,
			widgets : []
		});

		[ {
			row : 1,
			col : 1,
			width : 1,
			height : 1,
			type : "link"
		}
//		, {
//			row : 2,
//			col : 2,
//			width : 1,
//			height : 1
//		}, {
//			row : 3,
//			col : 3,
//			width : 1,
//			height : 1
//		}, {
//			row : 3,
//			col : 4,
//			width : 1,
//			height : 1
//		}, {
//			row : 3,
//			col : 5,
//			width : 1,
//			height : 1
//		}, {
//			row : 3,
//			col : 6,
//			width : 1,
//			height : 1
//		}, {
//			row : 3,
//			col : 7,
//			width : 1,
//			height : 1
//		}, {
//			row : 1,
//			col : 5,
//			width : 1,
//			height : 1
//		}, {
//			row : 1,
//			col : 4,
//			width : 1,
//			height : 2
//		}, {
//			row : 4,
//			col : 1,
//			width : 7,
//			height : 1
//		}, {
//			row : 5,
//			col : 4,
//			width : 3,
//			height : 3
//		}
		].forEach(function(w){
			w.dashboard_id = dashboardID;
			widget_id = Widgets_Collection.insert(w);
			Dashboards.update({_id:dashboardID},{$push:{widgets:widget_id}});
		});
	}
});