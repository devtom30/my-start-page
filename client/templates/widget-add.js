Template.widgetAdd.helpers({
    widgets: function () {
        return Widgets.collection;
    }
});
Template.widgetAdd.rendered = function () {
    $('#widgetAddModal').modal({show: false});
};
var test_collision = function (widget) {
    var collisionDetected = false;
    Widgets_Collection.find({
        dashboard_id: widget.dashboard_id
    }).forEach(function () {
        if (_.overlap([widget.col, widget.col + widget.width], [this.col, this.col + this.width]) || _.overlap([widget.row, widget.row + widget.height], [this.row, this.row + this.height])) {
            collisionDetected = true;
        }
    });
    return collisionDetected;
}
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
            if (newWidget.col > 30 - newWidget.width) {
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