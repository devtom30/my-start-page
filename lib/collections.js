var getImageFields = function(id){
    var image_fields = [];
    _(_.keys(Widgets.image_fields)).each(function(key){
        var o = {};
        o[key] = id;
        image_fields.push(o);
    });
    return image_fields;
};

//Ground.Collection(Meteor.users);

Dashboards = new Meteor.Collection('dashboards');
Ground.Collection(Dashboards, {
    cleanupLocalData: false
});
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

Widgets_Collection = new Meteor.Collection('widgets', {
	transform : function(doc) {
		doc = Widgets.instanciate(doc);
		return doc;
	}
});
Ground.Collection(Widgets_Collection, {
    cleanupLocalData: false
});
Widgets_Collection.allow({
	update:function(userId,doc){
        var owner = Dashboards.findOne(doc.dashboard_id).ownerid;
        return (owner!==null && owner===userId);
	},
    insert:function(userId,doc){
        var curDashboard = Dashboards.findOne(doc.dashboard_id);
        var owner = null;
        if(curDashboard){
            owner = curDashboard.ownerid;
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
        var image_fields = getImageFields(fileObj._id);
        return Dashboards.find({ownerid:{$in:[userId,null]},background:fileObj._id}).count()>0 || Widgets_Collection.find({$or:image_fields,ownerid:{$in:[userId,null]}}).count()>0;
    },
    update:function(userId, fileObj) {
        return true;
        return Dashboards.find({background:fileObj._id}).count()>0 || Widgets_Collection.find({$or:image_fields}).count()>0;
    },
    insert:function(userId, fileObj){
    	return (userId);
    },
    remove:function(userId,fileObj){
        var image_fields = getImageFields(fileObj._id);
        return Dashboards.find({ownerid:userId,background:fileObj._id}).count()>0 || Widgets_Collection.find({ownerid:userId,$or:image_fields}).count()>0;
    }
});

//Images.before.insert(function(userId,doc){
//    doc.addedBy = userId;
//    return doc;
//});