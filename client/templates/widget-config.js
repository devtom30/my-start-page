Template.widgetConfig.helpers({
    currentSchema: function () {
        if (!Session.get(CURRENT_CONFIGURED_WIDGET)) {
            return false;
        }
        var widget_doc = Widgets_Collection.findOne(Session.get(CURRENT_CONFIGURED_WIDGET));
        if (widget_doc) {
            return widget_doc.getSettingsSchema();
        }
    },
    currentDocument: function () {
        return Widgets_Collection.findOne(Session.get(CURRENT_CONFIGURED_WIDGET));
    }
});
Template.widgetConfig.rendered = function () {
    $('#widgetConfigModal').modal({show: false});
};
Template.widgetConfig.events({
    'click #delete-button': function () {
        if (window.confirm('Premanently delete the widget? This cannot be undone.')) {
            $('#widgetConfigModal').modal('hide');
            Widgets_Collection.remove(this._id);
        }
    }
})