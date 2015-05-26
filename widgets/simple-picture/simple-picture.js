Widgets.register('simple-picture', {
    info: {
        name: 'Simple Image',
        description: 'This widget allows you to add a picture to your dashboard.'
    },
    settings: {
        picture: {
            type: String,
            label: 'Image',
            optional: true,
            autoform: {
                afFieldInput: {
                    type: 'fileUpload',
                    collection: 'Images',
                    accept: 'image/*'
                }
            }
        }
    },
    data: {
        picture: ''
    },
    widgetTemplate: 'widgetSimplePicture'
});
if(Meteor.isClient){
    Template.widgetSimplePicture.helpers({
        'attributes': function () {
            var attributes = {};
            attributes.style = '';
            if (this.data.picture !== '' && Images.findOne(this.data.picture)) {
                attributes.style += 'background-image:url("' + Images.findOne(this.data.picture).url() + '");';
            }
            return attributes;
        }
    });
}