Template.widgetAdd.helpers({
	widgets:function(){
		return Widgets.collection;
	}
});
Template.widgetAdd.rendered = function(){
	$('#widgetAddModal').modal({show:false});
};