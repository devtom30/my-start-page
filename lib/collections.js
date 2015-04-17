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
// // Calculate a default name for a list in the form of 'List A'
// Dashboards.defaultName = function() {
// var nextNumber = 1;
// while (Dashboards.findOne({name : nextNumber})) {
// nextNumber = nextNumber + 1;
// }
// return nextNumber;
// };
