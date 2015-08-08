Template.backgroundConfig.helpers({
	currentSchema : function() {
		return new SimpleSchema({
			background : {
				type : String,
				label : "Background Image",
                optional:true,
				autoform : {
					afFieldInput : {
						type : "fileUpload",
						collection : 'Images',
                        accept: 'image/*'
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