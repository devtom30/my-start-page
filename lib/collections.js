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
	},
    insert:function(userId,doc){
        var owner = Dashboards.findOne(doc.dashboard_id).ownerid;
        return (owner!==null && owner===userId);
    }
});

Images = new FS.Collection('images',{stores:[new FS.Store.GridFS('images',{})]});
Images.allow({
    download: function(userId, fileObj) {

    },
    insert:function(userId, fileObj){
    	
    }
});