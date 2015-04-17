Widgets = {
	collection : {},
	register : function(name, widget) {
		widget = _.deepExtend(new this.WidgetBase(),widget);
		this.collection[name] = widget;
	},
	WidgetBase: function(){return {
		width_min : 0,
		width_max : 0,
		height_min : 0,
		height_max : 0,
		settings : {},
		data : {},
		widgetTemplate:'',
		settingsTemplate:'',
		modify:function(change){
			Widgets_Collection.update(this._id,{$set:change},function(a,b){
				console.dir(a);
				console.dir(b);
				console.dir(change);
			});
		}}
	},
	instanciate:function(widget_document){
		if(this.collection[widget_document.type]){
			return _.deepExtend({},this.collection[widget_document.type],widget_document);
		}else{
			return _.deepExtend({},this.WidgetBase,widget_document);
		}
	},
};