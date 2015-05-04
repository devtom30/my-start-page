Template.backgroundConfig.helpers({
	currentSchema : function() {
		return new SimpleSchema({
			background : {
				type : String,
				label : "Background Image",
				autoform : {
					afFieldInput : {
						type : "fileUpload",
						collection : 'Images'
					}
				}
			}
		});
	},
	currentDocument : function() {
		return Dashboards.findOne(Session.get(CURRENT_DASHBOARD));
	}
});
Template.backgroundConfig.rendered = function() {
	$('#backgroundConfig').modal({
		show : false
	});
};