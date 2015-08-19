Widgets.register('clock', {
    info: {
        name: 'Simple clock',
        description: 'This widget displays a clock showing the current time.'
    },
    settings: {
        titre: {
            type: String,
            label: 'Title',
            max: 400
        },
        bgColor: {
            type: String,
            label: 'Background Color',
            optional: true,
            autoform: {
                type: 'bootstrap-colorpicker',
                colorPickerOptions: {
                    format: 'rgba'
                }
            }
        },
        clockColor: {
            type: String,
            label: 'Background Color',
            optional: true,
            autoform: {
                type: 'bootstrap-colorpicker',
                colorPickerOptions: {
                    format: 'rgba'
                }
            }
        }
    },
    data: {
        titre:'',
        bgColor: 'rgba(255,255,255,0.9)',
        clockColor: 'rgba(0,0,0,1)'
    },
    widgetTemplate: 'widgetClock'
});
if(Meteor.isClient){
    Template.widgetClock.rendered = function () {
        var sec = Template.instance().find('.sec');
        var min = Template.instance().find('.min');
        var hour = Template.instance().find('.hour');
        var r = function (el, deg) {
            el.setAttribute('transform', 'rotate('+ deg +' 50 50)')
        };
        var clock = function() {
            var d = new Date();
            r(sec, 6*d.getSeconds());
            r(min, 6*d.getMinutes());
            r(hour, 30*(d.getHours()%12) + d.getMinutes()/2);
        };
        clock();
        Template.instance().interval =  setInterval(clock, 1000);

    };
    Template.widgetClock.onDestroyed = function(){
        clearInterval(Template.instance().interval);
    };
    Template.widgetClock.helpers({
        'style': function () {
            return {style:'fill:'+this.data.clockColor};
        },
        bgColor:function(){
            return this.data.bgColor;
        }
    });
}