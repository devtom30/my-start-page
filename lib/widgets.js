Widgets = {
    collection: [],
    widgetsList: [],
    image_fields: {},
    register: function (name, widget) {
        widget = _.deepExtend(new this.WidgetBase(), widget);
        //Make sure the name is the same.
        widget.name = name;
        this.collection.push(widget);
        this.widgetsList.push(name);

        this.seekAndSaveImageKeys(widget.settings);
    },
    seekAndSaveImageKeys: function (settings) {

        _(settings).each(function (elem, index) {
            //autoform: {
            //    afFieldInput: {
            //        type: 'fileUpload',
            if (typeof elem.autoform !== 'undefined' && (
                (typeof elem.autoform.type !== 'undefined' && elem.autoform.type === 'fileUpload') || (typeof elem.autoform.afFieldInput !== 'undefined' && typeof elem.autoform.afFieldInput.type !== 'undefined' && elem.autoform.afFieldInput.type === 'fileUpload')
                )
            ) {
                this.image_fields['data.'+index]=1;
            }
        },this);
    },
    WidgetBase: function () {
        return {
            width_min: 1,
            width_max: 0,
            height_min: 1,
            height_max: 0,
            limit: 0,
            settings: {},
            data: {
                classes: ''
            },
            widgetTemplate: '',
            settingsTemplate: '',
            modify: function (change) {
                Widgets_Collection.update(this._id, {
                    $set: change
                });
            },
            getSettingsSchema: function () {
                if (!this.settingsSchema) {
                    var schema = {};
                    // Rebuild the schema by adding the data namespace of the widget document to prevent bad overwrites.
                    _.each(this.settings, function (value, key) {
                        schema['data.' + key] = value;
                    });
                    this.settingsSchema = new SimpleSchema(schema);
                }
                return this.settingsSchema;
            },
            settingsSchema: null,
            info: {
                name: 'Widget name - short details',
                description: 'Widget full details'
            },
            name: ''
        };
    },
    instanciate: function (widget_document) {
        if (this.widgetsList.indexOf(widget_document.type) >= 0) {
            return _.deepExtend({}, this.collection[this.widgetsList.indexOf(widget_document.type)],
                widget_document);
        } else {
            return _.deepExtend({}, this.WidgetBase, widget_document);
        }
    }
};

