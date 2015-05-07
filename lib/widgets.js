Widgets = {
	collection : [],
	widgetsList:[],
	register : function(name, widget) {
		widget = _.deepExtend(new this.WidgetBase(), widget);
		//Make sure the name is the same.
		widget.name = name;
		this.collection.push(widget);
		this.widgetsList.push(name);
	},
	WidgetBase : function() {
		return {
			width_min : 1,
			width_max : 0,
			height_min : 1,
			height_max : 0,
			settings : {},
			data : {
				classes:''
			},
			widgetTemplate : '',
			settingsTemplate : '',
			modify : function(change) {
				Widgets_Collection.update(this._id, {
					$set : change
				});
			},
			getSettingsSchema : function() {
				if (!this.settingsSchema) {
					var schema = {};
					// Rebuild the schema by adding the data namespace of the widget document to prevent bad overwrites.
					_.each(this.settings,function(value,key){
						schema['data.'+key] = value;
					});
					this.settingsSchema = new SimpleSchema(schema);
				}
				return this.settingsSchema;
			},
			settingsSchema : null,
			info:{
				name:'Widget name - short details',
				description:'Widget full details'
			},
			name:''
		};
	},
	instanciate : function(widget_document) {
		if (this.widgetsList.indexOf(widget_document.type)>=0) {
			return _.deepExtend({}, this.collection[this.widgetsList.indexOf(widget_document.type)],
					widget_document);
		} else {
			return _.deepExtend({}, this.WidgetBase, widget_document);
		}
	}
};
