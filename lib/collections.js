Dashboards = new Mongo.Collection('dashboards');
Dashboards.allow({
        update:function(userId,doc){
            var owner = Dashboards.findOne(doc._id).ownerid;
            return (owner!==null && owner===userId);
        }
    }
);

Dashboards.after.update(function (userId, doc, fieldNames, modifier, options) {
    if(doc.background !== this.previous.background){
        Images.remove(this.previous.background);
    }
    Images.update(doc.background,{$set:{dashboard_id:doc._id}});
}, {fetchPrevious: true});

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
Widgets_Collection.after.update(function (userId, doc, fieldNames, modifier, options) {
    _(_.keys(Widgets.image_fields)).each(function(key){
        if(_.descendantProp(doc,key)){
            if(_.descendantProp(doc,key) !== _.descendantProp(this.previous,key)){
                Images.remove(_.descendantProp(this.previous,key));
            }
            Images.update(_.descendantProp(doc,key),{$set:{dashboard_id:doc.dashboard_id,widget_id:doc._id}});
        }
    });
}, {fetchPrevious: true});

Images = new FS.Collection('images',{stores:[new FS.Store.GridFS('images',{})]});
Images.allow({
    download: function(userId, fileObj) {
        return Dashboards.find({background:fileObj._id}).count()>0 || Widgets_Collection.find({'data.background':fileObj._id}).count()>0;
    },
    update:function(userId, fileObj) {
        return true;
        return Dashboards.find({background:fileObj._id}).count()>0 || Widgets_Collection.find({'data.background':fileObj._id}).count()>0;
    },
    insert:function(userId, fileObj){
    	return (userId);
    },
    remove:function(userId,fileObj){
        return true;
    }
});

//Images.before.insert(function(userId,doc){
//    doc.addedBy = userId;
//    return doc;
//});