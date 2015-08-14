Meteor.publish('user-dashboards', function () {
    return Dashboards.find({ownerid: this.userId});
});

Meteor.publish('dashboard', function (id) {
    return Dashboards.find({_id: id,public:true});
});

Meteor.publish('current_widgets', function (dashboard_id) {
    return Widgets_Collection.find({dashboard_id: dashboard_id});
});

Meteor.publish('user-images', function (dashboard_id) {
    //var img_ids = [];
    //img_list = Widgets_Collection.find({dashboard_id: dashboard_id}, {fields: Widgets.image_fields});
    //img_list.forEach(function (doc) {
    //    var id = _.descendantProp(Widgets_Collection.findOne({type: 'link'}), _.keys(Widgets.image_fields)[0]);
    //    if (id) {
    //        img_ids.push(id);
    //    }
    //});
    //var dashboard_bg = Dashboards.findOne({_id:dashboard_id});
    //if(dashboard_bg){
    //    img_ids.push(dashboard_bg.background);
    //}
    return Images.find({$or:[{dashboard_id:dashboard_id},{addedBy:this.userId}]});
});