Template.widgetConfig.helpers({
	currentSchema:function(){
		if(!Session.get(CURRENT_CONFIGURED_WIDGET)){
			return false;
		}
		return Widgets_Collection.findOne(Session.get(CURRENT_CONFIGURED_WIDGET)).getSettingsSchema();
	},
	currentDocument:function(){
		return Widgets_Collection.findOne(Session.get(CURRENT_CONFIGURED_WIDGET));
	}
});