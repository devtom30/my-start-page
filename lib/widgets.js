Widgets = {
	collection : {},
	register : function(name, widget) {
		widget = $.extend(this.WidgetBase,widget);
		this.collection[name] = widget;
	},
	WidgetBase: {
		width_min : 0,
		width_max : 0,
		height_min : 0,
		height_max : 0,
		settings : [],
		data : {},
		widgetTemplate:'',
		settingsTemplate:'',
	},
	instanciate:function(widget_document){
		return $.extend(true,this.collection[widget_document.type],widget_document);
	}
};