if (Meteor.isClient) {
    Widgets.modificationStartStop = function (active) {
        var $dashboard = $('#dashboard').find('li');
        if (active) {
            //Maybe they just got disabled... Juste reactivate them.
            $dashboard.filter('.ui-draggable').draggable('enable');
            $dashboard.filter('.ui-resizable').resizable('enable');

            //start dragging;
            var gridSize = 150;//140+2*5margin
            $dashboard.not('.ui-draggable,.ui-resizable').draggable({
                handle: '.dragHandle',
                grid: [gridSize, gridSize],
                drag: function (event, ui) {
                    if (ui.position.left === ui.helper.position().left && ui.position.top === ui.helper.position().top) {
                        return true;
                    }

                    ui.position.top = Math.max(5, ui.position.top);
                    ui.position.left = Math.max(5, Math.min(ui.helper.parent().width() - (ui.helper.parent().width() % gridSize) - gridSize + 5 - ui.helper.outerWidth() + 140, ui.position.left));


                    if (this.invalidPositions[ui.position.top] && this.invalidPositions[ui.position.top][ui.position.left]) {
                        ui.position = ui.helper.position();
                    }
                },
                start: function (event, ui) {
                    var invalidPositions = {};
                    //Calculate all positions taken by the other blocks.
                    ui.helper.siblings().each(function (k, elem) {
                        var $elem = $(elem);
                        for (var i = $elem.outerWidth() - 140; i >= 0; i = i - gridSize) {
                            for (var u = $elem.outerHeight() - 140; u >= 0; u = u - gridSize) {
                                if (!invalidPositions[$elem.position().top + u]) {
                                    invalidPositions[$elem.position().top + u] = {};
                                }
                                invalidPositions[$elem.position().top + u][$(elem).position().left + i] = true;
                            }
                        }
                    });
                    var invalidPositions2 = {};
                    //Using the positions of other block,
                    //Calculate the invalid positions according to current block's size.
                    for (var i = ui.helper.outerWidth() - 140; i >= 0; i = i - gridSize) {
                        for (var u = ui.helper.outerHeight() - 140; u >= 0; u = u - gridSize) {
                            $.each(invalidPositions, function (posTop, arr) {
                                $.each(arr, function (left) {
                                    if (!invalidPositions2[posTop - u]) {
                                        invalidPositions2[posTop - u] = {};
                                    }
                                    invalidPositions2[posTop - u][left - i] = true;
                                });
                            });
                        }
                    }
                    this.invalidPositions = _.deepExtend(invalidPositions, invalidPositions2);
                },
                stop: function (event, ui) {
                    var change = {};
                    change.row = ((ui.position.top - 5) / 150) + 1;
                    change.col = ((ui.position.left - 5) / 150) + 1;
                    Blaze.getData(this).modify(change);
                },
                stack: ('#dashboard li')
            }).resizable({
                helper: "ui-resizable-helper",
                grid: [gridSize, gridSize],
                start: function (event, ui) {
                    var max_height_at_width = {};
                    //Get max width possible.
                    var max_width = 12 * gridSize - 5 - ui.element.position().left;
                    ui.element.siblings().each(function (k, elem) {
                        var $elem = $(elem);
                        var width = $elem.position().left - ui.element.position().left - 10;
                        if (_.overlap([$elem.position().top, $elem.position().top + $elem.outerHeight()], ui.element.position().top) && max_width > width && width > 0) {
                            max_width = width;
                        }
                    });
                    for (var i = max_width; i >= 0; i = i - gridSize) {
                        max_height_at_width[i] = null;
                        ui.element.siblings().each(function (k, elem) {
                            var $elem = $(elem);
                            if (!_.overlap([$elem.position().left, $elem.position().left + $elem.outerWidth()], [ui.element.position().left, ui.element.position().left + i])) {
                                //The element is out of collision possibility.
                                return true;
                            } else {
                                if ((max_height_at_width[i] === null || max_height_at_width[i] > $elem.position().top - ui.element.position().top - 5) && $elem.position().top - ui.element.position().top - 5 > 0) {
                                    max_height_at_width[i] = $elem.position().top - ui.element.position().top - 5;
                                }
                            }
                        });
                    }
                    this.max_height_at_width = max_height_at_width;
                    //Calculate all max height possible for each possible widths.
                    console.log(max_height_at_width);
                    this.last_width = 140 + (Math.round((ui.size.width + 10) / gridSize) - 1) * 150;
                    this.last_height = ui.size.height = 140 + (Math.round((ui.size.height + 10) / gridSize) - 1) * 150;
                },
                resize: function (event, ui) {
                    ui.size.width = 140 + (Math.round((ui.size.width + 10) / gridSize) - 1) * 150;
                    ui.size.height = 140 + (Math.round((ui.size.height + 10) / gridSize) - 1) * 150;
                    if (typeof this.max_height_at_width[ui.size.width] == 'undefined' || (this.max_height_at_width[ui.size.width] < ui.size.height && this.max_height_at_width[ui.size.width] !== null)) {
                        ui.size.width = this.last_width;
                        ui.size.height = this.last_height;
                    } else {
                        this.last_width = ui.size.width;
                        this.last_height = ui.size.height;
                    }
                },
                stop: function (event, ui) {
                    var change = {};
                    ui.size.width = 140 + (Math.round((ui.size.width + 10) / gridSize) - 1) * 150;
                    ui.size.height = 140 + (Math.round((ui.size.height + 10) / gridSize) - 1) * 150;
                    ui.element.width(ui.size.width);
                    ui.element.height(ui.size.height);
                    change.height = Math.round((ui.size.height + 10) / gridSize);
                    change.width = Math.round((ui.size.width + 10) / gridSize);
                    Blaze.getData(this).modify(change);
                }
            });
        } else {
            //stop dragging;
            $dashboard.filter('.ui-draggable,.ui-resizable').draggable('disable').resizable('disable');
        }
    };
}