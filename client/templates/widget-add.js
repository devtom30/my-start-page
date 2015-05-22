Template.widgetAdd.helpers({
    widgets: function () {
        return Widgets.collection;
    }
});

Template.widgetItem.helpers({
    disabled:function(widget){
        if(widget.limit>0){
            return  Widgets_Collection.find({dashboard_id:Session.get(CURRENT_DASHBOARD),type:widget.name}).count()>=widget.limit?'disabled':'';
        }else{
            return '';
        }
    }
})

Template.widgetAdd.rendered = function () {
    $('#widgetAddModal').modal({show: false});
};
var test_collision = function (widget) {
    var collisionDetected = false;
    if(widget.col==11 && widget.row==5){
        alert('test');
    }
    Widgets_Collection.find({
        dashboard_id: widget.dashboard_id
    }).forEach(function (target) {
        if (_.overlap([widget.col, widget.col + widget.width-1], [target.col, target.col + target.width-1]) && _.overlap([widget.row, widget.row + widget.height-1], [target.row, target.row + target.height-1])) {
            collisionDetected = true;
        }
    });
    return collisionDetected;
};
Template.widgetAdd.events({
    'click .addBtn': function () {
        var newWidget = {
            row: 1,
            col: 1,
            width: this.widget.width_min,
            height: this.widget.height_min,
            type: this.widget.name,
            dashboard_id:Session.get(CURRENT_DASHBOARD)
        };
        var noValidPosition = false;
        while (test_collision(newWidget) && !noValidPosition) {
            newWidget.col++;
            if (newWidget.col > 12 - newWidget.width+1) {
                newWidget.col = 1;
                newWidget.row++;
            }
            if(newWidget.row>30 - newWidget.height){
                noValidPosition=true;
            }
        }
        if(!noValidPosition){
            Widgets_Collection.insert(newWidget);
        }
    }
});