Widgets.register('link', {
	info:{
		name:'Link to a website',
		description:'This widget allows you to create a simple button to reach your favorite website.'
	},
	settings : {
		href: {
		    type: String,
		    label: 'Website URL',
		    max: 400
		  },
		bgColor:{
			type:String,
			label: 'Background Color',
			autoform: {
		    	type: 'bootstrap-colorpicker',
		    	colorPickerOptions:{
		    		format:'rgba'
		    	}
		    }
		},
		icon:{
			type:String,
			label: 'Icon',
			autoform: {
		    	type: 'bootstrap-iconpicker',
		    	iconPickerOptions:{
		    	}
		    }
		},
        iconColor:{
            type:String,
            label: 'Icon Color',
            autoform: {
                type: 'bootstrap-colorpicker',
                colorPickerOptions:{
                    format:'rgba'
                }
            }
        },
		background:{
			type:String,
			label: 'Background Image',
			optional: true,
			autoform: {
				afFieldInput:{
		    	type: 'fileUpload',
		    	collection:'Images'
				}
		    }
		}
		},
	data:{
		href:'#',
		bgColor:'',
		icon:'fa-bookmark',
		background:''
	},
	widgetTemplate:'widgetLink'
});

Template.widgetLink.helpers({
	'attributes':function(){
		var attributes = {};
        attributes.style = '';
		if(this.data.bgColor!==''){
			attributes.style+='background-color:'+this.data.bgColor+';';
		}
		if(this.data.background!==''){
			attributes.style+='background-image:url("'+Images.findOne(this.data.background).url()+'");';
		}
        if(this.data.iconColor!==''){
            attributes.style+='color:'+this.data.iconColor+';';
        }
		return attributes;
	}
});