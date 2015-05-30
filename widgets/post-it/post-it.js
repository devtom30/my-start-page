Widgets.register('post-it', {
    info: {
        name: 'Post It',
        description: 'This is a simple post it. Add it to your dashboard and never forget anything anymore.'
    },
    settings: {
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
        fontColor: {
            type: String,
            label: 'Text Color',
            optional: true,
            autoform: {
                type: 'bootstrap-colorpicker',
                colorPickerOptions: {
                    format: 'rgb'
                }
            }
        }
    },
    data: {
        bgColor: 'rgba(255,255,255,0.9)',
        fontColor: 'rgb(0,0,0,1)'
    },
    widgetTemplate: 'widgetPostIt',
    display_text:''
});
if(Meteor.isClient){
    Template.widgetPostIt.helpers({
        'attributes': function () {
            var attributes = {};
            attributes.style = '';
            if (this.data.bgColor !== '') {
                attributes.style += 'background-color:' + this.data.bgColor + ';';
            }
            if (this.data.fontColor !== '') {
                attributes.style += 'color:' + this.data.fontColor + ';';
            }
            return attributes;
        }
    });
    Template.widgetPostIt.events({
        'input textarea':function(event){
            this.modify({'display_text': $(event.target).val()});
        }
    });
}