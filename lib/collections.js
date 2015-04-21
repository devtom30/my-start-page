Dashboards = new Mongo.Collection('dashboards');

Widgets_Collection = new Mongo.Collection('widgets', {
	transform : function(doc) {
		doc = Widgets.instanciate(doc);
		return doc;
	}
});
Widgets_Collection.allow({
	update:function(){
		return true;
	}
});