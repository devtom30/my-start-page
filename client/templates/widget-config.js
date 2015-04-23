Template.widgetConfig.helpers({
	currentSchema:function(){
		if(!Session.get(CURRENT_CONFIGURED_WIDGET)){
			return false;
		}
		var widget_doc = Widgets_Collection.findOne(Session.get(CURRENT_CONFIGURED_WIDGET));
		if(widget_doc){
			return widget_doc.getSettingsSchema();
		}
	},
	currentDocument:function(){
		return Widgets_Collection.findOne(Session.get(CURRENT_CONFIGURED_WIDGET));
	}
});
Template.widgetConfig.rendered = function(){
	$('#widgetConfigModal').modal({show:false});
};