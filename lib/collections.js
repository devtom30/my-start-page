Dashboards = new Mongo.Collection('dashboards');

Widgets_Collection = new Mongo.Collection('widgets', {
	transform : function(doc) {
		doc = Widgets.instanciate(doc);
		return doc;
	}
});
Widgets_Collection.allow({
	update:function(userId,doc){
        var owner = Dashboards.findOne(doc.dashboard_id).ownerid;
        return (owner!==null && owner===userId);
	},
    insert:function(userId,doc){
        console.log(doc);
        var curDashboard = Dashboards.findOne(doc.dashboard_id);
        if(curDashboard){
            var owner = curDashboard.ownerid;
        }
        return (owner!==null && owner===userId);
    },
    remove:function(userId,doc){
        var owner = Dashboards.findOne(doc.dashboard_id).ownerid;
        return (owner!==null && owner===userId);
    }
});

Images = new FS.Collection('images',{stores:[new FS.Store.GridFS('images',{})]});
Images.allow({
    download: function(userId, fileObj) {
        return Dashboards.find({background:fileObj._id}).count()>0 || Widgets_Collection.find({'data.background':fileObj._id}).count()>0;
    },
    insert:function(userId, fileObj){
    	
    }
});